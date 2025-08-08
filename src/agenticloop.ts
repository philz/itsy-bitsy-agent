interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ToolCall {
  id: string;
  name: string;
  input: any;
}

interface ToolResult {
  tool_use_id: string;
  content: string;
  is_error?: boolean;
}

interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
}

interface ModelPricing {
  input: number; // per million tokens
  output: number; // per million tokens
  cache_write: number; // per million tokens
  cache_read: number; // per million tokens
}

interface AgenticLoopConfig {
  apiKey: string;
  selectedModel?: string;
  systemPrompt: string;
  tools: Tool[];
  onTokenUsage?: (usage: TokenUsage) => void;
  onMessage?: (role: "user" | "assistant", content: string) => void;
  onToolCall?: (toolCall: ToolCall, result: ToolResult) => void;
}

interface Tool {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, any>;
    required: string[];
  };
  handler: (input: any) => Promise<string> | string;
  displayFormatter?: (input: any, result: ToolResult) => string;
}

export class AgenticLoop {
  private apiKey: string;
  private selectedModel: string;
  private systemPrompt: string;
  private tools: Tool[];
  private conversation: Message[] = [];
  private totalTokenUsage: TokenUsage = {
    input_tokens: 0,
    output_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
  };
  private modelPricing: Record<string, ModelPricing> = {
    "claude-sonnet-4-20250514": {
      input: 3.0,
      output: 15.0,
      cache_write: 3.75,
      cache_read: 0.3,
    },
    "claude-3-5-sonnet-20241022": {
      input: 3.0,
      output: 15.0,
      cache_write: 3.75,
      cache_read: 0.3,
    },
    "claude-3-5-haiku-20241022": {
      input: 0.8,
      output: 4.0,
      cache_write: 1.0,
      cache_read: 0.08,
    },
    "claude-opus-4-20250514": {
      input: 15.0,
      output: 75.0,
      cache_write: 18.75,
      cache_read: 1.5,
    },
  };
  private onTokenUsage?: (usage: TokenUsage) => void;
  private onMessage?: (role: "user" | "assistant", content: string) => void;
  private onToolCall?: (toolCall: ToolCall, result: ToolResult) => void;

  constructor(config: AgenticLoopConfig) {
    this.apiKey = config.apiKey;
    this.selectedModel = config.selectedModel || "claude-sonnet-4-20250514";
    this.systemPrompt = config.systemPrompt;
    this.tools = config.tools;
    this.onTokenUsage = config.onTokenUsage;
    this.onMessage = config.onMessage;
    this.onToolCall = config.onToolCall;
  }

  public async runLoop(initialMessage: string): Promise<void> {
    // Build conversation messages in Anthropic format
    const messages: any[] = [
      ...this.conversation.filter((msg) => msg.role !== "system"),
      { role: "user", content: initialMessage },
    ];

    // Agent loop: keep going until no more tool calls
    while (true) {
      const response = await this.callAnthropicAPI(messages);

      // Process the response content
      let assistantMessage = "";
      const toolCalls: ToolCall[] = [];

      for (const content of response.content) {
        if (content.type === "text") {
          assistantMessage += content.text;
        } else if (content.type === "tool_use") {
          toolCalls.push({
            id: content.id,
            name: content.name,
            input: content.input,
          });
        }
      }

      // Add assistant response to messages
      messages.push({
        role: "assistant",
        content: response.content,
      });

      // Add assistant message if there's text content
      if (assistantMessage.trim()) {
        this.onMessage?.("assistant", assistantMessage);
      }

      // If no tool calls, we're done
      if (toolCalls.length === 0) {
        break;
      }

      // Execute tool calls and prepare results for next iteration
      const toolResults: any[] = [];
      for (const toolCall of toolCalls) {
        const result = await this.handleToolCall(toolCall);
        this.onToolCall?.(toolCall, result);

        toolResults.push({
          type: "tool_result",
          tool_use_id: result.tool_use_id,
          content: result.content,
          is_error: result.is_error,
        });
      }

      // Add tool results as user message for next iteration
      messages.push({
        role: "user",
        content: toolResults,
      });
    }

    // Update conversation history
    this.conversation = messages.map((msg) => ({
      role: msg.role,
      content:
        typeof msg.content === "string"
          ? msg.content
          : JSON.stringify(msg.content),
    }));
  }

  private async callAnthropicAPI(messages: any[]): Promise<any> {
    const tools = this.tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      input_schema: tool.input_schema,
    }));

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: this.selectedModel,
          max_tokens: 1000,
          system: [
            {
              type: "text",
              text: this.systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          tools: tools,
          messages: messages.map((msg, index) => {
            // Cache the last user message
            if (index === messages.length - 1 && msg.role === "user") {
              return {
                ...msg,
                content:
                  typeof msg.content === "string"
                    ? [
                        {
                          type: "text",
                          text: msg.content,
                          cache_control: { type: "ephemeral" },
                        },
                      ]
                    : Array.isArray(msg.content)
                    ? msg.content.map((item, i) =>
                        i === msg.content.length - 1
                          ? { ...item, cache_control: { type: "ephemeral" } }
                          : item
                      )
                    : msg.content,
              };
            }
            return msg;
          }),
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Invalid API key. Please enter a valid Anthropic API key."
          );
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Track token usage if available
      if (data.usage) {
        this.updateTokenUsage(data.usage);
        this.onTokenUsage?.(this.totalTokenUsage);
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        // This is likely a CORS error
        throw new Error(
          `CORS Error: This website (${window.location.hostname}) blocks API calls to Anthropic. This is a security feature. Try using the bookmarklet on a different site, or consider using a browser extension instead.`
        );
      }
      throw error;
    }
  }

  private async handleToolCall(toolCall: ToolCall): Promise<ToolResult> {
    try {
      const tool = this.tools.find(t => t.name === toolCall.name);
      if (!tool) {
        return {
          tool_use_id: toolCall.id,
          content: `Unknown tool: ${toolCall.name}`,
          is_error: true,
        };
      }

      const result = await tool.handler(toolCall.input);
      return {
        tool_use_id: toolCall.id,
        content: String(result || "Tool executed successfully"),
      };
    } catch (error) {
      return {
        tool_use_id: toolCall.id,
        content: `Error: ${(error as Error).message}`,
        is_error: true,
      };
    }
  }

  private updateTokenUsage(usage: TokenUsage): void {
    this.totalTokenUsage.input_tokens += usage.input_tokens;
    this.totalTokenUsage.output_tokens += usage.output_tokens;
    this.totalTokenUsage.cache_creation_input_tokens +=
      usage.cache_creation_input_tokens || 0;
    this.totalTokenUsage.cache_read_input_tokens +=
      usage.cache_read_input_tokens || 0;
  }

  public getTotalTokenUsage(): TokenUsage {
    return { ...this.totalTokenUsage };
  }

  public getConversation(): Message[] {
    return [...this.conversation];
  }

  public calculateCost(usage?: TokenUsage): number {
    const targetUsage = usage || this.totalTokenUsage;
    const pricing = this.modelPricing[this.selectedModel];
    if (!pricing) return 0;

    const inputCost = (targetUsage.input_tokens / 1_000_000) * pricing.input;
    const outputCost = (targetUsage.output_tokens / 1_000_000) * pricing.output;
    const cacheWriteCost =
      ((targetUsage.cache_creation_input_tokens || 0) / 1_000_000) *
      pricing.cache_write;
    const cacheReadCost =
      ((targetUsage.cache_read_input_tokens || 0) / 1_000_000) * pricing.cache_read;

    return inputCost + outputCost + cacheWriteCost + cacheReadCost;
  }

  public formatCost(cost: number): string {
    if (cost < 0.01) {
      return `${(cost * 100).toFixed(2)}¢`;
    }
    return `$${cost.toFixed(4)}`;
  }
}

export type { AgenticLoopConfig, Tool, Message, ToolCall, ToolResult, TokenUsage };

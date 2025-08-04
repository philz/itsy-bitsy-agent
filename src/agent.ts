interface Message {
  role: 'user' | 'assistant';
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

interface PageContext {
  url: string;
  title: string;
  selectedText: string;
  forms: FormInfo[];
  headings: string[];
  links: LinkInfo[];
}

interface FormInfo {
  action: string;
  method: string;
  elements: FormElementInfo[];
}

interface FormElementInfo {
  name: string;
  type: string;
  value: string;
}

interface LinkInfo {
  text: string;
  href: string;
}

class BookmarkletAgent {
  private isVisible = false;
  private apiKey: string;
  private selectedModel: string;
  private conversation: Message[] = [];
  private container: HTMLElement | null = null;

  constructor(embeddedApiKey?: string) {
    this.apiKey = embeddedApiKey || localStorage.getItem('bookmarklet-agent-api-key') || '';
    this.selectedModel = localStorage.getItem('bookmarklet-agent-model') || 'claude-sonnet-4-20250514';
  }

  init(): void {
    this.createUI();
    this.show();
  }

  private createUI(): void {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'bookmarklet-agent';
    this.container.innerHTML = `
      <div class="agent-header">
        <h3>Web Agent</h3>
        <button class="close-btn" data-action="close">×</button>
      </div>
      <div class="agent-body">
        <div class="api-key-section" ${this.apiKey ? 'style="display: none;"' : ''}>
          <label>Anthropic API Key:</label>
          <input type="text" id="api-key-input" placeholder="sk-..." value="${this.apiKey}">
          <button data-action="save-key">Save</button>
        </div>
        <div class="chat-section">
          <div id="chat-messages"></div>
          <div class="input-section">
            <textarea id="user-input" placeholder="What would you like me to do on this page?"></textarea>
            <div class="send-controls">
              <select id="model-select" data-action="change-model">
                <option value="claude-sonnet-4-20250514" ${this.selectedModel === 'claude-sonnet-4-20250514' ? 'selected' : ''}>Sonnet 4.0</option>
                <option value="claude-3-5-sonnet-20241022" ${this.selectedModel === 'claude-3-5-sonnet-20241022' ? 'selected' : ''}>Sonnet 3.5</option>
                <option value="claude-3-5-haiku-20241022" ${this.selectedModel === 'claude-3-5-haiku-20241022' ? 'selected' : ''}>Haiku 3.5</option>
                <option value="claude-opus-4-20250514" ${this.selectedModel === 'claude-opus-4-20250514' ? 'selected' : ''}>Opus 4.0</option>
              </select>
              <button data-action="send">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.addEventListeners();
    document.body.appendChild(this.container);
  }

  private addEventListeners(): void {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');

      switch (action) {
        case 'close':
          this.hide();
          break;
        case 'save-key':
          this.saveApiKey();
          break;
        case 'send':
          this.sendMessage();
          break;
      }
    });

    this.container.addEventListener('change', (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');

      switch (action) {
        case 'change-model':
          this.changeModel();
          break;
      }
    });

    const textarea = this.container.querySelector('#user-input') as HTMLTextAreaElement;
    textarea?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  private addStyles(): void {
    if (document.getElementById('bookmarklet-agent-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'bookmarklet-agent-styles';
    styles.textContent = `
      #bookmarklet-agent {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 400px;
        max-height: 600px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
      }
      
      .agent-header {
        background: #f8f9fa;
        padding: 12px 16px;
        border-bottom: 1px solid #e9ecef;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .agent-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .agent-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        max-height: 520px;
        overflow: hidden;
      }
      
      .api-key-section {
        margin-bottom: 12px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 4px;
      }
      
      .api-key-section label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .api-key-section input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 8px;
        box-sizing: border-box;
      }
      
      .api-key-section button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      
      #chat-messages {
        flex: 1;
        overflow-y: auto;
        max-height: 300px;
        margin-bottom: 12px;
        padding-right: 8px;
      }
      
      .message {
        margin-bottom: 8px;
        padding: 6px 10px;
        border-radius: 6px;
        max-width: 90%;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .message.user {
        background: #007bff;
        color: white;
        margin-left: auto;
      }
      
      .message.assistant {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
      }
      
      .input-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      #user-input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
        min-height: 40px;
        max-height: 120px;
        font-family: inherit;
      }
      
      .send-controls {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .send-controls select {
        padding: 6px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        font-size: 12px;
        color: #666;
      }
      
      .send-controls button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        flex: 1;
      }
      
      .thinking {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        color: #666;
        font-style: italic;
      }
      
      .thinking-dots {
        display: inline-flex;
        gap: 2px;
      }
      
      .thinking-dots span {
        width: 4px;
        height: 4px;
        background: #666;
        border-radius: 50%;
        animation: thinking 1.4s ease-in-out infinite both;
      }
      
      .thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
      .thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
      .thinking-dots span:nth-child(3) { animation-delay: 0s; }
      
      @keyframes thinking {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        } 40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  show(): void {
    if (this.container) {
      this.container.style.display = 'flex';
      this.isVisible = true;
    }
  }

  hide(): void {
    if (this.container) {
      this.container.style.display = 'none';
      this.isVisible = false;
    }
  }

  toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  private saveApiKey(): void {
    const input = document.getElementById('api-key-input') as HTMLInputElement;
    this.apiKey = input.value.trim();
    localStorage.setItem('bookmarklet-agent-api-key', this.apiKey);

    if (this.apiKey) {
      const section = document.querySelector('.api-key-section') as HTMLElement;
      if (section) section.style.display = 'none';
    }
  }

  private changeModel(): void {
    const select = document.getElementById('model-select') as HTMLSelectElement;
    this.selectedModel = select.value;
    localStorage.setItem('bookmarklet-agent-model', this.selectedModel);
  }

  private showThinking(): void {
    const messagesDiv = document.getElementById('chat-messages');
    if (!messagesDiv) return;

    const thinkingDiv = document.createElement('div');
    thinkingDiv.id = 'thinking-indicator';
    thinkingDiv.className = 'thinking';
    thinkingDiv.innerHTML = `
      <span>Thinking</span>
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    messagesDiv.appendChild(thinkingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  private hideThinking(): void {
    const thinkingDiv = document.getElementById('thinking-indicator');
    if (thinkingDiv) {
      thinkingDiv.remove();
    }
  }

  private async sendMessage(): Promise<void> {
    const input = document.getElementById('user-input') as HTMLTextAreaElement;
    const message = input.value.trim();

    if (!message) return;
    if (!this.apiKey) {
      alert('Please enter your Anthropic API key first');
      return;
    }

    input.value = '';
    this.addMessage('user', message);

    this.showThinking();

    try {
      await this.runAgentLoop(message);
    } catch (error) {
      this.addMessage('assistant', `Error: ${(error as Error).message}`);
    } finally {
      this.hideThinking();
    }
  }

  private async runAgentLoop(initialMessage: string): Promise<void> {
    const pageContext = this.getPageContext();
    
    // Build conversation messages in Anthropic format
    const messages: any[] = [
      ...this.conversation.filter(msg => msg.role !== 'system'),
      { role: 'user', content: initialMessage }
    ];

    // Agent loop: keep going until no more tool calls
    while (true) {
      const response = await this.callAnthropicAPIWithMessages(messages, pageContext);
      
      // Process the response content
      let assistantMessage = '';
      const toolCalls: ToolCall[] = [];

      for (const content of response.content) {
        if (content.type === 'text') {
          assistantMessage += content.text;
        } else if (content.type === 'tool_use') {
          toolCalls.push({
            id: content.id,
            name: content.name,
            input: content.input
          });
        }
      }

      // Add assistant response to messages
      messages.push({
        role: 'assistant',
        content: response.content
      });

      // Add assistant message if there's text content
      if (assistantMessage.trim()) {
        this.addMessage('assistant', assistantMessage);
      }

      // If no tool calls, we're done
      if (toolCalls.length === 0) {
        break;
      }

      // Execute tool calls and prepare results for next iteration
      const toolResults: any[] = [];
      for (const toolCall of toolCalls) {
        this.addMessage('assistant', `🔧 Using tool: ${toolCall.name}`);
        const result = await this.handleToolCall(toolCall);
        
        toolResults.push({
          type: 'tool_result',
          tool_use_id: result.tool_use_id,
          content: result.content,
          is_error: result.is_error
        });
        
        if (result.is_error) {
          this.addMessage('assistant', `❌ Tool error: ${result.content}`);
        } else {
          this.addMessage('assistant', `✅ Tool result: ${result.content}`);
        }
      }

      // Add tool results as user message for next iteration
      messages.push({
        role: 'user',
        content: toolResults
      });
    }

    // Update conversation history
    this.conversation = messages.map(msg => ({
      role: msg.role,
      content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
    }));
  }

  private addMessage(role: 'user' | 'assistant', content: string): void {
    const messagesDiv = document.getElementById('chat-messages');
    if (!messagesDiv) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    this.conversation.push({ role, content });
  }

  private getPageContext(): PageContext {
    return {
      url: window.location.href,
      title: document.title,
      selectedText: window.getSelection()?.toString() || '',
      forms: Array.from(document.forms).map(form => ({
        action: form.action,
        method: form.method,
        elements: Array.from(form.elements).map(el => {
          const element = el as HTMLInputElement;
          return {
            name: element.name,
            type: element.type,
            value: element.value
          };
        })
      })),
      headings: Array.from(document.querySelectorAll('h1, h2, h3'))
        .map(h => h.textContent?.trim() || '')
        .slice(0, 10),
      links: Array.from(document.querySelectorAll('a[href]'))
        .map(a => ({
          text: a.textContent?.trim() || '',
          href: (a as HTMLAnchorElement).href
        }))
        .slice(0, 20)
    };
  }

  private async callAnthropicAPIWithMessages(messages: any[], pageContext: PageContext): Promise<any> {
    const tools = [
      {
        name: "eval_js",
        description: "Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables.",
        input_schema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "JavaScript code to execute on the page"
            }
          },
          required: ["code"]
        }
      },
      {
        name: "get_element_info",
        description: "Get detailed information about page elements using CSS selectors. Returns element properties, text content, attributes, etc.",
        input_schema: {
          type: "object",
          properties: {
            selector: {
              type: "string",
              description: "CSS selector to find elements"
            }
          },
          required: ["selector"]
        }
      }
    ];

    const systemPrompt = `You are a helpful web agent that can analyze and interact with web pages using tools.
    
Current page context:
- URL: ${pageContext.url}
- Title: ${pageContext.title}
- Selected text: ${pageContext.selectedText || 'None'}
- Main headings: ${pageContext.headings.join(', ')}

You have access to these tools:
1. eval_js: Execute JavaScript code on the page to interact with elements
2. get_element_info: Get information about page elements using CSS selectors

You can help users understand the page, fill out forms, click links, scroll, or perform any web interactions. Be concise and helpful. Always use tools when the user asks you to interact with the page.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: this.selectedModel,
          max_tokens: 1000,
          system: systemPrompt,
          tools: tools,
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // This is likely a CORS error
        throw new Error(`CORS Error: This website (${window.location.hostname}) blocks API calls to Anthropic. This is a security feature. Try using the bookmarklet on a different site, or consider using a browser extension instead.`);
      }
      throw error;
    }
  }

  private async handleToolCall(toolCall: ToolCall): Promise<ToolResult> {
    try {
      switch (toolCall.name) {
        case 'eval_js':
          const code = toolCall.input.code;
          const result = eval(code);
          return {
            tool_use_id: toolCall.id,
            content: String(result || 'Code executed successfully')
          };

        case 'get_element_info':
          const selector = toolCall.input.selector;
          const elements = document.querySelectorAll(selector);
          const elementInfo = Array.from(elements).slice(0, 5).map(el => ({
            tagName: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className,
            textContent: el.textContent?.trim().substring(0, 100),
            attributes: Object.fromEntries(
              Array.from(el.attributes).map(attr => [attr.name, attr.value])
            )
          }));
          
          return {
            tool_use_id: toolCall.id,
            content: `Found ${elements.length} elements: ${JSON.stringify(elementInfo, null, 2)}`
          };

        default:
          return {
            tool_use_id: toolCall.id,
            content: `Unknown tool: ${toolCall.name}`,
            is_error: true
          };
      }
    } catch (error) {
      return {
        tool_use_id: toolCall.id,
        content: `Error: ${(error as Error).message}`,
        is_error: true
      };
    }
  }
}

// Global instance
declare global {
  interface Window {
    bookmarkletAgent: BookmarkletAgent;
    BOOKMARKLET_API_KEY?: string;
  }
}

window.bookmarkletAgent = new BookmarkletAgent(window.BOOKMARKLET_API_KEY);
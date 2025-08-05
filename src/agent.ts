import { marked } from 'marked';
import DOMPurify from 'dompurify';

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

interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
}

interface ModelPricing {
  input: number;  // per million tokens
  output: number; // per million tokens
  cache_write: number; // per million tokens
  cache_read: number;  // per million tokens
}

class BookmarkletAgent {
  private isVisible = false;
  private apiKey: string;
  private selectedModel: string;
  private conversation: Message[] = [];
  private container: HTMLElement | null = null;
  private hasEmbeddedApiKey = false;
  private _eval_results: any[] = [];
  private totalTokenUsage: TokenUsage = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
  private modelPricing: Record<string, ModelPricing> = {
    'claude-sonnet-4-20250514': { input: 3.00, output: 15.00, cache_write: 3.75, cache_read: 0.30 },
    'claude-3-5-sonnet-20241022': { input: 3.00, output: 15.00, cache_write: 3.75, cache_read: 0.30 },
    'claude-3-5-haiku-20241022': { input: 0.80, output: 4.00, cache_write: 1.00, cache_read: 0.08 },
    'claude-opus-4-20250514': { input: 15.00, output: 75.00, cache_write: 18.75, cache_read: 1.50 }
  };

  constructor(embeddedApiKey?: string) {
    if (embeddedApiKey) {
      this.apiKey = embeddedApiKey;
      this.hasEmbeddedApiKey = true;
    } else {
      this.apiKey = localStorage.getItem('bookmarklet-agent-api-key') || '';
      this.hasEmbeddedApiKey = false;
    }
    this.selectedModel = localStorage.getItem('bookmarklet-agent-model') || 'claude-sonnet-4-20250514';
  }

  init(): void {
    this.createUI();
    this.show();
  }

  private renderMarkdown(content: string): string {
    try {
      const html = marked.parse(content);
      return DOMPurify.sanitize(html);
    } catch (error) {
      console.warn('Markdown rendering failed:', error);
      // Fallback to plain text
      return content.replace(/\n/g, '<br>');
    }
  }

  private createUI(): void {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'bookmarklet-agent';
    this.container.innerHTML = `
      <div class="agent-header">
        <h3>Itsy Bitsy Agent</h3>
        <div class="token-usage" id="token-usage" style="font-size: 11px; color: #666; pointer-events: auto;"></div>
        <button class="close-btn" data-action="close">×</button>
      </div>
      <div class="agent-body">
        <div class="api-key-section" ${this.apiKey ? 'style="display: none;"' : ''}>
          <label>Anthropic API Key:</label>
          <input type="text" id="api-key-input" placeholder="sk-..." value="${this.apiKey}">
          <div class="save-options">
            <button data-action="save-session">Use for session</button>
            <button data-action="save-persistent">Save for this website</button>
          </div>
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
        case 'save-session':
          this.saveApiKey(false);
          break;
        case 'save-persistent':
          this.saveApiKey(true);
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

    // Add drag functionality
    this.addDragFunctionality();
  }

  private addDragFunctionality(): void {
    if (!this.container) return;
    
    const header = this.container.querySelector('.agent-header') as HTMLElement;
    if (!header) return;

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;

    header.addEventListener('mousedown', (e) => {
      // Don't drag if clicking on buttons, inputs, or token usage area
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || 
          target.classList.contains('token-usage') || target.closest('.token-usage')) {
        return;
      }
      
      isDragging = true;
      initialX = e.clientX - this.container!.offsetLeft;
      initialY = e.clientY - this.container!.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !this.container) return;
      
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // Keep within viewport bounds
      const maxX = window.innerWidth - this.container.offsetWidth;
      const maxY = window.innerHeight - this.container.offsetHeight;
      
      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));

      this.container.style.left = currentX + 'px';
      this.container.style.top = currentY + 'px';
      this.container.style.right = 'auto'; // Remove right positioning
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
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
        min-width: 300px;
        min-height: 200px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        resize: both;
        overflow: hidden;
      }
      
      .agent-header {
        background: #f8f9fa;
        padding: 12px 16px;
        border-bottom: 1px solid #e9ecef;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        cursor: move;
        user-select: none;
      }
      
      .token-usage {
        flex: 1;
        text-align: center;
        font-size: 10px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: help;
        pointer-events: auto;
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
      
      .save-options {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      
      .save-options button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        flex: 1;
      }
      
      .save-options button:hover {
        background: #0056b3;
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
      
      .message.assistant h1, .message.assistant h2, .message.assistant h3,
      .message.assistant h4, .message.assistant h5, .message.assistant h6 {
        margin: 8px 0 4px 0;
        font-size: inherit;
        font-weight: 600;
      }
      
      .message.assistant p {
        margin: 4px 0;
      }
      
      .message.assistant ul, .message.assistant ol {
        margin: 4px 0;
        padding-left: 16px;
      }
      
      .message.assistant li {
        margin: 2px 0;
      }
      
      .message.assistant code {
        background: rgba(0,0,0,0.1);
        padding: 1px 3px;
        border-radius: 2px;
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 12px;
      }
      
      .message.assistant pre {
        background: rgba(0,0,0,0.05);
        padding: 8px;
        border-radius: 4px;
        overflow-x: auto;
        margin: 4px 0;
      }
      
      .message.assistant pre code {
        background: none;
        padding: 0;
      }
      
      .message.assistant blockquote {
        border-left: 3px solid #ddd;
        margin: 4px 0;
        padding-left: 12px;
        color: #666;
      }
      
      .tool-result-preview, .tool-result-full {
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 12px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .expand-tool-result {
        background: #007bff;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        color: white;
        cursor: pointer;
        margin-top: 8px;
        font-weight: 500;
        display: inline-block;
      }
      
      .expand-tool-result:hover {
        background: #0056b3;
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

  get eval_results(): any[] {
    return this._eval_results;
  }

  private calculateCost(usage: TokenUsage, model: string): number {
    const pricing = this.modelPricing[model];
    if (!pricing) return 0;

    const inputCost = (usage.input_tokens / 1_000_000) * pricing.input;
    const outputCost = (usage.output_tokens / 1_000_000) * pricing.output;
    const cacheWriteCost = ((usage.cache_creation_input_tokens || 0) / 1_000_000) * pricing.cache_write;
    const cacheReadCost = ((usage.cache_read_input_tokens || 0) / 1_000_000) * pricing.cache_read;

    return inputCost + outputCost + cacheWriteCost + cacheReadCost;
  }

  private updateTokenUsage(usage: TokenUsage): void {
    this.totalTokenUsage.input_tokens += usage.input_tokens;
    this.totalTokenUsage.output_tokens += usage.output_tokens;
    this.totalTokenUsage.cache_creation_input_tokens += usage.cache_creation_input_tokens || 0;
    this.totalTokenUsage.cache_read_input_tokens += usage.cache_read_input_tokens || 0;
  }

  private formatCost(cost: number): string {
    if (cost < 0.01) {
      return `$${(cost * 100).toFixed(4)}¢`;
    }
    return `$${cost.toFixed(4)}`;
  }

  private updateTokenDisplay(): void {
    const tokenDiv = document.getElementById('token-usage');
    if (!tokenDiv) return;

    const totalCost = this.calculateCost(this.totalTokenUsage, this.selectedModel);
    const totalTokens = this.totalTokenUsage.input_tokens + this.totalTokenUsage.output_tokens;
    
    if (totalTokens === 0) {
      tokenDiv.textContent = '';
      tokenDiv.title = '';
      return;
    }

    tokenDiv.textContent = `Tokens: ${totalTokens.toLocaleString()} | Cost: ${this.formatCost(totalCost)}`;
    
    // Add detailed breakdown in tooltip
    const pricing = this.modelPricing[this.selectedModel];
    if (pricing) {
      const breakdown = [
        `Input tokens: ${this.totalTokenUsage.input_tokens.toLocaleString()} × $${pricing.input}/M = ${this.formatCost((this.totalTokenUsage.input_tokens / 1_000_000) * pricing.input)}`,
        `Output tokens: ${this.totalTokenUsage.output_tokens.toLocaleString()} × $${pricing.output}/M = ${this.formatCost((this.totalTokenUsage.output_tokens / 1_000_000) * pricing.output)}`
      ];
      
      if (this.totalTokenUsage.cache_creation_input_tokens) {
        breakdown.push(`Cache write: ${this.totalTokenUsage.cache_creation_input_tokens.toLocaleString()} × $${pricing.cache_write}/M = ${this.formatCost((this.totalTokenUsage.cache_creation_input_tokens / 1_000_000) * pricing.cache_write)}`);
      }
      
      if (this.totalTokenUsage.cache_read_input_tokens) {
        breakdown.push(`Cache read: ${this.totalTokenUsage.cache_read_input_tokens.toLocaleString()} × $${pricing.cache_read}/M = ${this.formatCost((this.totalTokenUsage.cache_read_input_tokens / 1_000_000) * pricing.cache_read)}`);
      }
      
      tokenDiv.title = breakdown.join('\n');
    }
  }

  private handleUnauthorized(): void {
    // Clear the stored API key
    this.apiKey = '';
    if (!this.hasEmbeddedApiKey) {
      localStorage.removeItem('bookmarklet-agent-api-key');
    }
    
    // Show the API key input section
    const section = document.querySelector('.api-key-section') as HTMLElement;
    if (section) {
      section.style.display = 'block';
    }
    
    // Clear the API key input field
    const input = document.getElementById('api-key-input') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  private saveApiKey(persistent: boolean = false): void {
    const input = document.getElementById('api-key-input') as HTMLInputElement;
    this.apiKey = input.value.trim();
    
    // Save to localStorage only if persistent is true and not using embedded API key
    if (persistent && !this.hasEmbeddedApiKey) {
      localStorage.setItem('bookmarklet-agent-api-key', this.apiKey);
    }

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
    // Remove any existing thinking indicator first
    this.hideThinking();
    
    const messagesDiv = document.getElementById('chat-messages');
    if (!messagesDiv) return;

    const thinkingDiv = document.createElement('div');
    thinkingDiv.id = 'thinking-indicator';
    thinkingDiv.className = 'thinking';
    thinkingDiv.innerHTML = `
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
        const result = await this.handleToolCall(toolCall);
        
        toolResults.push({
          type: 'tool_result',
          tool_use_id: result.tool_use_id,
          content: result.content,
          is_error: result.is_error
        });
        
        // Combine tool call and result into one message
        const toolCallDisplay = `🔧 **${toolCall.name}**\n\`\`\`javascript\n${JSON.stringify(toolCall.input, null, 2)}\n\`\`\``;
        const resultDisplay = result.is_error ? `❌ **Error:**\n${result.content}` : `✅ **Result:**\n${result.content}`;
        const combinedMessage = `${toolCallDisplay}\n\n${resultDisplay}`;
        
        this.addMessage('assistant', combinedMessage, true);
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

  private addMessage(role: 'user' | 'assistant', content: string, isToolResult: boolean = false): void {
    const messagesDiv = document.getElementById('chat-messages');
    if (!messagesDiv) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    if (isToolResult) {
      // Create collapsible tool result
      const lines = content.split('\n');
      const preview = lines.slice(0, 2).join('\n');
      const hasMore = lines.length > 2;
      
      messageDiv.innerHTML = `
        <div class="tool-result-preview">${this.escapeHtml(preview)}</div>
        ${hasMore ? `
          <div class="tool-result-full" style="display: none;">${this.escapeHtml(content)}</div>
          <button class="expand-tool-result" onclick="this.parentElement.querySelector('.tool-result-preview').style.display='none'; this.parentElement.querySelector('.tool-result-full').style.display='block'; this.style.display='none';">📋 Show Full Result</button>
        ` : ''}
      `;
    } else if (role === 'assistant') {
      // Render markdown for assistant messages
      const renderedContent = this.renderMarkdown(content);
      messageDiv.innerHTML = renderedContent;
    } else {
      messageDiv.textContent = content;
    }
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    this.conversation.push({ role, content });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
        description: "Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables. If results are large, they'll be truncated but saved to a variable for future inspection. IMPORTANT: Never use 'return' statements - use expressions instead (e.g., 'document.title' not 'return document.title').",
        input_schema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "JavaScript code to execute on the page. Must be an expression or statement, not contain 'return' statements outside functions."
            }
          },
          required: ["code"]
        }
      }
    ];

    const systemPrompt = `You are a helpful web agent that can analyze and interact with web pages using tools.
    
Current page context:
- URL: ${pageContext.url}
- Title: ${pageContext.title}
- Selected text: ${pageContext.selectedText || 'None'}
- Main headings: ${pageContext.headings.join(', ')}

You have access to the eval_js tool to execute JavaScript code on the page. Use it to interact with elements, extract information, click buttons, fill forms, or perform any web interactions. Large results are automatically truncated but saved to variables for inspection.

IMPORTANT JavaScript Guidelines:
- Never use 'return' statements in your JavaScript code - they cause "Illegal return statement" errors
- Instead of 'return value;', just use 'value;' as the last expression
- Use expressions, not return statements: 'document.title' not 'return document.title'
- For functions, define them but call them: 'function getName() { return "test"; } getName();'
- Use console.log() for debugging, not return statements

Examples:
✅ Good: document.querySelectorAll('h1').length
✅ Good: Array.from(document.links).map(link => link.href)
✅ Good: (() => { const links = document.querySelectorAll('a'); return links.length; })()
❌ Bad: return document.title
❌ Bad: return Array.from(document.links)

Be concise and helpful. Always use the eval_js tool when the user asks you to interact with the page.`;

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
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" }
            }
          ],
          tools: tools,
          messages: messages.map((msg, index) => {
            // Cache the last user message
            if (index === messages.length - 1 && msg.role === 'user') {
              return {
                ...msg,
                content: typeof msg.content === 'string' 
                  ? [{ type: "text", text: msg.content, cache_control: { type: "ephemeral" } }]
                  : Array.isArray(msg.content) 
                    ? msg.content.map((item, i) => 
                        i === msg.content.length - 1 
                          ? { ...item, cache_control: { type: "ephemeral" } }
                          : item
                      )
                    : msg.content
              };
            }
            return msg;
          })
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Clear stored API key and show input section
          this.handleUnauthorized();
          throw new Error('Invalid API key. Please enter a valid Anthropic API key.');
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Track token usage if available
      if (data.usage) {
        this.updateTokenUsage(data.usage);
        this.updateTokenDisplay();
        const cost = this.calculateCost(data.usage, this.selectedModel);
        console.log(`Request cost: ${this.formatCost(cost)}, Total cost: ${this.formatCost(this.calculateCost(this.totalTokenUsage, this.selectedModel))}`);
      }
      
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
          const resultString = String(result || 'Code executed successfully');
          
          // Check if result is longer than 10KB
          const maxLength = 10 * 1024; // 10KB
          if (resultString.length > maxLength) {
            // Store the full result in the array
            const resultIndex = this._eval_results.length;
            this._eval_results.push(result);
            
            const truncated = resultString.substring(0, maxLength);
            return {
              tool_use_id: toolCall.id,
              content: `${truncated}...\n\n[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${resultIndex}]]`
            };
          }
          
          return {
            tool_use_id: toolCall.id,
            content: resultString
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
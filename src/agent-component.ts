interface PageVersion {
  id: string;
  title: string;
  timestamp: Date;
  content: string;
}

class AgentBoxComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private isCollapsed: boolean = false;
  private isDragging: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private startLeft: number = 0;
  private startTop: number = 0;
  private onSendMessage?: (message: string) => void;
  private onVersionSelect?: (version: PageVersion) => void;
  private onNewMessage?: (role: "user" | "assistant", content: string) => void;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  connectedCallback() {
    // Component is added to DOM
    this.updateVersionsList();
  }

  private render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 400px;
          max-height: calc(100vh - 40px);
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .agent-window {
          background: white;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          max-height: inherit;
          transition: all 0.3s ease;
        }
        
        .agent-window.collapsed {
          width: auto;
          height: 40px;
          border-radius: 20px;
          cursor: pointer;
        }
        
        .agent-header {
          background: #f8f9fa;
          padding: 12px 16px;
          border-bottom: 1px solid #e5e5e5;
          border-radius: 10px 10px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: move;
          user-select: none;
          min-height: 16px;
        }
        
        .collapsed .agent-header {
          border-radius: 20px;
          border-bottom: none;
          padding: 8px 16px;
        }
        
        .agent-title {
          font-weight: 600;
          color: #2d3748;
          white-space: nowrap;
        }
        
        .agent-controls {
          display: flex;
          gap: 8px;
        }
        
        .collapsed .agent-controls {
          display: none;
        }
        
        .agent-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          color: #666;
          font-size: 16px;
          line-height: 1;
          transition: background-color 0.2s;
        }
        
        .agent-btn:hover {
          background: #e2e8f0;
          color: #2d3748;
        }
        
        .agent-body {
          padding: 16px;
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        
        .collapsed .agent-body {
          display: none;
        }
        
        .api-key-section {
          margin-bottom: 16px;
          padding: 16px;
          background: #f7fafc;
          border-radius: 8px;
          display: none;
        }
        
        .api-key-section.show {
          display: block;
        }
        
        .api-key-section label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #2d3748;
        }
        
        .api-key-section input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d2d6dc;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 12px;
          font-family: inherit;
        }
        
        .api-key-section input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }
        
        .api-key-buttons {
          display: flex;
          gap: 8px;
        }
        
        .btn {
          background: #4299e1;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          flex: 1;
          transition: background-color 0.2s;
          font-family: inherit;
        }
        
        .btn:hover {
          background: #3182ce;
        }
        
        .btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 16px;
        }
        
        .tab {
          background: transparent;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .tab.active {
          color: #4299e1;
          border-bottom-color: #4299e1;
        }
        
        .tab:hover {
          color: #4299e1;
        }
        
        .tab-content {
          flex: 1;
          display: none;
          flex-direction: column;
          min-height: 0;
        }
        
        .tab-content.active {
          display: flex;
        }
        
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        
        .messages {
          flex: 1;
          overflow-y: auto;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          max-height: 250px;
          min-height: 120px;
        }
        
        .messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .messages::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .messages::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }
        
        .messages::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
        
        .message {
          margin-bottom: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          max-width: 85%;
          word-wrap: break-word;
        }
        
        .message.user {
          background: #4299e1;
          color: white;
          margin-left: auto;
        }
        
        .message.assistant {
          background: #f7fafc;
          border: 1px solid #e2e8f0;
        }
        
        .input-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .input-controls {
          display: flex;
          gap: 8px;
          align-items: stretch;
        }
        
        .user-input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d2d6dc;
          border-radius: 6px;
          resize: none;
          min-height: 36px;
          max-height: 100px;
          font-family: inherit;
        }
        
        .user-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }
        
        .send-btn {
          background: #4299e1;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-family: inherit;
        }
        
        .send-btn:hover {
          background: #3182ce;
        }
        
        .send-btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
        
        .thinking {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-style: italic;
          padding: 8px 12px;
        }
        
        .thinking-dots {
          display: flex;
          gap: 4px;
        }
        
        .thinking-dots span {
          width: 6px;
          height: 6px;
          background: #666;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        
        .thinking-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .thinking-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes pulse {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          30% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }
        
        .versions-list {
          flex: 1;
          overflow-y: auto;
          max-height: 300px;
        }
        
        .version-item {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .version-item:hover {
          border-color: #4299e1;
          background: #f7fafc;
        }
        
        .version-item.current {
          border-color: #48bb78;
          background: #f0fff4;
        }
        
        .version-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
        }
        
        .version-meta {
          font-size: 12px;
          color: #666;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .current-badge {
          background: #48bb78;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }
        
        .no-versions {
          text-align: center;
          color: #666;
          padding: 32px 16px;
          font-style: italic;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          :host {
            top: 10px;
            left: 10px;
            right: 10px;
            width: auto;
            max-height: calc(100vh - 20px);
          }
          
          .messages {
            max-height: 180px;
            min-height: 100px;
          }
        }
      </style>
      
      <div class="agent-window" id="agent-window">
        <div class="agent-header" id="agent-header">
          <div class="agent-title">Page Agent</div>
          <div class="agent-controls">
            <button class="agent-btn" id="collapse-btn" title="Collapse">−</button>
            <button class="agent-btn" id="close-btn" title="Close">×</button>
          </div>
        </div>
        <div class="agent-body">
          <div class="api-key-section" id="api-key-section">
            <label for="api-key-input">Anthropic API Key:</label>
            <input type="text" id="api-key-input" placeholder="sk-..." />
            <div class="api-key-buttons">
              <button class="btn" id="save-key-btn">Save Key</button>
            </div>
          </div>
          
          <div class="tabs">
            <button class="tab active" data-tab="chat">Chat</button>
            <button class="tab" data-tab="versions">Versions</button>
          </div>
          
          <div class="tab-content active" id="chat-tab">
            <div class="chat-area">
              <div class="messages" id="messages"></div>
              <div class="input-area">
                <div class="input-controls">
                  <textarea class="user-input" id="user-input" placeholder="Tell me how to modify this page..."></textarea>
                  <button class="send-btn" id="send-btn">Send</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tab-content" id="versions-tab">
            <div class="versions-list" id="versions-list">
              <div class="no-versions">No versions saved yet</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private setupEventListeners() {
    // Tab switching
    this.shadow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      

      
      if (target.classList.contains('tab')) {
        const tabName = target.dataset.tab;
        this.switchTab(tabName!);
        e.stopPropagation();
        return;
      }
      
      // Collapse/expand
      if (target.id === 'collapse-btn') {

        this.toggleCollapse();
        e.stopPropagation();
        return;
      }
      
      // Close
      if (target.id === 'close-btn') {
        this.style.display = 'none';
        e.stopPropagation();
        return;
      }
      
      // Save API key
      if (target.id === 'save-key-btn') {
        this.saveApiKey();
        e.stopPropagation();
        return;
      }
      
      // Send message
      if (target.id === 'send-btn') {
        this.sendMessage();
        e.stopPropagation();
        return;
      }
      
      // Version item click
      if (target.closest('.version-item')) {
        const versionItem = target.closest('.version-item') as HTMLElement;
        const versionId = versionItem.dataset.versionId;
        if (versionId) {
          this.selectVersion(versionId);
        }
        e.stopPropagation();
        return;
      }
      
      // Expand from collapsed state
      if (this.isCollapsed && target.closest('.agent-window')) {
        this.toggleCollapse();
        e.stopPropagation();
        return;
      }
    });
    
    // Enter key to send
    const userInput = this.shadow.getElementById('user-input') as HTMLTextAreaElement;
    userInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Make draggable
    this.makeDraggable();
    
    // Load API key
    this.loadApiKey();
  }

  private switchTab(tabName: string) {

    
    // Update tab buttons
    const tabs = this.shadow.querySelectorAll('.tab');
    tabs.forEach(tab => {
      if ((tab as HTMLElement).dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update tab content
    const contents = this.shadow.querySelectorAll('.tab-content');
    contents.forEach(content => {
      if (content.id === `${tabName}-tab`) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
    
    // Update versions list when switching to versions tab
    if (tabName === 'versions') {
      this.updateVersionsList();
    }
  }

  private toggleCollapse() {

    this.isCollapsed = !this.isCollapsed;
    const window = this.shadow.getElementById('agent-window');
    
    if (this.isCollapsed) {
      window?.classList.add('collapsed');

    } else {
      window?.classList.remove('collapsed');

    }
  }

  private makeDraggable() {
    const header = this.shadow.getElementById('agent-header');
    if (!header) return;
    
    header.addEventListener('mousedown', (e) => {
      // Don't drag if clicking on buttons
      if ((e.target as HTMLElement).closest('button')) return;
      
      this.isDragging = true;
      const rect = this.getBoundingClientRect();
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startLeft = rect.left;
      this.startTop = rect.top;
      
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      
      e.preventDefault();
    });
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    
    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    
    let newLeft = this.startLeft + deltaX;
    let newTop = this.startTop + deltaY;
    
    // Keep within viewport
    const rect = this.getBoundingClientRect();
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - rect.width));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - rect.height));
    
    this.style.left = newLeft + 'px';
    this.style.top = newTop + 'px';
    this.style.right = 'auto';
    this.style.bottom = 'auto';
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  private loadApiKey() {
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    const input = this.shadow.getElementById('api-key-input') as HTMLInputElement;
    if (input) {
      input.value = apiKey;
    }
    this.updateApiKeyVisibility();
  }

  private saveApiKey() {
    const input = this.shadow.getElementById('api-key-input') as HTMLInputElement;
    if (input && input.value.trim()) {
      localStorage.setItem('mutable-page-api-key', input.value.trim());
      this.updateApiKeyVisibility();
    }
  }

  private updateApiKeyVisibility() {
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    const section = this.shadow.getElementById('api-key-section');
    if (section) {
      if (apiKey) {
        section.classList.remove('show');
      } else {
        section.classList.add('show');
      }
    }
  }

  private sendMessage() {
    const input = this.shadow.getElementById('user-input') as HTMLTextAreaElement;
    const message = input.value.trim();
    
    if (!message) return;
    
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    if (!apiKey) {
      alert('Please enter your Anthropic API key first');
      return;
    }
    
    input.value = '';
    
    if (this.onSendMessage) {
      this.onSendMessage(message);
    }
  }

  private updateVersionsList() {
    const versionsList = this.shadow.getElementById('versions-list');
    if (!versionsList) return;
    
    const versions = this.getPageVersions();
    const currentVersion = localStorage.getItem('mutable-page-current-version') || '1.0 - Initial version';
    
    if (versions.length === 0) {
      versionsList.innerHTML = '<div class="no-versions">No versions saved yet</div>';
      return;
    }
    
    versionsList.innerHTML = versions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(version => {
        const isCurrent = version.title === currentVersion;
        return `
          <div class="version-item ${isCurrent ? 'current' : ''}" data-version-id="${version.id}">
            <div class="version-title">${version.title}</div>
            <div class="version-meta">
              <span>${new Date(version.timestamp).toLocaleString()}</span>
              ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
            </div>
          </div>
        `;
      })
      .join('');
  }

  private selectVersion(versionId: string) {
    const versions = this.getPageVersions();
    const version = versions.find(v => v.id === versionId);
    
    if (version && this.onVersionSelect) {
      this.onVersionSelect(version);
    }
  }

  private getPageVersions(): PageVersion[] {
    const saved = localStorage.getItem('mutable-page-versions');
    if (!saved) return [];
    
    try {
      return JSON.parse(saved).map((v: any) => ({
        ...v,
        timestamp: new Date(v.timestamp)
      }));
    } catch {
      return [];
    }
  }

  // Public API
  public addMessage(role: 'user' | 'assistant', content: string) {
    const messages = this.shadow.getElementById('messages');
    if (!messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    
    if (this.onNewMessage) {
      this.onNewMessage(role, content);
    }
  }

  public showThinking() {
    const messages = this.shadow.getElementById('messages');
    if (!messages) return;
    
    const thinkingDiv = document.createElement('div');
    thinkingDiv.id = 'thinking-indicator';
    thinkingDiv.className = 'thinking';
    thinkingDiv.innerHTML = `
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>Agent is thinking...</span>
    `;
    
    messages.appendChild(thinkingDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  public hideThinking() {
    const thinkingDiv = this.shadow.getElementById('thinking-indicator');
    if (thinkingDiv) {
      thinkingDiv.remove();
    }
  }

  public setSendMessageHandler(handler: (message: string) => void) {
    this.onSendMessage = handler;
  }

  public setVersionSelectHandler(handler: (version: PageVersion) => void) {
    this.onVersionSelect = handler;
  }

  public setNewMessageHandler(handler: (role: 'user' | 'assistant', content: string) => void) {
    this.onNewMessage = handler;
  }

  public refreshVersionsList() {
    this.updateVersionsList();
  }

  public show() {
    this.style.display = 'block';
  }

  public hide() {
    this.style.display = 'none';
  }
}

// Register the custom element
customElements.define('agent-box', AgentBoxComponent);

export { AgentBoxComponent, PageVersion };

import { AgenticLoop, Tool } from "./agenticloop";
import { AgentBoxComponent, PageVersion } from "./agent-component";

class MutablePageAgent {
  private apiKey: string = "";
  private agenticLoop: AgenticLoop | null = null;
  private currentVersion: string = "1.0 - Initial version";
  private agentBox: AgentBoxComponent;
  private initialContent: string = "";
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string, timestamp: Date}> = [];
  
  constructor() {
    this.initialContent = document.documentElement.outerHTML;
    this.saveInitialVersion();
    this.loadCurrentVersion();
    this.setupAgentBox();
    this.loadConversation();
  }
  
  private saveInitialVersion(): void {
    const versions = this.getPageVersions();
    
    // Always ensure the original version exists and is up-to-date
    const originalVersionExists = versions.some(v => v.id === '0');
    
    if (!originalVersionExists) {
      const initialVersion: PageVersion = {
        id: '0',
        title: '1.0 - Initial version',
        timestamp: new Date(),
        content: this.initialContent
      };
      
      // Add to beginning of versions array to keep it first
      const updatedVersions = [initialVersion, ...versions];
      localStorage.setItem('mutable-page-versions', JSON.stringify(updatedVersions));
      this.currentVersion = initialVersion.title;
      localStorage.setItem('mutable-page-current-version', this.currentVersion);
      this.updateVersionDisplay();
      console.log('Saved initial version to localStorage');
    }
  }
  
  private setupAgentBox() {
    // Remove old agent window if exists
    const oldAgent = document.getElementById('agent-window');
    if (oldAgent) {
      oldAgent.remove();
    }
    
    // Create and setup the agent box component
    this.agentBox = new AgentBoxComponent();
    document.body.appendChild(this.agentBox);
    
    // Set up event handlers
    this.agentBox.setSendMessageHandler((message) => this.handleSendMessage(message));
    this.agentBox.setVersionSelectHandler((version) => this.loadVersion(version));
    this.agentBox.setClearStorageHandler(() => this.clearStorage());
    this.agentBox.setResetConversationHandler(() => this.resetConversation());
    this.agentBox.setDeleteVersionHandler((versionId) => this.deleteVersion(versionId));
    
    // Make agent available globally for beforeunload
    (window as any).mutablePageAgent = this;
  }
  
  private loadVersion(version: PageVersion): void {
    // Remove confirmation dialog - just load the version directly
    {
      // Extract just the page content from the saved version, not the agent
      const parser = new DOMParser();
      const savedDoc = parser.parseFromString(version.content, 'text/html');
      const savedContent = savedDoc.querySelector('#page-content');
      
      if (savedContent) {
        const currentContent = document.querySelector('#page-content');
        if (currentContent) {
          currentContent.innerHTML = savedContent.innerHTML;
          
          // Update current version tracking
          this.currentVersion = version.title;
          this.saveCurrentVersion();
          this.updateVersionDisplay();
          
          console.log(`Loaded content from version: ${version.title}`);
        }
      } else {
        console.warn('Could not extract page content from saved version');
      }
    }
  }
  

  

  
  private loadCurrentVersion(): void {
    const saved = localStorage.getItem("mutable-page-current-version");
    if (saved) {
      this.currentVersion = saved;
      this.updateVersionDisplay();
    }
  }
  
  private saveCurrentVersion(): void {
    localStorage.setItem("mutable-page-current-version", this.currentVersion);
  }
  
  private updateVersionDisplay(): void {
    const element = document.getElementById("current-version");
    if (element) {
      element.textContent = this.currentVersion;
    }
  }
  
  private savePageVersion(title: string): void {
    const content = document.documentElement.outerHTML;
    const version: PageVersion = {
      id: Date.now().toString(),
      title,
      timestamp: new Date(),
      content
    };
    
    // Get existing versions
    const versions = this.getPageVersions();
    versions.push(version);
    
    // Keep only last 20 versions
    if (versions.length > 20) {
      versions.splice(0, versions.length - 20);
    }
    
    localStorage.setItem("mutable-page-versions", JSON.stringify(versions));
    
    // Update current version
    this.currentVersion = title;
    this.saveCurrentVersion();
    this.updateVersionDisplay();
    
    // Refresh the versions list in the agent box
    this.agentBox.refreshVersionsList();
  }
  
  private getPageVersions(): PageVersion[] {
    const saved = localStorage.getItem("mutable-page-versions");
    if (!saved) return [];
    
    try {
      return JSON.parse(saved).map((v: any) => ({
        ...v,
        timestamp: new Date(v.timestamp)
      }));
    } catch (error) {
      return [];
    }
  }
  
  public saveConversation(): void {
    localStorage.setItem('mutable-page-conversation', JSON.stringify(this.conversationHistory));
  }
  
  private loadConversation(): void {
    const saved = localStorage.getItem('mutable-page-conversation');
    if (saved) {
      try {
        this.conversationHistory = JSON.parse(saved).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        
        // Restore messages to agent box
        this.conversationHistory.forEach(msg => {
          this.agentBox.addMessage(msg.role, msg.content);
        });
      } catch (error) {
        console.error('Failed to load conversation:', error);
        this.conversationHistory = [];
      }
    }
  }
  
  private resetConversation(): void {
    this.conversationHistory = [];
    localStorage.removeItem('mutable-page-conversation');
    this.agentBox.clearMessages();
  }
  
  private clearStorage(): void {
    // Keep confirmation for destructive action like clearing all data
    if (confirm('Are you sure you want to clear all stored data? This will remove all versions and conversation history.')) {
      localStorage.removeItem('mutable-page-versions');
      localStorage.removeItem('mutable-page-current-version');
      localStorage.removeItem('mutable-page-conversation');
      localStorage.removeItem('mutable-page-api-key');
      
      // Reset to initial state
      this.currentVersion = '1.0 - Initial version';
      this.updateVersionDisplay();
      this.conversationHistory = [];
      this.agentBox.clearMessages();
      this.agentBox.refreshVersionsList();
      this.agentBox.forceUpdateApiKeyVisibility();
      
      alert('All stored data has been cleared.');
    }
  }
  
  private addToConversation(role: 'user' | 'assistant', content: string): void {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date()
    });
    // Auto-save after each message
    this.saveConversation();
  }
  
  private deleteVersion(versionId: string): void {
    const versions = this.getPageVersions();
    const versionToDelete = versions.find(v => v.id === versionId);
    
    if (!versionToDelete) {
      alert('Version not found.');
      return;
    }
    
    if (versions.length === 1) {
      alert('Cannot delete the only remaining version.');
      return;
    }
    
    if (versionId === '0') {
      alert('Cannot delete the initial version.');
      return;
    }
    
    // Keep confirmation for destructive action like deleting versions
    if (confirm(`Are you sure you want to delete the version "${versionToDelete.title}"? This action cannot be undone.`)) {
      // Remove the version from the list
      const updatedVersions = versions.filter(v => v.id !== versionId);
      localStorage.setItem('mutable-page-versions', JSON.stringify(updatedVersions));
      
      // If we deleted the current version, switch to the latest remaining version
      if (versionToDelete.title === this.currentVersion) {
        const latestVersion = updatedVersions.reduce((latest, version) => {
          return new Date(version.timestamp) > new Date(latest.timestamp) ? version : latest;
        });
        
        this.currentVersion = latestVersion.title;
        this.saveCurrentVersion();
        this.updateVersionDisplay();
      }
      
      // Refresh the versions list
      this.agentBox.refreshVersionsList();
      
      console.log(`Deleted version: ${versionToDelete.title}`);
    }
  }
  

  

  

  

  
  private async handleSendMessage(message: string): Promise<void> {
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    if (!apiKey) {
      alert('Please enter your Anthropic API key first');
      return;
    }
    
    this.agentBox.addMessage('user', message);
    this.addToConversation('user', message);
    this.agentBox.showThinking();
    
    try {
      this.agenticLoop = this.createAgenticLoop();
      await this.agenticLoop.runLoop(message);
    } catch (error) {
      this.agentBox.addMessage('assistant', `Error: ${(error as Error).message}`);
    } finally {
      this.agentBox.hideThinking();
    }
  }
  
  private createAgenticLoop(): AgenticLoop {
    const tools: Tool[] = [
      {
        name: "modify_page_content",
        description: "Modify the content of the page by updating HTML elements. You can change text, add new elements, modify styles, etc.",
        input_schema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              description: "The type of modification to make",
              enum: ["replace_content", "add_element", "modify_style", "remove_element", "insert_html"]
            },
            selector: {
              type: "string",
              description: "CSS selector for the target element(s). Not needed for insert_html action."
            },
            content: {
              type: "string",
              description: "New content, HTML, or CSS values depending on the action"
            },
            position: {
              type: "string",
              description: "For add_element: 'before', 'after', 'inside_start', or 'inside_end'"
            }
          },
          required: ["action"]
        },
        handler: async (input) => {
          const { action, selector, content, position } = input;
          
          try {
            switch (action) {
              case "replace_content":
                if (!selector || content === undefined) throw new Error("selector and content required for replace_content");
                const elements = document.querySelectorAll(selector);
                if (elements.length === 0) throw new Error(`No elements found for selector: ${selector}`);
                elements.forEach(el => el.innerHTML = content);
                return `Replaced content for ${elements.length} element(s) matching '${selector}'`;
                
              case "add_element":
                if (!selector || !content) throw new Error("selector and content required for add_element");
                const target = document.querySelector(selector);
                if (!target) throw new Error(`No element found for selector: ${selector}`);
                
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                const newElement = tempDiv.firstElementChild;
                if (!newElement) throw new Error("Invalid HTML content provided");
                
                switch (position) {
                  case "before":
                    target.parentNode?.insertBefore(newElement, target);
                    break;
                  case "after":
                    target.parentNode?.insertBefore(newElement, target.nextSibling);
                    break;
                  case "inside_start":
                    target.insertBefore(newElement, target.firstChild);
                    break;
                  case "inside_end":
                  default:
                    target.appendChild(newElement);
                    break;
                }
                return `Added element ${position || 'inside_end'} of '${selector}'`;
                
              case "modify_style":
                if (!selector || !content) throw new Error("selector and content required for modify_style");
                const testElements = document.querySelectorAll(selector);
                if (testElements.length === 0) throw new Error(`No elements found for selector: ${selector}`);
                
                // Create or update a style tag in the document head for persistent styles
                let styleTag = document.getElementById('mutable-page-styles') as HTMLStyleElement;
                if (!styleTag) {
                  styleTag = document.createElement('style');
                  styleTag.id = 'mutable-page-styles';
                  document.head.appendChild(styleTag);
                }
                
                // Parse CSS properties and create a CSS rule
                const cssProperties = content.split(';').filter(s => s.trim()).join('; ');
                const cssRule = `${selector} { ${cssProperties}; }`;
                
                // Add or update the CSS rule
                let existingCSS = styleTag.textContent || '';
                // Remove any existing rule for this selector
                const selectorRegex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\s*{[^}]*}`, 'g');
                existingCSS = existingCSS.replace(selectorRegex, '');
                // Add the new rule
                existingCSS += '\n' + cssRule;
                styleTag.textContent = existingCSS;
                
                return `Modified styles for elements matching '${selector}' with CSS rule: ${cssRule}`;
                
              case "remove_element":
                if (!selector) throw new Error("selector required for remove_element");
                const removeElements = document.querySelectorAll(selector);
                if (removeElements.length === 0) throw new Error(`No elements found for selector: ${selector}`);
                removeElements.forEach(el => el.remove());
                return `Removed ${removeElements.length} element(s) matching '${selector}'`;
                
              case "insert_html":
                if (!content) throw new Error("content required for insert_html");
                const container = document.getElementById("page-content");
                if (!container) throw new Error("Page content container not found");
                container.insertAdjacentHTML('beforeend', content);
                return "Inserted HTML content into page";
                
              default:
                throw new Error(`Unknown action: ${action}`);
            }
          } catch (error) {
            throw new Error(`Page modification failed: ${(error as Error).message}`);
          }
        }
      },
      {
        name: "title_revision",
        description: "Create a title for the current page revision and save it as a version.",
        input_schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "A descriptive title for this revision (e.g., 'Added dark theme', 'Reorganized content sections')"
            }
          },
          required: ["title"]
        },
        handler: async (input) => {
          const { title } = input;
          if (!title) throw new Error("Title is required");
          
          // Auto-save conversation before saving version
          this.saveConversation();
          this.savePageVersion(title);
          return `Saved page revision with title: "${title}"`;
        }
      },
      {
        name: "get_page_info",
        description: "Get information about the current page content and structure.",
        input_schema: {
          type: "object",
          properties: {
            info_type: {
              type: "string",
              description: "Type of information to retrieve",
              enum: ["content", "structure", "versions", "styles"]
            }
          },
          required: ["info_type"]
        },
        handler: async (input) => {
          const { info_type } = input;
          
          switch (info_type) {
            case "content":
              const content = document.getElementById("page-content")?.textContent || "";
              return `Page content (${content.length} characters): ${content.substring(0, 500)}${content.length > 500 ? '...' : ''}`;
              
            case "structure":
              const elements = document.getElementById("page-content")?.children || [];
              const structure = Array.from(elements).map(el => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + Array.from(el.classList).join('.') : ''}`).join(', ');
              return `Page structure: ${structure}`;
              
            case "versions":
              const versions = this.getPageVersions();
              return `Saved versions (${versions.length}): ${versions.map(v => `"${v.title}" (${new Date(v.timestamp).toLocaleString()})`).join(', ')}`;
              
            case "styles":
              const computedStyle = window.getComputedStyle(document.body);
              return `Current body styles - background: ${computedStyle.backgroundColor}, color: ${computedStyle.color}, font-family: ${computedStyle.fontFamily}`;
              
            default:
              throw new Error(`Unknown info_type: ${info_type}`);
          }
        }
      }
    ];
    
    const systemPrompt = `You are a helpful AI agent that can modify web pages. You have access to tools that let you:

1. **modify_page_content** - Change HTML content, add elements, modify styles, remove elements
2. **title_revision** - Save the current page state with a descriptive title 
3. **get_page_info** - Get information about the page content, structure, or saved versions

You are currently working on "The Mutable Page" - a demo page that showcases your ability to modify web content. The page stores revisions in localStorage.

When making changes:
- Always use descriptive selectors to target elements precisely
- For styling, use CSS property:value pairs separated by semicolons
- After making significant changes, use the title_revision tool to save the version
- Be creative but ensure the page remains functional and readable

Current page: ${window.location.href}
Page title: ${document.title}

COMMUNICATION STYLE: Always respond in clear paragraphs separated by double line breaks. Do not use markdown formatting like **bold** or *italic* or bullet points. Write in natural, conversational paragraphs that explain what you're doing and why. Each main idea should be its own paragraph.

The user can ask you to modify any aspect of the page. Be helpful and creative!`;
    
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    
    return new AgenticLoop({
      apiKey,
      systemPrompt,
      tools,
      onMessage: (role, content) => {
        if (content.trim()) {
          this.agentBox.addMessage(role, content);
          this.addToConversation(role, content);
        }
      },
      onToolCall: (toolCall, result) => {
        const display = result.is_error 
          ? `❌ ${toolCall.name}: ${result.content}`
          : `✅ ${toolCall.name}: ${result.content}`;
        this.agentBox.addMessage('assistant', display);
        
        // Auto-save conversation after each tool call
        this.saveConversation();
        

      }
    });
  }
}

// Initialize the agent when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MutablePageAgent();
  });
} else {
  // DOM is already loaded
  new MutablePageAgent();
}

// Auto-save conversation before page unload
window.addEventListener('beforeunload', () => {
  const agent = (window as any).mutablePageAgent;
  if (agent && agent.saveConversation) {
    agent.saveConversation();
  }
});

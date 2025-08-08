import { AgenticLoop, Tool } from "./agenticloop";
import { AgentBoxComponent } from "./agent-component";

class MutablePageAgent {
  private apiKey: string = "";
  private agenticLoop: AgenticLoop | null = null;
  private agentBox: AgentBoxComponent;
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string, timestamp: Date}> = [];
  private turnStartTime: number = 0;
  
  constructor() {
    this.setupAgentBox();
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
    this.agentBox.setClearStorageHandler(() => this.clearStorage());
    
    // Make agent available globally for beforeunload
    (window as any).mutablePageAgent = this;
  }
  

  

  

  

  

  

  
  public saveConversation(): void {
    // Conversation is no longer persisted to localStorage
  }
  
  private loadConversation(): void {
    // Conversation is no longer loaded from localStorage
  }
  
  private resetConversation(): void {
    this.conversationHistory = [];
  }

  private showTurnDuration(): void {
    if (this.turnStartTime === 0) return;
    
    const duration = (Date.now() - this.turnStartTime) / 1000;
    this.agentBox.showTurnDuration(duration);
    
    // Reset the timer
    this.turnStartTime = 0;
  }
  
  private clearStorage(): void {
    // Keep confirmation for destructive action like clearing all data
    if (confirm('Are you sure you want to clear all stored data? This will remove your API key.')) {
      localStorage.removeItem('mutable-page-api-key');
      
      // Reset to initial state
      this.conversationHistory = [];
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
  }
  

  

  

  

  

  
  private async handleSendMessage(message: string): Promise<void> {
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    if (!apiKey) {
      alert('Please enter your Anthropic API key first');
      return;
    }
    
    this.agentBox.addMessage('user', message);
    this.addToConversation('user', message);
    this.turnStartTime = Date.now();
    this.agentBox.showThinking();
    
    try {
      this.agenticLoop = this.createAgenticLoop();
      await this.agenticLoop.runLoop(message);
    } catch (error) {
      this.agentBox.addMessage('assistant', `Error: ${(error as Error).message}`);
    } finally {
      this.agentBox.hideThinking();
      this.showTurnDuration();
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
        preExecutionDisplay: (input) => {
          const { action, selector, content } = input;
          switch (action) {
            case "replace_content":
              return `🔄 Replacing content in ${selector}...`;
            case "add_element":
              return `➕ Adding element to ${selector}...`;
            case "modify_style":
              const firstProp = content?.split(';')[0]?.trim() || '';
              return `🎨 Applying CSS to ${selector}: ${firstProp}...`;
            case "remove_element":
              return `➖ Removing ${selector}...`;
            case "insert_html":
              return `📝 Inserting HTML content...`;
            default:
              return `⚙️ Executing ${action}...`;
          }
        },
        displayFormatter: (input, result) => {
          const { action, selector } = input;
          if (result.is_error) {
            return `❌ Failed: ${result.content}`;
          }
          
          switch (action) {
            case "replace_content":
              return `✅ Content replaced in ${selector}`;
            case "add_element":
              return `✅ Element added to ${selector}`;
            case "modify_style":
              return `✅ Styles applied to ${selector}`;
            case "remove_element":
              return `✅ Removed ${selector}`;
            case "insert_html":
              return `✅ HTML content inserted`;
            default:
              return `✅ ${action} completed`;
          }
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
        name: "get_page_info",
        description: "Get information about the current page content and structure.",
        input_schema: {
          type: "object",
          properties: {
            info_type: {
              type: "string",
              description: "Type of information to retrieve",
              enum: ["content", "structure", "styles"]
            }
          },
          required: ["info_type"]
        },
        preExecutionDisplay: (input) => {
          const { info_type } = input;
          switch (info_type) {
            case "content":
              return `📄 Reading page content...`;
            case "structure":
              return `🏧 Analyzing page structure...`;
            case "styles":
              return `🎨 Inspecting page styles...`;
            default:
              return `ℹ️ Getting ${info_type} info...`;
          }
        },
        displayFormatter: (input, result) => {
          if (result.is_error) {
            return `❌ Failed to get page info: ${result.content}`;
          }
          const { info_type } = input;
          switch (info_type) {
            case "content":
              return `✅ Retrieved page content`;
            case "structure":
              return `✅ Retrieved page structure`;
            case "styles":
              return `✅ Retrieved style information`;
            default:
              return `✅ Retrieved ${info_type} info`;
          }
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
2. **get_page_info** - Get information about the page content, structure, or styles

You are currently working on "The Mutable Page" - a demo page that showcases your ability to modify web content.

When making changes:
- Always use descriptive selectors to target elements precisely
- For styling, use CSS property:value pairs separated by semicolons
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
      onPreToolCall: (toolCall) => {
        // Find the tool definition to use its pre-execution display if available
        const tool = tools.find(t => t.name === toolCall.name);
        if (tool?.preExecutionDisplay) {
          const display = tool.preExecutionDisplay(toolCall.input);
          this.agentBox.addMessage('assistant', display);
        }
      },
      onToolCall: (toolCall, result) => {
        // Find the tool definition to use its display formatter if available
        const tool = tools.find(t => t.name === toolCall.name);
        let display: string;
        
        if (tool?.displayFormatter) {
          display = tool.displayFormatter(toolCall.input, result);
        } else {
          // Fallback to default display
          display = result.is_error 
            ? `❌ ${toolCall.name}: ${result.content}`
            : `✅ ${toolCall.name}: ${result.content}`;
        }
        
        this.agentBox.addMessage('assistant', display);
        

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
// Removed beforeunload conversation persistence

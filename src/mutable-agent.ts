import { AgenticLoop, Tool } from "./agenticloop";
import { AgentBoxComponent, PageVersion } from "./agent-component";

class MutablePageAgent {
  private apiKey: string = "";
  private agenticLoop: AgenticLoop | null = null;
  private currentVersion: string = "1.0 - Initial version";
  private agentBox: AgentBoxComponent;
  private initialContent: string = "";
  
  constructor() {
    this.initialContent = document.documentElement.outerHTML;
    this.loadCurrentVersion();
    this.loadLatestVersion();
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
    this.agentBox.setVersionSelectHandler((version) => this.loadVersion(version));
  }
  
  private loadVersion(version: PageVersion): void {
    // Save current state before switching if it's different
    const currentHtml = document.documentElement.outerHTML;
    if (currentHtml !== version.content) {
      // We're switching versions, load the selected one
      document.open();
      document.write(version.content);
      document.close();
      
      // Update current version
      this.currentVersion = version.title;
      localStorage.setItem('mutable-page-current-version', this.currentVersion);
      this.updateVersionDisplay();
      
      // Reinitialize after loading new content
      setTimeout(() => {
        this.setupAgentBox();
      }, 100);
    }
  }
  
  private loadLatestVersion(): void {
    const versions = this.getPageVersions();
    if (versions.length === 0) {
      return; // No versions saved, stay with current content
    }
    
    // Find the latest version
    const latestVersion = versions.reduce((latest, version) => {
      return new Date(version.timestamp) > new Date(latest.timestamp) ? version : latest;
    });
    
    // Only load if it's different from current
    const currentHtml = document.documentElement.outerHTML;
    if (latestVersion.content !== currentHtml && latestVersion.title !== this.currentVersion) {
      this.loadVersion(latestVersion);
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
    } catch {
      return [];
    }
  }
  

  

  

  

  
  private async handleSendMessage(message: string): Promise<void> {
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    if (!apiKey) {
      alert('Please enter your Anthropic API key first');
      return;
    }
    
    this.agentBox.addMessage('user', message);
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
                const styleElements = document.querySelectorAll(selector);
                if (styleElements.length === 0) throw new Error(`No elements found for selector: ${selector}`);
                
                // Parse CSS properties from content
                const styles = content.split(';').filter(s => s.trim());
                styleElements.forEach(el => {
                  styles.forEach(style => {
                    const [prop, value] = style.split(':').map(s => s.trim());
                    if (prop && value) {
                      (el as HTMLElement).style.setProperty(prop, value);
                    }
                  });
                });
                return `Modified styles for ${styleElements.length} element(s) matching '${selector}'`;
                
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

The user can ask you to modify any aspect of the page. Be helpful and creative!`;
    
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    
    return new AgenticLoop({
      apiKey,
      systemPrompt,
      tools,
      onMessage: (role, content) => {
        if (content.trim()) {
          this.agentBox.addMessage(role, content);
        }
      },
      onToolCall: (toolCall, result) => {
        const display = result.is_error 
          ? `❌ ${toolCall.name}: ${result.content}`
          : `✅ ${toolCall.name}: ${result.content}`;
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

import { AgenticLoop, Tool } from "./agenticloop";
import { AgentBoxComponent } from "./agent-component";

class MutableSpeechPageAgent {
  private apiKey: string = "";
  private agenticLoop: AgenticLoop | null = null;
  private selectedModel: string;
  private agentBox: AgentBoxComponent;
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string, timestamp: Date}> = [];
  private turnStartTime: number = 0;
  
  // Speech recognition properties
  private recognition: any = null;
  private isListening: boolean = false;
  private speechBuffer: string = "";
  private lastSpeechTime: number = 0;
  private speechTimeoutId: number | null = null;
  private speechIndicator: HTMLElement | null = null;
  private speechText: HTMLElement | null = null;
  
  constructor() {
    this.selectedModel = localStorage.getItem('mutable-page-model') || 'claude-sonnet-4-20250514';
    this.setupAgentBox();
    this.initializeSpeechRecognition();
    this.setupSpeechIndicator();
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
    this.agentBox.setModelChangeHandler((model) => this.changeModel(model));
    
    // Add speech recognition button to the agent box
    this.addSpeechButton();
    
    // Make agent available globally for beforeunload
    (window as any).mutableSpeechPageAgent = this;
  }
  
  private setupSpeechIndicator() {
    this.speechIndicator = document.getElementById('speech-indicator');
    this.speechText = document.getElementById('speech-text');
  }
  
  private addSpeechButton() {
    // Add speech button to the agent component's input area
    // We'll need to access the shadow DOM or modify the agent component
    // For now, let's add a custom speech interface
    setTimeout(() => {
      const inputContainer = this.agentBox.shadowRoot?.querySelector('.input-controls');
      if (inputContainer) {
        const speechButton = document.createElement('button');
        speechButton.innerHTML = '🎤';
        speechButton.title = 'Click to start/stop speech recognition';
        speechButton.style.cssText = `
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 18px;
          cursor: pointer;
          margin-left: 8px;
          transition: all 0.3s ease;
        `;
        
        speechButton.addEventListener('click', () => this.toggleSpeechRecognition());
        
        // Update button style based on listening state
        speechButton.addEventListener('mouseenter', () => {
          if (!this.isListening) {
            speechButton.style.background = '#45a049';
          }
        });
        
        speechButton.addEventListener('mouseleave', () => {
          speechButton.style.background = this.isListening ? '#f44336' : '#4CAF50';
        });
        
        inputContainer.appendChild(speechButton);
        
        // Store reference for state updates
        (this as any).speechButton = speechButton;
      }
    }, 100);
  }
  
  private initializeSpeechRecognition() {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech Recognition is not supported in this browser');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    // Configure recognition settings
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;
    
    this.setupSpeechEvents();
  }
  
  private setupSpeechEvents() {
    if (!this.recognition) return;
    
    this.recognition.onstart = () => {
      this.isListening = true;
      this.updateSpeechUI();
      this.showSpeechIndicator(true);
      console.log('Speech recognition started');
    };
    
    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Update speech buffer with any final results
      if (finalTranscript) {
        this.speechBuffer += finalTranscript + ' ';
        this.lastSpeechTime = Date.now();
        this.updateSpeechIndicatorText(this.speechBuffer.trim());
        this.scheduleSpeechTimeout();
      }
      
      // Show interim results in the indicator
      if (interimTranscript && !finalTranscript) {
        const displayText = (this.speechBuffer + interimTranscript).trim();
        this.updateSpeechIndicatorText(displayText);
      }
    };
    
    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.handleSpeechError(event.error);
    };
    
    this.recognition.onend = () => {
      this.isListening = false;
      this.updateSpeechUI();
      this.showSpeechIndicator(false);
      console.log('Speech recognition ended');
    };
  }
  
  private scheduleSpeechTimeout() {
    // Clear existing timeout
    if (this.speechTimeoutId) {
      clearTimeout(this.speechTimeoutId);
    }
    
    // Set new timeout for 2 seconds
    this.speechTimeoutId = window.setTimeout(() => {
      if (this.speechBuffer.trim()) {
        this.processSpeechBuffer();
      }
    }, 2000);
  }
  
  private async processSpeechBuffer() {
    const message = this.speechBuffer.trim();
    if (!message) return;
    
    // Clear the buffer
    this.speechBuffer = '';
    this.updateSpeechIndicatorText('Processing...');
    
    // Send the message to the agent
    await this.handleSendMessage(message);
    
    // Update indicator
    setTimeout(() => {
      if (!this.isListening) {
        this.showSpeechIndicator(false);
      } else {
        this.updateSpeechIndicatorText('Listening...');
      }
    }, 1000);
  }
  
  public toggleSpeechRecognition() {
    if (!this.recognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or another Chromium-based browser.');
      return;
    }
    
    if (this.isListening) {
      this.stopSpeechRecognition();
    } else {
      this.startSpeechRecognition();
    }
  }
  
  private startSpeechRecognition() {
    if (!this.recognition || this.isListening) return;
    
    // Reset speech buffer
    this.speechBuffer = '';
    this.lastSpeechTime = 0;
    
    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      alert('Failed to start speech recognition. Please try again.');
    }
  }
  
  private stopSpeechRecognition() {
    if (!this.recognition || !this.isListening) return;
    
    // Process any remaining buffer before stopping
    if (this.speechBuffer.trim()) {
      this.processSpeechBuffer();
    }
    
    this.recognition.stop();
  }
  
  private updateSpeechUI() {
    const speechButton = (this as any).speechButton;
    if (speechButton) {
      speechButton.style.background = this.isListening ? '#f44336' : '#4CAF50';
      speechButton.innerHTML = this.isListening ? '⏹️' : '🎤';
      speechButton.title = this.isListening ? 'Click to stop speech recognition' : 'Click to start speech recognition';
    }
  }
  
  private showSpeechIndicator(show: boolean) {
    if (this.speechIndicator) {
      this.speechIndicator.style.display = show ? 'flex' : 'none';
    }
  }
  
  private updateSpeechIndicatorText(text: string) {
    if (this.speechText) {
      this.speechText.textContent = text || 'Listening...';
    }
  }
  
  private handleSpeechError(error: string) {
    let errorMessage = 'Speech recognition error: ';
    
    switch (error) {
      case 'no-speech':
        errorMessage += 'No speech detected. Please try again.';
        break;
      case 'audio-capture':
        errorMessage += 'Microphone access denied or unavailable.';
        break;
      case 'not-allowed':
        errorMessage += 'Microphone access denied. Please allow microphone access.';
        break;
      case 'network':
        errorMessage += 'Network error. Please check your connection.';
        break;
      default:
        errorMessage += error;
    }
    
    console.error(errorMessage);
    this.showSpeechIndicator(false);
  }
  
  // Rest of the methods are the same as MutablePageAgent
  
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

  private changeModel(model: string): void {
    this.selectedModel = model;
    localStorage.setItem('mutable-page-model', model);
  }
  
  private clearStorage(): void {
    // Keep confirmation for destructive action like clearing all data
    if (confirm('Are you sure you want to clear all stored data? This will remove your API key and model selection.')) {
      localStorage.removeItem('mutable-page-api-key');
      localStorage.removeItem('mutable-page-model');
      
      // Reset to initial state
      this.selectedModel = 'claude-sonnet-4-20250514';
      this.conversationHistory = [];
      this.agentBox.forceUpdateApiKeyVisibility();
      this.agentBox.updateModelSelection(this.selectedModel);
      
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
                let styleTag = document.getElementById('mutable-speech-page-styles') as HTMLStyleElement;
                if (!styleTag) {
                  styleTag = document.createElement('style');
                  styleTag.id = 'mutable-speech-page-styles';
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
    
    const systemPrompt = `You are a helpful AI agent that can modify web pages using voice commands. You have access to tools that let you:

1. **modify_page_content** - Change HTML content, add elements, modify styles, remove elements
2. **get_page_info** - Get information about the page content, structure, or styles

You are currently working on "The Mutable Speech Page" - a demo page that showcases your ability to modify web content through speech recognition.

When making changes:
- Always use descriptive selectors to target elements precisely
- For styling, use CSS property:value pairs separated by semicolons
- Be creative but ensure the page remains functional and readable
- Remember that the user is speaking to you, so interpret natural language commands

Current page: ${window.location.href}
Page title: ${document.title}

COMMUNICATION STYLE: Always respond in clear paragraphs separated by double line breaks. Do not use markdown formatting like **bold** or *italic* or bullet points. Write in natural, conversational paragraphs that explain what you're doing and why. Each main idea should be its own paragraph.

The user can speak commands to modify any aspect of the page. Be helpful and creative in interpreting their spoken requests!`;
    
    const apiKey = localStorage.getItem('mutable-page-api-key') || '';
    
    return new AgenticLoop({
      apiKey,
      selectedModel: this.selectedModel,
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
    new MutableSpeechPageAgent();
  });
} else {
  // DOM is already loaded
  new MutableSpeechPageAgent();
}

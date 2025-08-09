import { marked } from "marked";
import DOMPurify from "dompurify";
import { AgenticLoop, Tool, TokenUsage, ToolCall, ToolResult } from "./agenticloop";

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

interface ModelPricing {
  input: number; // per million tokens
  output: number; // per million tokens
  cache_write: number; // per million tokens
  cache_read: number; // per million tokens
}

class BookmarkletAgent extends HTMLElement {
  private isVisible = false;
  private apiKey: string;
  private selectedModel: string;
  private container: HTMLElement | null = null;
  private shadowRoot!: ShadowRoot;
  private hasEmbeddedApiKey = false;
  private _eval_results: any[] = [];
  private totalTokenUsage: TokenUsage = {
    input_tokens: 0,
    output_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
  };
  private agenticLoop: AgenticLoop | null = null;
  private turnStartTime: number = 0;
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

  constructor(embeddedApiKey?: string) {
    super();
    console.log('BookmarkletAgent constructor called with:', embeddedApiKey);
    if (embeddedApiKey) {
      this.apiKey = embeddedApiKey;
      this.hasEmbeddedApiKey = true;
    } else {
      this.apiKey = localStorage.getItem("bookmarklet-agent-api-key") || "";
      this.hasEmbeddedApiKey = false;
    }
    this.selectedModel =
      localStorage.getItem("bookmarklet-agent-model") ||
      "claude-sonnet-4-20250514";
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
    
    console.log('BookmarkletAgent constructor completed');
  }

  private createShadowStyles(): void {
    const shadowRoot = this.shadowRoot!;
    
    // Create style element for our CSS
    const styleElement = document.createElement('style');
    
    // Embed all styles directly - no external loading
    styleElement.textContent = this.getAllStyles();
    
    shadowRoot.appendChild(styleElement);
  }

  init(): void {
    console.log('BookmarkletAgent init() called, isCollapsed:', this.isCollapsed);
    try {
      // Create shadow styles synchronously
      this.createShadowStyles();
      
      if (this.isCollapsed) {
        this.expand();
      } else {
        this.createUI();
        this.show();
      }
      console.log('BookmarkletAgent init() completed successfully');
    } catch (e) {
      console.error('BookmarkletAgent init() error:', e);
      throw e;
    }
  }

  private renderMarkdown(content: string): string {
    try {
      const html = marked.parse(content);
      return DOMPurify.sanitize(html);
    } catch (error) {
      console.warn("Markdown rendering failed:", error);
      // Fallback to plain text
      return content.replace(/\n/g, "<br>");
    }
  }

  private isCollapsed = false;

  private createUI(): void {
    if (this.container) return;

    const shadowRoot = this.shadowRoot!;
    this.container = document.createElement("div");
    this.container.id = "bookmarklet-agent";
    this.container.className = "agent-main-container";
    this.container.style.cssText =
      "z-index: 2147483647 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;";

    this.container.innerHTML = `
      <div class="agent-header">
        <h3 class="agent-title">Itsy Bitsy Agent</h3>
        <div class="token-usage" id="token-usage" style="font-size: 10px; pointer-events: auto;">
          <div class="token-tooltip" id="token-tooltip" style="z-index: 2147483648 !important;"></div>
        </div>
        <button class="collapse-btn" data-action="collapse" title="Collapse to spider">⚊</button>
        <button class="close-btn" data-action="close">×</button>
      </div>
      <div class="agent-body">
        <div class="api-key-section" ${
          this.apiKey ? 'style="display: none;"' : ""
        }>
          <label class="api-key-label">Anthropic API Key:</label>
          <input type="text" id="api-key-input" placeholder="sk-..." value="${
            this.apiKey
          }" class="api-key-input">
          <div class="save-options">
            <button data-action="save-session" class="save-btn">Use for session</button>
            <button data-action="save-persistent" class="save-btn">Save for this website</button>
          </div>
        </div>
        <div class="chat-section">
          <div id="chat-messages" class="chat-messages"></div>
          <div class="input-section">
            <textarea id="user-input" placeholder="What would you like me to do on this page?" class="user-input"></textarea>
            <div class="send-controls">
              <select id="model-select" data-action="change-model" class="model-select">
                <option value="claude-sonnet-4-20250514" ${
                  this.selectedModel === "claude-sonnet-4-20250514"
                    ? "selected"
                    : ""
                }>Sonnet 4.0</option>
                <option value="claude-3-5-sonnet-20241022" ${
                  this.selectedModel === "claude-3-5-sonnet-20241022"
                    ? "selected"
                    : ""
                }>Sonnet 3.5</option>
                <option value="claude-3-5-haiku-20241022" ${
                  this.selectedModel === "claude-3-5-haiku-20241022"
                    ? "selected"
                    : ""
                }>Haiku 3.5</option>
                <option value="claude-opus-4-20250514" ${
                  this.selectedModel === "claude-opus-4-20250514"
                    ? "selected"
                    : ""
                }>Opus 4.0</option>
              </select>
              <button data-action="send" class="send-btn">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Styles are handled in shadow DOM during initialization
    this.addEventListeners();
    this.addTokenUsageHover();
    this.addResizeObserver();
    shadowRoot.appendChild(this.container);
  }

  private createCollapsedUI(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }

    const shadowRoot = this.shadowRoot!;
    this.container = document.createElement("div");
    this.container.id = "bookmarklet-agent-collapsed";
    this.container.className = "agent-collapsed-container";
    this.container.style.cssText =
      "z-index: 2147483647 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;";

    this.container.innerHTML = `
      <span class="spider-emoji" data-action="expand" title="Expand agent">🕷️</span>
    `;

    this.addEventListeners();
    this.addDragFunctionality();
    shadowRoot.appendChild(this.container);
  }

  private addEventListeners(): void {
    if (!this.container) return;

    this.container.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute("data-action");

      console.log("Click event:", action, target.tagName, target.className);

      switch (action) {
        case "close":
          this.hide();
          break;
        case "collapse":
          this.collapse();
          break;
        case "expand":
          this.expand();
          break;
        case "save-session":
          console.log("Save session clicked");
          this.saveApiKey(false);
          break;
        case "save-persistent":
          console.log("Save persistent clicked");
          this.saveApiKey(true);
          break;
        case "send":
          this.sendMessage();
          break;
      }
    });

    this.container.addEventListener("change", (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute("data-action");

      switch (action) {
        case "change-model":
          this.changeModel();
          break;
      }
    });

    const textarea = this.container.querySelector(
      "#user-input"
    ) as HTMLTextAreaElement;
    textarea?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Add drag functionality if not collapsed
    if (!this.isCollapsed) {
      this.addDragFunctionality();
    }
  }

  private addDragFunctionality(): void {
    if (!this.container) return;

    // For collapsed state, the entire container is draggable
    const dragHandle = this.isCollapsed
      ? this.container
      : (this.container.querySelector(".agent-header") as HTMLElement);

    if (!dragHandle) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;

      // For expanded state, don't drag if clicking on interactive elements (unless collapsed)
      if (
        !this.isCollapsed &&
        (target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.classList.contains("token-usage") ||
          target.closest(".token-usage") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select"))
      ) {
        return;
      }

      // On mobile, prevent dragging expanded state to maintain full-width layout
      if (!this.isCollapsed && window.innerWidth <= 768) {
        return;
      }

      isDragging = true;

      // Get current position
      const rect = this.container!.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;

      // Get mouse/touch position
      if (e instanceof MouseEvent) {
        startX = e.clientX;
        startY = e.clientY;
      } else if (e instanceof TouchEvent && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const moveDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !this.container) return;

      // On mobile, prevent dragging expanded state to maintain full-width layout
      if (!this.isCollapsed && window.innerWidth <= 768) {
        return;
      }

      let clientX: number, clientY: number;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e instanceof TouchEvent && e.touches.length === 1) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const newLeft = startLeft + deltaX;
      const newTop = startTop + deltaY;

      // Keep the container within viewport bounds
      const containerRect = this.container.getBoundingClientRect();
      const maxLeft = window.innerWidth - containerRect.width;
      const maxTop = window.innerHeight - containerRect.height;

      const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
      const clampedTop = Math.max(0, Math.min(newTop, maxTop));

      this.container.style.left = clampedLeft + "px";
      this.container.style.top = clampedTop + "px";
      this.container.style.right = "auto";
      this.container.style.bottom = "auto";
    };

    const endDrag = () => {
      isDragging = false;
    };

    // Mouse events
    dragHandle.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    // Touch events
    dragHandle.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        startDrag(e);
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        moveDrag(e);
      },
      { passive: false }
    );

    document.addEventListener("touchend", endDrag);
  }

  private addTokenUsageHover(): void {
    // Add JavaScript-based hover for token usage tooltip since CSS hover can be unreliable
    setTimeout(() => {
      const tokenUsage = document.getElementById("token-usage");
      const tooltip = document.getElementById("token-tooltip");

      if (tokenUsage && tooltip) {
        tokenUsage.addEventListener("mouseenter", () => {
          // Position tooltip using fixed positioning to avoid clipping
          const rect = tokenUsage.getBoundingClientRect();
          const tooltipWidth = 300; // max-width from CSS
          const tooltipHeight = 100; // estimated height

          // Position below the token usage area
          let left = rect.left + rect.width / 2 - tooltipWidth / 2;
          let top = rect.bottom + 5;

          // Keep tooltip within viewport bounds
          if (left < 10) left = 10;
          if (left + tooltipWidth > window.innerWidth - 10) {
            left = window.innerWidth - tooltipWidth - 10;
          }
          if (top + tooltipHeight > window.innerHeight - 10) {
            // Show above instead
            top = rect.top - tooltipHeight - 5;
          }

          tooltip.style.left = left + "px";
          tooltip.style.top = top + "px";
          tooltip.classList.add("show");
        });

        tokenUsage.addEventListener("mouseleave", () => {
          tooltip.classList.remove("show");
        });

        // Also handle touch events for mobile
        tokenUsage.addEventListener("touchstart", (e) => {
          e.preventDefault();

          if (tooltip.classList.contains("show")) {
            tooltip.classList.remove("show");
          } else {
            // Position tooltip for touch
            const rect = tokenUsage.getBoundingClientRect();
            const tooltipWidth = 300;
            const tooltipHeight = 100;

            let left = rect.left + rect.width / 2 - tooltipWidth / 2;
            let top = rect.bottom + 5;

            if (left < 10) left = 10;
            if (left + tooltipWidth > window.innerWidth - 10) {
              left = window.innerWidth - tooltipWidth - 10;
            }
            if (top + tooltipHeight > window.innerHeight - 10) {
              top = rect.top - tooltipHeight - 5;
            }

            tooltip.style.left = left + "px";
            tooltip.style.top = top + "px";
            tooltip.classList.add("show");
          }
        });
      }
    }, 100); // Small delay to ensure elements are created
  }

  private addResizeObserver(): void {
    if (!this.container || !window.ResizeObserver) return;

    const resizeObserver = new ResizeObserver(() => {
      // Ensure chat messages scroll area properly adjusts to container size
      const chatMessages = document.getElementById("chat-messages");
      if (chatMessages) {
        // Scroll to bottom when container is resized
        setTimeout(() => {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 0);
      }
    });

    resizeObserver.observe(this.container);
  }

  private getAllStyles(): string {
    return `
      /* Reset and base styles */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      /* Main container styles */
      .agent-main-container {
        position: fixed !important;
        top: 0.625rem !important;
        right: 0.625rem !important;
        left: 0.625rem !important;
        width: auto !important;
        max-height: calc(100vh - 20px) !important;
        background-color: white !important;
        border: 1px solid #d1d5db !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        font-size: 0.875rem !important;
        line-height: 1.5 !important;
        color: black !important;
        display: flex !important;
        flex-direction: column !important;
        resize: none !important;
        overflow: hidden !important;
      }
      
      /* Desktop styles */
      @media (min-width: 1024px) {
        .agent-main-container {
          top: 1.25rem !important;
          right: 1.25rem !important;
          left: auto !important;
          width: 24rem !important;
          max-width: 24rem !important;
          min-width: 18rem !important;
          max-height: 600px !important;
          resize: both !important;
        }
      }
      
      /* Header styles */
      .agent-header {
        background-color: #f9fafb !important;
        padding: 0.625rem 0.75rem !important;
        border-bottom: 1px solid #e5e7eb !important;
        border-radius: 0.5rem 0.5rem 0 0 !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: 0.5rem !important;
        cursor: move !important;
        user-select: none !important;
      }
      
      @media (min-width: 1024px) {
        .agent-header {
          padding: 0.75rem !important;
        }
      }
      
      .agent-title {
        margin: 0 !important;
        font-size: 0.875rem !important;
        font-weight: 600 !important;
        color: #111827 !important;
        font-family: inherit !important;
        line-height: 1.5 !important;
        padding: 0 !important;
      }
      
      @media (min-width: 1024px) {
        .agent-title {
          font-size: 1rem !important;
        }
      }
      
      .token-usage {
        flex: 1 !important;
        text-align: center !important;
        font-size: 0.75rem !important;
        color: #4b5563 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        cursor: help !important;
        position: relative !important;
        font-family: inherit !important;
      }
      
      .token-tooltip {
        position: fixed !important;
        background-color: #1f2937 !important;
        color: white !important;
        padding: 0.5rem 0.75rem !important;
        border-radius: 0.25rem !important;
        font-size: 0.75rem !important;
        white-space: pre-line !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transition: opacity 200ms !important;
        max-width: 18rem !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !important;
        font-family: inherit !important;
        line-height: 1.25 !important;
      }
      
      .token-tooltip.show {
        opacity: 1 !important;
      }
      
      .collapse-btn, .close-btn {
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        padding: 0 !important;
        width: 1.5rem !important;
        height: 1.5rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: #4b5563 !important;
        font-family: inherit !important;
        margin: 0 !important;
      }
      
      .collapse-btn {
        font-size: 1rem !important;
      }
      
      .close-btn {
        font-size: 1.25rem !important;
        color: #111827 !important;
      }
      
      .collapse-btn:hover {
        color: #111827 !important;
      }
      
      /* Body styles */
      .agent-body {
        padding: 0.625rem !important;
        display: flex !important;
        flex-direction: column !important;
        flex: 1 !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
        min-height: 0 !important;
        height: 100% !important;
        max-height: calc(100vh - 60px) !important;
      }
      
      @media (min-width: 1024px) {
        .agent-body {
          padding: 0.75rem !important;
          max-height: none !important;
        }
      }
      
      /* API Key section */
      .api-key-section {
        margin-bottom: 0.75rem !important;
        padding: 0.625rem !important;
        background-color: #f9fafb !important;
        border-radius: 0.25rem !important;
        box-sizing: border-box !important;
      }
      
      .api-key-label {
        display: block !important;
        margin-bottom: 0.5rem !important;
        font-weight: 500 !important;
        color: #111827 !important;
        font-family: inherit !important;
      }
      
      .api-key-input {
        width: 100% !important;
        padding: 0.5rem !important;
        border: 1px solid #d1d5db !important;
        border-radius: 0.25rem !important;
        margin-bottom: 0.5rem !important;
        font-size: 0.875rem !important;
        box-sizing: border-box !important;
        font-family: inherit !important;
        background-color: white !important;
        color: black !important;
      }
      
      .save-options {
        display: flex !important;
        gap: 0.5rem !important;
        margin-top: 0.5rem !important;
      }
      
      .save-btn {
        background-color: #2563eb !important;
        color: white !important;
        border: none !important;
        padding: 0.5rem 0.75rem !important;
        border-radius: 0.25rem !important;
        cursor: pointer !important;
        font-size: 0.75rem !important;
        flex: 1 !important;
        font-family: inherit !important;
      }
      
      .save-btn:hover {
        background-color: #1d4ed8 !important;
      }
      
      /* Chat section */
      .chat-section {
        display: flex !important;
        flex-direction: column !important;
        flex: 1 !important;
        overflow: hidden !important;
        min-height: 0 !important;
        height: 100% !important;
      }
      
      .chat-messages {
        flex: 1 !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        margin-bottom: 0.75rem !important;
        padding-right: 0.5rem !important;
        min-height: 6rem !important;
        max-height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 0.5rem !important;
      }
      
      .chat-messages::-webkit-scrollbar {
        width: 6px !important;
      }
      
      .chat-messages::-webkit-scrollbar-track {
        background: #f1f1f1 !important;
        border-radius: 3px !important;
      }
      
      .chat-messages::-webkit-scrollbar-thumb {
        background: #ccc !important;
        border-radius: 3px !important;
      }
      
      .chat-messages::-webkit-scrollbar-thumb:hover {
        background: #999 !important;
      }
      
      /* Message styles */
      .message {
        margin-bottom: 0 !important;
        padding: 0.25rem 0.5rem !important;
        border-radius: 0.375rem !important;
        max-width: 90% !important;
        font-size: 0.75rem !important;
        line-height: 1.375 !important;
        box-sizing: border-box !important;
        font-family: inherit !important;
        flex-shrink: 0 !important;
      }
      
      @media (min-width: 1024px) {
        .message {
          padding: 0.375rem 0.625rem !important;
          font-size: 0.875rem !important;
        }
      }
      
      .message-user {
        background-color: #2563eb !important;
        color: white !important;
        margin-left: auto !important;
      }
      
      .message-assistant {
        background-color: #f9fafb !important;
        border: 1px solid #e5e7eb !important;
        color: black !important;
      }
      
      /* Input section */
      .input-section {
        display: flex !important;
        flex-direction: column !important;
        gap: 0.5rem !important;
      }
      
      .user-input {
        padding: 0.5rem !important;
        border: 1px solid #d1d5db !important;
        border-radius: 0.25rem !important;
        resize: vertical !important;
        min-height: 2.25rem !important;
        max-height: 7.5rem !important;
        font-size: 0.75rem !important;
        font-family: inherit !important;
        box-sizing: border-box !important;
        background-color: white !important;
        color: black !important;
      }
      
      @media (min-width: 1024px) {
        .user-input {
          min-height: 2.5rem !important;
          font-size: 0.875rem !important;
        }
      }
      
      .send-controls {
        display: flex !important;
        gap: 0.5rem !important;
        align-items: center !important;
      }
      
      .model-select {
        padding: 0.375rem 0.5rem !important;
        border: 1px solid #d1d5db !important;
        border-radius: 0.25rem !important;
        background-color: white !important;
        font-size: 0.75rem !important;
        color: #4b5563 !important;
        font-family: inherit !important;
      }
      
      .send-btn {
        background-color: #2563eb !important;
        color: white !important;
        border: none !important;
        padding: 0.375rem 0.75rem !important;
        border-radius: 0.25rem !important;
        cursor: pointer !important;
        flex: 1 !important;
        font-family: inherit !important;
      }
      
      @media (min-width: 1024px) {
        .send-btn {
          padding: 0.5rem 1rem !important;
        }
      }
      
      .send-btn:hover {
        background-color: #1d4ed8 !important;
      }
      
      /* Collapsed container */
      .agent-collapsed-container {
        position: fixed !important;
        top: 1.25rem !important;
        right: 1.25rem !important;
        width: 3rem !important;
        height: 3rem !important;
        background-color: #2563eb !important;
        border: 2px solid white !important;
        border-radius: 50% !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !important;
        cursor: move !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: white !important;
        font-size: 1.25rem !important;
        transition: background-color 200ms !important;
        font-family: inherit !important;
        user-select: none !important;
        box-sizing: border-box !important;
      }
      
      .agent-collapsed-container:hover {
        background-color: #1d4ed8 !important;
      }
      
      /* Thinking indicator */
      .thinking {
        display: flex !important;
        align-items: center !important;
        gap: 0.5rem !important;
        padding: 0.5rem 0.75rem !important;
        color: #6b7280 !important;
        font-style: italic !important;
        font-family: inherit !important;
      }
      
      .thinking-dots {
        display: inline-flex !important;
        gap: 0.125rem !important;
      }
      
      .thinking-dots span {
        width: 0.25rem !important;
        height: 0.25rem !important;
        background-color: #6b7280 !important;
        border-radius: 50% !important;
        display: block !important;
      }
      
      /* Thinking animation */
      @keyframes thinking {
        0%, 80%, 100% {
          transform: scale(0.8) !important;
          opacity: 0.5 !important;
        }
        40% {
          transform: scale(1) !important;
          opacity: 1 !important;
        }
      }
      
      .thinking-dots span {
        animation: thinking 1.4s ease-in-out infinite both !important;
      }
      
      .thinking-dots span:nth-child(1) { animation-delay: -0.32s !important; }
      .thinking-dots span:nth-child(2) { animation-delay: -0.16s !important; }
      .thinking-dots span:nth-child(3) { animation-delay: 0s !important; }
      
      /* Ensure form elements have proper styling in shadow DOM */
      input, textarea, select, button {
        font-family: inherit !important;
        color: inherit !important;
      }
      
      input:focus, textarea:focus, select:focus {
        outline: 2px solid #2563eb !important;
        outline-offset: 2px !important;
      }
      
      /* Assistant message markdown styling */
      .message.assistant h1,
      .message.assistant h2,
      .message.assistant h3,
      .message.assistant h4,
      .message.assistant h5,
      .message.assistant h6 {
        margin: 8px 0 4px 0 !important;
        font-size: inherit !important;
        font-weight: 600 !important;
        color: #000 !important;
        font-family: inherit !important;
      }
      
      .message.assistant p {
        margin: 4px 0 !important;
        color: #000 !important;
      }
      
      .message.assistant ul,
      .message.assistant ol {
        margin: 4px 0 !important;
        padding-left: 16px !important;
      }
      
      .message.assistant li {
        margin: 2px 0 !important;
        color: #000 !important;
      }
      
      .message.assistant code {
        background: rgba(0,0,0,0.1) !important;
        padding: 1px 3px !important;
        border-radius: 2px !important;
        font-family: 'Monaco', 'Consolas', monospace !important;
        font-size: 12px !important;
      }
      
      .message.assistant pre {
        background: rgba(0,0,0,0.05) !important;
        padding: 8px !important;
        border-radius: 4px !important;
        overflow-x: auto !important;
        margin: 4px 0 !important;
      }
      
      .message.assistant pre code {
        background: none !important;
        padding: 0 !important;
      }
      
      .message.assistant blockquote {
        border-left: 3px solid #ddd !important;
        margin: 4px 0 !important;
        padding-left: 12px !important;
        color: #666 !important;
      }
      
      /* Tool result expand button */
      .expand-tool-result {
        background-color: #2563eb !important;
        color: white !important;
        border: none !important;
        padding: 0.375rem 0.75rem !important;
        border-radius: 0.25rem !important;
        font-size: 0.75rem !important;
        cursor: pointer !important;
        margin-top: 0.5rem !important;
        font-weight: 500 !important;
        display: inline-block !important;
        font-family: inherit !important;
      }
      
      .expand-tool-result:hover {
        background-color: #1d4ed8 !important;
      }
      
      .tool-result-preview,
      .tool-result-full {
        font-family: 'Monaco', 'Consolas', monospace !important;
        font-size: 0.75rem !important;
        white-space: pre-wrap !important;
        word-break: break-word !important;
        color: black !important;
      }
      
      /* Turn duration */
      .turn-duration {
        color: #666 !important;
        font-size: 12px !important;
        text-align: center !important;
        margin: 8px 0 !important;
        font-style: italic !important;
      }
    `;
  }

  show(): void {
    if (this.container) {
      if (this.isCollapsed) {
        this.container.style.display = "flex";
      } else {
        this.container.style.display = "flex";
      }
      this.isVisible = true;
    }
  }

  hide(): void {
    if (this.container) {
      this.container.style.setProperty("display", "none", "important");
      this.isVisible = false;
    }
  }

  toggle(): void {
    if (this.isCollapsed) {
      this.expand();
    } else if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  collapse(): void {
    this.isCollapsed = true;
    this.isVisible = false;
    this.createCollapsedUI();
  }

  expand(): void {
    this.isCollapsed = false;
    this.createUI();
    this.show();
  }

  get eval_results(): any[] {
    return this._eval_results;
  }

  private calculateCost(usage: TokenUsage): number {
    return this.agenticLoop?.calculateCost(usage) || 0;
  }

  private updateTokenUsage(usage: TokenUsage): void {
    this.totalTokenUsage.input_tokens += usage.input_tokens;
    this.totalTokenUsage.output_tokens += usage.output_tokens;
    this.totalTokenUsage.cache_creation_input_tokens +=
      usage.cache_creation_input_tokens || 0;
    this.totalTokenUsage.cache_read_input_tokens +=
      usage.cache_read_input_tokens || 0;
  }

  private formatCost(cost: number): string {
    return this.agenticLoop?.formatCost(cost) || "$0.0000";
  }

  private updateTokenDisplay(): void {
    const tokenDiv = document.getElementById("token-usage");
    const tooltipDiv = document.getElementById("token-tooltip");
    if (!tokenDiv || !tooltipDiv) return;

    const totalCost = this.calculateCost(this.totalTokenUsage);
    const totalTokens =
      this.totalTokenUsage.input_tokens + this.totalTokenUsage.output_tokens;

    if (totalTokens === 0) {
      tokenDiv.childNodes[0].textContent = "";
      tooltipDiv.textContent = "";
      return;
    }

    // Update main display (only the text node, not the tooltip div)
    const textNode = tokenDiv.childNodes[0];
    if (textNode) {
      textNode.textContent = `Tokens: ${totalTokens.toLocaleString()} | Cost: ${this.formatCost(
        totalCost
      )}`;
    } else {
      tokenDiv.insertBefore(
        document.createTextNode(
          `Tokens: ${totalTokens.toLocaleString()} | Cost: ${this.formatCost(
            totalCost
          )}`
        ),
        tooltipDiv
      );
    }

    // Add detailed breakdown in custom tooltip
    const pricing = this.modelPricing[this.selectedModel];
    if (pricing) {
      const breakdown = [
        `Input tokens: ${this.totalTokenUsage.input_tokens.toLocaleString()} × $${
          pricing.input
        }/M = ${this.formatCost(
          (this.totalTokenUsage.input_tokens / 1_000_000) * pricing.input
        )}`,
        `Output tokens: ${this.totalTokenUsage.output_tokens.toLocaleString()} × $${
          pricing.output
        }/M = ${this.formatCost(
          (this.totalTokenUsage.output_tokens / 1_000_000) * pricing.output
        )}`,
      ];

      if (this.totalTokenUsage.cache_creation_input_tokens) {
        breakdown.push(
          `Cache write: ${this.totalTokenUsage.cache_creation_input_tokens.toLocaleString()} × $${
            pricing.cache_write
          }/M = ${this.formatCost(
            (this.totalTokenUsage.cache_creation_input_tokens / 1_000_000) *
              pricing.cache_write
          )}`
        );
      }

      if (this.totalTokenUsage.cache_read_input_tokens) {
        breakdown.push(
          `Cache read: ${this.totalTokenUsage.cache_read_input_tokens.toLocaleString()} × $${
            pricing.cache_read
          }/M = ${this.formatCost(
            (this.totalTokenUsage.cache_read_input_tokens / 1_000_000) *
              pricing.cache_read
          )}`
        );
      }

      tooltipDiv.textContent = breakdown.join("\n");
    }
  }

  private handleUnauthorized(): void {
    // Clear the stored API key
    this.apiKey = "";
    if (!this.hasEmbeddedApiKey) {
      localStorage.removeItem("bookmarklet-agent-api-key");
    }

    // Show the API key input section
    const section = document.querySelector(".api-key-section") as HTMLElement;
    if (section) {
      section.style.display = "block";
    }

    // Clear the API key input field
    const input = document.getElementById("api-key-input") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  private saveApiKey(persistent: boolean = false): void {
    // Look for the input within the agent container, not globally
    const input = this.container?.querySelector(
      "#api-key-input"
    ) as HTMLInputElement;
    if (!input) {
      console.error("API key input not found in agent container");
      return;
    }

    const inputValue = input.value.trim();
    console.log("API key input value:", inputValue ? "***" : "empty");

    if (!inputValue) {
      // Show alert and focus the input field
      alert("Please enter your Anthropic API key first");
      input.focus();
      input.style.borderColor = "#ef4444"; // Red border
      setTimeout(() => {
        input.style.borderColor = ""; // Reset border color after 2 seconds
      }, 2000);
      return;
    }

    this.apiKey = inputValue;

    // Save to localStorage only if persistent is true and not using embedded API key
    if (persistent && !this.hasEmbeddedApiKey) {
      localStorage.setItem("bookmarklet-agent-api-key", this.apiKey);
      console.log("Saved API key to localStorage");
    }

    if (this.apiKey) {
      const section = this.container?.querySelector(
        ".api-key-section"
      ) as HTMLElement;
      if (section) {
        section.style.display = "none";
        console.log("Hidden API key section");
      }
    } else {
      console.log("No API key provided");
    }
  }

  private changeModel(): void {
    const select = document.getElementById("model-select") as HTMLSelectElement;
    this.selectedModel = select.value;
    localStorage.setItem("bookmarklet-agent-model", this.selectedModel);
  }

  private showThinking(): void {
    // Remove any existing thinking indicator first
    this.hideThinking();

    const shadowRoot = this.shadowRoot!;
    const messagesDiv = shadowRoot.getElementById("chat-messages");
    if (!messagesDiv) return;

    const thinkingDiv = document.createElement("div");
    thinkingDiv.id = "thinking-indicator";
    thinkingDiv.className = "thinking";
    thinkingDiv.innerHTML = `
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    
    // Use insertAdjacentElement to ensure it goes at the very end
    messagesDiv.insertAdjacentElement('beforeend', thinkingDiv);
    
    // Ensure it scrolls to show the thinking indicator  
    requestAnimationFrame(() => {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
  }

  private hideThinking(): void {
    const thinkingDiv = document.getElementById("thinking-indicator");
    if (thinkingDiv) {
      thinkingDiv.remove();
    }
  }

  private showTurnDuration(): void {
    if (this.turnStartTime === 0) return;
    
    const duration = (Date.now() - this.turnStartTime) / 1000;
    const shadowRoot = this.shadowRoot!;
    const messagesDiv = shadowRoot.getElementById("chat-messages");
    if (!messagesDiv) return;

    const durationDiv = document.createElement("div");
    durationDiv.className = "turn-duration";
    durationDiv.style.cssText = `
      color: #666;
      font-size: 12px;
      text-align: center;
      margin: 8px 0;
      font-style: italic;
    `;
    durationDiv.textContent = `Turn took ${duration.toFixed(1)}s`;

    messagesDiv.appendChild(durationDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Reset the timer
    this.turnStartTime = 0;
  }

  private async sendMessage(): Promise<void> {
    const input = document.getElementById("user-input") as HTMLTextAreaElement;
    const message = input.value.trim();

    if (!message) return;
    if (!this.apiKey) {
      alert("Please enter your Anthropic API key first");
      return;
    }

    input.value = "";
    this.addMessage("user", message);

    this.turnStartTime = Date.now();
    this.showThinking();

    try {
      // Create or recreate the AgenticLoop with current settings
      this.agenticLoop = this.createAgenticLoop();
      await this.agenticLoop.runLoop(message);
    } catch (error) {
      this.addMessage("assistant", `Error: ${(error as Error).message}`);
    } finally {
      this.hideThinking();
      this.showTurnDuration();
    }
  }

  private createAgenticLoop(): AgenticLoop {
    const pageContext = this.getPageContext();
    
    const tools: Tool[] = [
      {
        name: "eval_js",
        description:
          "Execute JavaScript code on the current webpage. Use this to interact with page elements, click buttons, fill forms, read content, etc. The code runs in the page context and can access all DOM elements and global variables. If results are large, they'll be truncated but saved to a variable for future inspection. IMPORTANT: Never use 'return' statements - use expressions instead (e.g., 'document.title' not 'return document.title').",
        input_schema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description:
                "JavaScript code to execute on the page. Must be an expression or statement, not contain 'return' statements outside functions.",
            },
          },
          required: ["code"],
        },
        preExecutionDisplay: (input) => {
          const code = input.code;
          const lines = code.split('\n');
          const preview = lines.length > 3 
            ? `${lines.slice(0, 3).join('\n')}...`
            : code;
          
          return `⚡ **Evaluating JavaScript:**\n\`\`\`javascript\n${preview}\n\`\`\``;
        },
        displayFormatter: (input, result) => {
          if (result.is_error) {
            return `❌ **JavaScript Error:**\n${result.content}`;
          }
          
          const resultPreview = result.content.length > 200 
            ? result.content.substring(0, 200) + '...'
            : result.content;
          return `✅ **Result:**\n${resultPreview}`;
        },
        handler: async (input: any) => {
          const code = input.code;
          const result = eval(code);
          const resultString = String(result || "Code executed successfully");

          // Check if result is longer than 10KB
          const maxLength = 10 * 1024; // 10KB
          if (resultString.length > maxLength) {
            // Store the full result in the array
            const resultIndex = this._eval_results.length;
            this._eval_results.push(result);

            const truncated = resultString.substring(0, maxLength);
            return `${truncated}...\n\n[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${resultIndex}]]`;
          }

          return resultString;
        },
      },
    ];

    const systemPrompt = `You are a helpful web agent that can analyze and interact with web pages using tools.
    
Current page context:
- URL: ${pageContext.url}
- Title: ${pageContext.title}
- Selected text: ${pageContext.selectedText || "None"}
- Main headings: ${pageContext.headings.join(", ")}

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

    return new AgenticLoop({
      apiKey: this.apiKey,
      selectedModel: this.selectedModel,
      systemPrompt,
      tools,
      onTokenUsage: (usage) => {
        this.updateTokenUsage(usage);
        this.updateTokenDisplay();
        const cost = this.calculateCost(usage);
        console.log(
          `Request cost: ${this.formatCost(cost)}, Total cost: ${this.formatCost(
            this.calculateCost(this.totalTokenUsage)
          )}`
        );
      },
      onMessage: (role, content) => {
        if (content.trim()) {
          this.addMessage(role, content);
        }
      },
      onPreToolCall: (toolCall) => {
        // Find the tool definition to use its pre-execution display if available
        const tool = tools.find(t => t.name === toolCall.name);
        if (tool?.preExecutionDisplay) {
          const display = tool.preExecutionDisplay(toolCall.input);
          this.addMessage('assistant', display, true);
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
          const toolCallDisplay = `🔧 **${
            toolCall.name
          }**\n\`\`\`\n${JSON.stringify(toolCall.input, null, 2)}\n\`\`\``;
          const resultDisplay = result.is_error
            ? `❌ **Error:**\n${result.content}`
            : `✅ **Result:**\n${result.content}`;
          display = `${toolCallDisplay}\n\n${resultDisplay}`;
        }

        this.addMessage("assistant", display, true);
      },
    });
  }



  private addMessage(
    role: "user" | "assistant",
    content: string,
    isToolResult: boolean = false
  ): void {
    const messagesDiv = document.getElementById("chat-messages");
    if (!messagesDiv) return;

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;
    
    if (role === "user") {
      messageDiv.classList.add("message-user");
    } else {
      messageDiv.classList.add("message-assistant");
    }

    if (isToolResult) {
      // Create collapsible tool result
      const lines = content.split("\n");
      const preview = lines.slice(0, 2).join("\n");
      const hasMore = lines.length > 2;

      messageDiv.innerHTML = `
        <div class="tool-result-preview itsy:font-mono itsy:text-xs itsy:whitespace-pre-wrap itsy:break-words itsy:text-black">${this.escapeHtml(
          preview
        )}</div>
        ${
          hasMore
            ? `
          <div class="tool-result-full itsy:font-mono itsy:text-xs itsy:whitespace-pre-wrap itsy:break-words itsy:text-black" style="display: none;">${this.escapeHtml(
            content
          )}</div>
          <button class="expand-tool-result itsy:bg-blue-600 hover:itsy:bg-blue-700 itsy:text-white itsy:border-none itsy:py-1.5 itsy:px-3 itsy:rounded itsy:text-xs itsy:cursor-pointer itsy:mt-2 itsy:font-medium itsy:inline-block itsy:font-sans" onclick="this.parentElement.querySelector('.tool-result-preview').style.display='none'; this.parentElement.querySelector('.tool-result-full').style.display='block'; this.style.display='none';">📋 Show Full Result</button>
        `
            : ""
        }
      `;
    } else if (role === "assistant") {
      // Render markdown for assistant messages
      const renderedContent = this.renderMarkdown(content);
      messageDiv.innerHTML = renderedContent;
    } else {
      messageDiv.textContent = content;
    }

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Note: conversation is now managed by AgenticLoop
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  private getPageContext(): PageContext {
    return {
      url: window.location.href,
      title: document.title,
      selectedText: window.getSelection()?.toString() || "",
      forms: Array.from(document.forms).map((form) => ({
        action: form.action,
        method: form.method,
        elements: Array.from(form.elements).map((el) => {
          const element = el as HTMLInputElement;
          return {
            name: element.name,
            type: element.type,
            value: element.value,
          };
        }),
      })),
      headings: Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((h) => h.textContent?.trim() || "")
        .slice(0, 10),
      links: Array.from(document.querySelectorAll("a[href]"))
        .map((a) => ({
          text: a.textContent?.trim() || "",
          href: (a as HTMLAnchorElement).href,
        }))
        .slice(0, 20),
    };
  }




}

// Register the custom element
customElements.define('bookmarklet-agent', BookmarkletAgent);

// Global instance
declare global {
  interface Window {
    bookmarkletAgent: BookmarkletAgent;
    BOOKMARKLET_API_KEY?: string;
  }
}

console.log('Creating global bookmarkletAgent instance...');
const agentElement = new BookmarkletAgent(window.BOOKMARKLET_API_KEY);
document.body.appendChild(agentElement);
window.bookmarkletAgent = agentElement;
console.log('Global bookmarkletAgent instance created and added to DOM:', window.bookmarkletAgent);

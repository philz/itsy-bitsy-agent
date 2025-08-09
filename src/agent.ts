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

  private async createShadowStyles(): Promise<void> {
    const shadowRoot = this.shadowRoot!;
    
    // Create style element for our CSS
    const styleElement = document.createElement('style');
    
    try {
      // Load the external CSS with proper error handling and retry
      const cssUrl = 'https://philz-bookmarklet.fly.dev/styles.css?t=' + Date.now();
      const response = await fetch(cssUrl, {
        method: 'GET',
        mode: 'cors', // Explicitly request CORS
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const css = await response.text();
      
      if (!css || css.length < 100) {
        throw new Error('CSS content appears to be empty or invalid');
      }
      
      // Add the external CSS plus our custom styles
      styleElement.textContent = css + this.getCustomStyles();
      console.log('External CSS loaded successfully into shadow DOM');
    } catch (error) {
      console.warn('Failed to load external CSS, using comprehensive fallback styles:', error);
      // Use comprehensive fallback styles if external CSS fails
      styleElement.textContent = this.getComprehensiveFallbackStyles() + this.getCustomStyles();
      console.log('Using comprehensive fallback styles in shadow DOM');
    }
    
    shadowRoot.appendChild(styleElement);
  }

  async init(): Promise<void> {
    console.log('BookmarkletAgent init() called, isCollapsed:', this.isCollapsed);
    try {
      // Wait for shadow styles to be created
      await this.createShadowStyles();
      
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
    // Mobile-first approach: full width on mobile, fixed width on desktop
    this.container.className =
      "itsy:fixed itsy:top-2.5 itsy:right-2.5 itsy:left-2.5 itsy:w-auto itsy:max-h-[calc(100vh-20px)] itsy:bg-white itsy:border itsy:border-gray-300 itsy:rounded-lg itsy:shadow-xl itsy:font-sans itsy:text-sm itsy:leading-normal itsy:text-black itsy:flex itsy:flex-col itsy:resize-none itsy:overflow-hidden itsy:m-0 itsy:p-0 itsy:box-border itsy:lg:top-5 itsy:lg:right-5 itsy:lg:left-auto itsy:lg:w-96 itsy:lg:max-w-96 itsy:lg:min-w-72 itsy:lg:max-h-[600px] itsy:lg:resize";
    this.container.style.cssText =
      "z-index: 2147483647 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;";

    this.container.innerHTML = `
      <div class="agent-header itsy:bg-gray-50 itsy:p-2.5 itsy:px-3 itsy:border-b itsy:border-gray-200 itsy:rounded-t-lg itsy:flex itsy:justify-between itsy:items-center itsy:gap-2 itsy:cursor-move itsy:select-none itsy:font-sans itsy:box-border itsy:lg:p-3">
        <h3 class="itsy:m-0 itsy:text-sm itsy:font-semibold itsy:text-gray-900 itsy:font-sans itsy:leading-normal itsy:p-0 itsy:lg:text-base">Itsy Bitsy Agent</h3>
        <div class="token-usage itsy:flex-1 itsy:text-center itsy:text-xs itsy:text-gray-600 itsy:whitespace-nowrap itsy:overflow-hidden itsy:text-ellipsis itsy:cursor-help itsy:relative itsy:font-sans" id="token-usage" style="font-size: 10px; pointer-events: auto;">
          <div class="token-tooltip itsy:fixed itsy:bg-gray-800 itsy:text-white itsy:py-2 itsy:px-3 itsy:rounded itsy:text-xs itsy:whitespace-pre-line itsy:pointer-events-none itsy:opacity-0 itsy:transition-opacity itsy:duration-200 itsy:max-w-72 itsy:shadow-lg itsy:font-sans itsy:leading-tight" id="token-tooltip" style="z-index: 2147483648 !important;"></div>
        </div>
        <button class="collapse-btn itsy:bg-transparent itsy:border-none itsy:cursor-pointer itsy:p-0 itsy:w-6 itsy:h-6 itsy:flex itsy:items-center itsy:justify-center itsy:text-gray-600 hover:itsy:text-gray-900 itsy:font-sans itsy:m-0 itsy:text-base" data-action="collapse" title="Collapse to spider">⚊</button>
        <button class="close-btn itsy:bg-transparent itsy:border-none itsy:text-xl itsy:cursor-pointer itsy:p-0 itsy:w-6 itsy:h-6 itsy:flex itsy:items-center itsy:justify-center itsy:text-gray-900 itsy:font-sans itsy:m-0" data-action="close">×</button>
      </div>
      <div class="agent-body itsy:p-2.5 itsy:flex itsy:flex-col itsy:flex-1 itsy:overflow-hidden itsy:box-border itsy:min-h-0 itsy:h-full itsy:max-h-[calc(100vh-60px)] itsy:lg:p-3 itsy:lg:max-h-none">
        <div class="api-key-section itsy:mb-3 itsy:p-2.5 itsy:bg-gray-50 itsy:rounded itsy:box-border" ${
          this.apiKey ? 'style="display: none;"' : ""
        }>
          <label class="itsy:block itsy:mb-2 itsy:font-medium itsy:text-gray-900 itsy:font-sans">Anthropic API Key:</label>
          <input type="text" id="api-key-input" placeholder="sk-..." value="${
            this.apiKey
          }" class="itsy:w-full itsy:p-2 itsy:border itsy:border-gray-300 itsy:rounded itsy:mb-2 itsy:text-sm itsy:box-border itsy:font-sans itsy:bg-white itsy:text-black">
          <div class="save-options itsy:flex itsy:gap-2 itsy:mt-2">
            <button data-action="save-session" class="itsy:bg-blue-600 hover:itsy:bg-blue-700 itsy:text-white itsy:border-none itsy:p-2 itsy:px-3 itsy:rounded itsy:cursor-pointer itsy:text-xs itsy:flex-1 itsy:font-sans">Use for session</button>
            <button data-action="save-persistent" class="itsy:bg-blue-600 hover:itsy:bg-blue-700 itsy:text-white itsy:border-none itsy:p-2 itsy:px-3 itsy:rounded itsy:cursor-pointer itsy:text-xs itsy:flex-1 itsy:font-sans">Save for this website</button>
          </div>
        </div>
        <div class="chat-section itsy:flex itsy:flex-col itsy:flex-1 itsy:overflow-hidden itsy:min-h-0 itsy:h-full">
          <div id="chat-messages" class="itsy:flex-1 itsy:overflow-y-auto itsy:overflow-x-hidden itsy:mb-3 itsy:pr-2 itsy:min-h-24 itsy:max-h-full itsy:flex itsy:flex-col itsy:gap-2 itsy:scrollbar-thin"></div>
          <div class="input-section itsy:flex itsy:flex-col itsy:gap-2">
            <textarea id="user-input" placeholder="What would you like me to do on this page?" class="itsy:p-2 itsy:border itsy:border-gray-300 itsy:rounded itsy:resize-y itsy:min-h-9 itsy:max-h-30 itsy:text-xs itsy:font-sans itsy:box-border itsy:bg-white itsy:text-black itsy:lg:min-h-10 itsy:lg:text-sm"></textarea>
            <div class="send-controls itsy:flex itsy:gap-2 itsy:items-center">
              <select id="model-select" data-action="change-model" class="itsy:p-1.5 itsy:px-2 itsy:border itsy:border-gray-300 itsy:rounded itsy:bg-white itsy:text-xs itsy:text-gray-600 itsy:font-sans">
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
              <button data-action="send" class="itsy:bg-blue-600 hover:itsy:bg-blue-700 itsy:text-white itsy:border-none itsy:py-1.5 itsy:px-3 itsy:rounded itsy:cursor-pointer itsy:flex-1 itsy:font-sans itsy:lg:p-2 itsy:lg:px-4">Send</button>
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
    this.container.className =
      "itsy:fixed itsy:top-5 itsy:right-5 itsy:w-12 itsy:h-12 itsy:bg-blue-600 hover:itsy:bg-blue-700 itsy:border-2 itsy:border-white itsy:rounded-full itsy:shadow-lg itsy:cursor-move itsy:flex itsy:items-center itsy:justify-center itsy:text-white itsy:text-xl itsy:transition-colors itsy:duration-200 itsy:font-sans itsy:select-none itsy:box-border";
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

  private getCustomStyles(): string {
    return `
      /* Custom styles that can't be expressed in Tailwind classes */
      
      /* Custom webkit scrollbar styles */
      #bookmarklet-agent #chat-messages::-webkit-scrollbar {
        width: 6px !important;
      }
      
      #bookmarklet-agent #chat-messages::-webkit-scrollbar-track {
        background: #f1f1f1 !important;
        border-radius: 3px !important;
      }
      
      #bookmarklet-agent #chat-messages::-webkit-scrollbar-thumb {
        background: #ccc !important;
        border-radius: 3px !important;
      }
      
      #bookmarklet-agent #chat-messages::-webkit-scrollbar-thumb:hover {
        background: #999 !important;
      }
      
      /* Token tooltip positioning handled by JavaScript */
      #bookmarklet-agent .token-tooltip.show {
        opacity: 1 !important;
      }
      
      /* Ensure form elements have proper styling in shadow DOM */
      #bookmarklet-agent input, 
      #bookmarklet-agent textarea,
      #bookmarklet-agent select,
      #bookmarklet-agent button {
        font-family: inherit !important;
        color: inherit !important;
      }
      
      #bookmarklet-agent input:focus,
      #bookmarklet-agent textarea:focus,
      #bookmarklet-agent select:focus {
        outline: 2px solid rgb(37 99 235) !important;
        outline-offset: 2px !important;
      }
    `;
  }
  
  private getComprehensiveFallbackStyles(): string {
    return `
      /* Comprehensive fallback styles when external CSS fails to load */
      
      /* Reset and base styles */
      * { box-sizing: border-box; }
      
      /* Layout utilities */
      .itsy\\:fixed { position: fixed !important; }
      .itsy\\:relative { position: relative !important; }
      .itsy\\:top-2\\.5 { top: 0.625rem !important; }
      .itsy\\:top-5 { top: 1.25rem !important; }
      .itsy\\:right-2\\.5 { right: 0.625rem !important; }
      .itsy\\:right-5 { right: 1.25rem !important; }
      .itsy\\:left-2\\.5 { left: 0.625rem !important; }
      .itsy\\:left-auto { left: auto !important; }
      
      /* Display utilities */
      .itsy\\:block { display: block !important; }
      .itsy\\:flex { display: flex !important; }
      .itsy\\:inline-block { display: inline-block !important; }
      .itsy\\:inline-flex { display: inline-flex !important; }
      
      /* Flexbox utilities */
      .itsy\\:flex-col { flex-direction: column !important; }
      .itsy\\:flex-1 { flex: 1 !important; }
      .itsy\\:flex-shrink-0 { flex-shrink: 0 !important; }
      .itsy\\:items-center { align-items: center !important; }
      .itsy\\:justify-between { justify-content: space-between !important; }
      .itsy\\:justify-center { justify-content: center !important; }
      
      /* Spacing utilities */
      .itsy\\:gap-0\\.5 { gap: 0.125rem !important; }
      .itsy\\:gap-2 { gap: 0.5rem !important; }
      .itsy\\:m-0 { margin: 0px !important; }
      .itsy\\:mb-2 { margin-bottom: 0.5rem !important; }
      .itsy\\:mb-3 { margin-bottom: 0.75rem !important; }
      .itsy\\:mt-2 { margin-top: 0.5rem !important; }
      .itsy\\:p-0 { padding: 0px !important; }
      .itsy\\:p-1\\.5 { padding: 0.375rem !important; }
      .itsy\\:p-2 { padding: 0.5rem !important; }
      .itsy\\:p-2\\.5 { padding: 0.625rem !important; }
      .itsy\\:p-3 { padding: 0.75rem !important; }
      .itsy\\:px-2 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
      .itsy\\:px-3 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
      .itsy\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
      .itsy\\:py-1 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
      .itsy\\:py-1\\.5 { padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; }
      .itsy\\:py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
      .itsy\\:py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
      .itsy\\:pr-2 { padding-right: 0.5rem !important; }
      
      /* Sizing utilities */
      .itsy\\:w-1 { width: 0.25rem !important; }
      .itsy\\:w-6 { width: 1.5rem !important; }
      .itsy\\:w-12 { width: 3rem !important; }
      .itsy\\:w-auto { width: auto !important; }
      .itsy\\:w-full { width: 100% !important; }
      .itsy\\:h-1 { height: 0.25rem !important; }
      .itsy\\:h-6 { height: 1.5rem !important; }
      .itsy\\:h-12 { height: 3rem !important; }
      .itsy\\:h-full { height: 100% !important; }
      .itsy\\:max-h-30 { max-height: 7.5rem !important; }
      .itsy\\:max-h-\\[calc\\(100vh-20px\\)\\] { max-height: calc(100vh - 20px) !important; }
      .itsy\\:max-h-\\[calc\\(100vh-60px\\)\\] { max-height: calc(100vh - 60px) !important; }
      .itsy\\:max-h-full { max-height: 100% !important; }
      .itsy\\:min-h-0 { min-height: 0px !important; }
      .itsy\\:min-h-9 { min-height: 2.25rem !important; }
      .itsy\\:min-h-24 { min-height: 6rem !important; }
      .itsy\\:max-w-72 { max-width: 18rem !important; }
      
      /* Colors */
      .itsy\\:bg-white { background-color: rgb(255 255 255) !important; }
      .itsy\\:bg-gray-50 { background-color: rgb(249 250 251) !important; }
      .itsy\\:bg-gray-800 { background-color: rgb(31 41 55) !important; }
      .itsy\\:bg-blue-50 { background-color: rgb(239 246 255) !important; }
      .itsy\\:bg-blue-600 { background-color: rgb(37 99 235) !important; }
      .itsy\\:bg-blue-700 { background-color: rgb(29 78 216) !important; }
      .itsy\\:bg-transparent { background-color: transparent !important; }
      .itsy\\:text-black { color: rgb(0 0 0) !important; }
      .itsy\\:text-white { color: rgb(255 255 255) !important; }
      .itsy\\:text-gray-600 { color: rgb(75 85 99) !important; }
      .itsy\\:text-gray-900 { color: rgb(17 24 39) !important; }
      
      /* Borders */
      .itsy\\:border { border-width: 1px !important; border-style: solid !important; }
      .itsy\\:border-2 { border-width: 2px !important; border-style: solid !important; }
      .itsy\\:border-none { border: none !important; }
      .itsy\\:border-b { border-bottom-width: 1px !important; border-bottom-style: solid !important; }
      .itsy\\:border-gray-200 { border-color: rgb(229 231 235) !important; }
      .itsy\\:border-gray-300 { border-color: rgb(209 213 219) !important; }
      .itsy\\:border-white { border-color: rgb(255 255 255) !important; }
      
      /* Border radius */
      .itsy\\:rounded { border-radius: 0.25rem !important; }
      .itsy\\:rounded-lg { border-radius: 0.5rem !important; }
      .itsy\\:rounded-full { border-radius: 9999px !important; }
      .itsy\\:rounded-t-lg { border-top-left-radius: 0.5rem !important; border-top-right-radius: 0.5rem !important; }
      
      /* Typography */
      .itsy\\:font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important; }
      .itsy\\:font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important; }
      .itsy\\:text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
      .itsy\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
      .itsy\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
      .itsy\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
      .itsy\\:leading-normal { line-height: 1.5 !important; }
      .itsy\\:leading-snug { line-height: 1.375 !important; }
      .itsy\\:leading-tight { line-height: 1.25 !important; }
      .itsy\\:font-medium { font-weight: 500 !important; }
      .itsy\\:font-semibold { font-weight: 600 !important; }
      .itsy\\:text-center { text-align: center !important; }
      .itsy\\:whitespace-nowrap { white-space: nowrap !important; }
      .itsy\\:whitespace-pre-line { white-space: pre-line !important; }
      .itsy\\:whitespace-pre-wrap { white-space: pre-wrap !important; }
      .itsy\\:break-words { overflow-wrap: break-word !important; }
      .itsy\\:text-ellipsis { text-overflow: ellipsis !important; }
      .itsy\\:italic { font-style: italic !important; }
      
      /* Layout and overflow */
      .itsy\\:box-border { box-sizing: border-box !important; }
      .itsy\\:resize-none { resize: none !important; }
      .itsy\\:resize-y { resize: vertical !important; }
      .itsy\\:overflow-hidden { overflow: hidden !important; }
      .itsy\\:overflow-x-hidden { overflow-x: hidden !important; }
      .itsy\\:overflow-y-auto { overflow-y: auto !important; }
      
      /* Cursor and interaction */
      .itsy\\:cursor-pointer { cursor: pointer !important; }
      .itsy\\:cursor-move { cursor: move !important; }
      .itsy\\:cursor-help { cursor: help !important; }
      .itsy\\:select-none { user-select: none !important; }
      
      /* Shadows and effects */
      .itsy\\:shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important; }
      .itsy\\:shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important; }
      .itsy\\:opacity-0 { opacity: 0 !important; }
      
      /* Transitions */
      .itsy\\:transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke !important; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important; transition-duration: 150ms !important; }
      .itsy\\:transition-opacity { transition-property: opacity !important; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important; transition-duration: 150ms !important; }
      .itsy\\:duration-200 { transition-duration: 200ms !important; }
      
      /* Hover effects */
      .itsy\\:bg-blue-600:hover, .hover\\:itsy\\:bg-blue-700:hover { background-color: rgb(29 78 216) !important; }
      .itsy\\:text-gray-600:hover, .hover\\:itsy\\:text-gray-900:hover { color: rgb(17 24 39) !important; }
      
      /* Responsive utilities for large screens */
      @media (min-width: 1024px) {
        .itsy\\:lg\\:top-5 { top: 1.25rem !important; }
        .itsy\\:lg\\:right-5 { right: 1.25rem !important; }
        .itsy\\:lg\\:left-auto { left: auto !important; }
        .itsy\\:lg\\:w-96 { width: 24rem !important; }
        .itsy\\:lg\\:max-w-96 { max-width: 24rem !important; }
        .itsy\\:lg\\:min-w-72 { min-width: 18rem !important; }
        .itsy\\:lg\\:max-h-\\[600px\\] { max-height: 600px !important; }
        .itsy\\:lg\\:max-h-none { max-height: none !important; }
        .itsy\\:lg\\:min-h-10 { min-height: 2.5rem !important; }
        .itsy\\:lg\\:resize { resize: both !important; }
        .itsy\\:lg\\:p-2 { padding: 0.5rem !important; }
        .itsy\\:lg\\:p-3 { padding: 0.75rem !important; }
        .itsy\\:lg\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
        .itsy\\:lg\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
        .itsy\\:lg\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
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
    thinkingDiv.className =
      "thinking itsy:flex itsy:items-center itsy:gap-2 itsy:py-2 itsy:px-3 itsy:text-gray-500 itsy:italic itsy:font-sans";
    thinkingDiv.innerHTML = `
      <div class="thinking-dots itsy:inline-flex itsy:gap-0.5">
        <span class="itsy:w-1 itsy:h-1 itsy:bg-gray-500 itsy:rounded-full itsy:block"></span>
        <span class="itsy:w-1 itsy:h-1 itsy:bg-gray-500 itsy:rounded-full itsy:block"></span>
        <span class="itsy:w-1 itsy:h-1 itsy:bg-gray-500 itsy:rounded-full itsy:block"></span>
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
    messageDiv.className = `message ${role} itsy:mb-0 itsy:py-1 itsy:px-2 itsy:rounded-md itsy:max-w-[90%] itsy:text-xs itsy:leading-snug itsy:box-border itsy:font-sans itsy:flex-shrink-0 lg:itsy:py-1.5 lg:itsy:px-2.5 lg:itsy:text-sm`;

    if (role === "user") {
      messageDiv.classList.add(
        "itsy:bg-blue-600",
        "itsy:text-white",
        "itsy:ml-auto"
      );
    } else {
      messageDiv.classList.add(
        "itsy:bg-gray-50",
        "itsy:border",
        "itsy:border-gray-200",
        "itsy:text-black"
      );
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

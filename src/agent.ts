import { marked } from "marked";
import DOMPurify from "dompurify";

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
  input: number; // per million tokens
  output: number; // per million tokens
  cache_write: number; // per million tokens
  cache_read: number; // per million tokens
}

class BookmarkletAgent {
  private isVisible = false;
  private apiKey: string;
  private selectedModel: string;
  private conversation: Message[] = [];
  private container: HTMLElement | null = null;
  private hasEmbeddedApiKey = false;
  private _eval_results: any[] = [];
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

  constructor(embeddedApiKey?: string) {
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
      console.warn("Markdown rendering failed:", error);
      // Fallback to plain text
      return content.replace(/\n/g, "<br>");
    }
  }

  private createUI(): void {
    if (this.container) return;

    this.container = document.createElement("div");
    this.container.id = "bookmarklet-agent";
    // Mobile-first approach: start with mobile styles, then override for larger screens
    this.container.className = "itsy:fixed itsy:top-2.5 itsy:right-2.5 itsy:left-2.5 itsy:w-auto itsy:max-w-none itsy:min-w-full itsy:max-h-[calc(100vh-20px)] itsy:bg-white itsy:border itsy:border-gray-300 itsy:rounded-lg itsy:shadow-xl itsy:font-sans itsy:text-sm itsy:leading-normal itsy:text-black itsy:flex itsy:flex-col itsy:resize-none itsy:overflow-hidden itsy:m-0 itsy:p-0 itsy:box-border lg:itsy:top-5 lg:itsy:right-5 lg:itsy:left-auto lg:itsy:w-96 lg:itsy:max-w-96 lg:itsy:min-w-72 lg:itsy:max-h-[600px] lg:itsy:resize";
    this.container.style.cssText = "z-index: 2147483647 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;";
    
    this.container.innerHTML = `
      <div class="agent-header itsy:bg-gray-50 itsy:p-2.5 itsy:px-3 itsy:border-b itsy:border-gray-200 itsy:rounded-t-lg itsy:flex itsy:justify-between itsy:items-center itsy:gap-2 itsy:cursor-move itsy:select-none itsy:font-sans itsy:box-border lg:itsy:p-3">
        <h3 class="itsy:m-0 itsy:text-sm itsy:font-semibold itsy:text-gray-900 itsy:font-sans itsy:leading-normal itsy:p-0 lg:itsy:text-base">Itsy Bitsy Agent</h3>
        <div class="token-usage itsy:flex-1 itsy:text-center itsy:text-xs itsy:text-gray-600 itsy:whitespace-nowrap itsy:overflow-hidden itsy:text-ellipsis itsy:cursor-help itsy:relative itsy:font-sans" id="token-usage" style="font-size: 10px; pointer-events: auto;">
          <div class="token-tooltip itsy:fixed itsy:bg-gray-800 itsy:text-white itsy:py-2 itsy:px-3 itsy:rounded itsy:text-xs itsy:whitespace-pre-line itsy:pointer-events-none itsy:opacity-0 itsy:transition-opacity itsy:duration-200 itsy:max-w-72 itsy:shadow-lg itsy:font-sans itsy:leading-tight" id="token-tooltip" style="z-index: 2147483648 !important;"></div>
        </div>
        <button class="close-btn itsy:bg-transparent itsy:border-none itsy:text-xl itsy:cursor-pointer itsy:p-0 itsy:w-6 itsy:h-6 itsy:flex itsy:items-center itsy:justify-center itsy:text-gray-900 itsy:font-sans itsy:m-0" data-action="close">×</button>
      </div>
      <div class="agent-body itsy:p-2.5 itsy:flex itsy:flex-col itsy:flex-1 itsy:overflow-hidden itsy:box-border itsy:min-h-0 itsy:h-full itsy:max-h-[calc(100vh-60px)] lg:itsy:p-3 lg:itsy:max-h-none">
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
            <textarea id="user-input" placeholder="What would you like me to do on this page?" class="itsy:p-2 itsy:border itsy:border-gray-300 itsy:rounded itsy:resize-y itsy:min-h-9 itsy:max-h-30 itsy:text-xs itsy:font-sans itsy:box-border itsy:bg-white itsy:text-black lg:itsy:min-h-10 lg:itsy:text-sm"></textarea>
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
              <button data-action="send" class="itsy:bg-blue-600 hover:itsy:bg-blue-700 itsy:text-white itsy:border-none itsy:py-1.5 itsy:px-3 itsy:rounded itsy:cursor-pointer itsy:flex-1 itsy:font-sans lg:itsy:p-2 lg:itsy:px-4">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.addEventListeners();
    this.addTokenUsageHover();
    this.addResizeObserver();
    document.body.appendChild(this.container);
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

    // Add drag functionality
    this.addDragFunctionality();
  }

  private addDragFunctionality(): void {
    if (!this.container) return;

    const header = this.container.querySelector(".agent-header") as HTMLElement;
    if (!header) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      // Don't drag if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.classList.contains("token-usage") ||
        target.closest(".token-usage") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select")
      ) {
        return;
      }

      // On mobile, prevent dragging to maintain full-width layout
      if (window.innerWidth <= 768) {
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

      // On mobile, prevent dragging to maintain full-width layout
      if (window.innerWidth <= 768) {
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
    header.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    // Touch events
    header.addEventListener(
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



  private addStyles(): void {
    if (document.getElementById("bookmarklet-agent-styles")) return;

    const styles = document.createElement("style");
    styles.id = "bookmarklet-agent-styles";
    styles.textContent = `
      /* CSS isolation for bookmarklet - only styles that can't be represented with Tailwind */
      
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
    `;
    document.head.appendChild(styles);
  }

  show(): void {
    if (this.container) {
      this.container.style.display = "flex";
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
    const cacheWriteCost =
      ((usage.cache_creation_input_tokens || 0) / 1_000_000) *
      pricing.cache_write;
    const cacheReadCost =
      ((usage.cache_read_input_tokens || 0) / 1_000_000) * pricing.cache_read;

    return inputCost + outputCost + cacheWriteCost + cacheReadCost;
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
    if (cost < 0.01) {
      return `${(cost * 100).toFixed(2)}¢`;
    }
    return `$${cost.toFixed(4)}`;
  }

  private updateTokenDisplay(): void {
    const tokenDiv = document.getElementById("token-usage");
    const tooltipDiv = document.getElementById("token-tooltip");
    if (!tokenDiv || !tooltipDiv) return;

    const totalCost = this.calculateCost(
      this.totalTokenUsage,
      this.selectedModel
    );
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

    const messagesDiv = document.getElementById("chat-messages");
    if (!messagesDiv) return;

    const thinkingDiv = document.createElement("div");
    thinkingDiv.id = "thinking-indicator";
    thinkingDiv.className = "thinking itsy:flex itsy:items-center itsy:gap-2 itsy:py-2 itsy:px-3 itsy:text-gray-500 itsy:italic itsy:font-sans";
    thinkingDiv.innerHTML = `
      <div class="thinking-dots itsy:inline-flex itsy:gap-0.5">
        <span class="itsy:w-1 itsy:h-1 itsy:bg-gray-500 itsy:rounded-full itsy:block"></span>
        <span class="itsy:w-1 itsy:h-1 itsy:bg-gray-500 itsy:rounded-full itsy:block"></span>
        <span class="itsy:w-1 itsy:h-1 itsy:bg-gray-500 itsy:rounded-full itsy:block"></span>
      </div>
    `;
    messagesDiv.appendChild(thinkingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  private hideThinking(): void {
    const thinkingDiv = document.getElementById("thinking-indicator");
    if (thinkingDiv) {
      thinkingDiv.remove();
    }
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

    this.showThinking();

    try {
      await this.runAgentLoop(message);
    } catch (error) {
      this.addMessage("assistant", `Error: ${(error as Error).message}`);
    } finally {
      this.hideThinking();
    }
  }

  private async runAgentLoop(initialMessage: string): Promise<void> {
    const pageContext = this.getPageContext();

    // Build conversation messages in Anthropic format
    const messages: any[] = [
      ...this.conversation.filter((msg) => msg.role !== "system"),
      { role: "user", content: initialMessage },
    ];

    // Agent loop: keep going until no more tool calls
    while (true) {
      const response = await this.callAnthropicAPIWithMessages(
        messages,
        pageContext
      );

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
        this.addMessage("assistant", assistantMessage);
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
          type: "tool_result",
          tool_use_id: result.tool_use_id,
          content: result.content,
          is_error: result.is_error,
        });

        // Combine tool call and result into one message
        const toolCallDisplay = `🔧 **${
          toolCall.name
        }**\n\`\`\`\n${JSON.stringify(toolCall.input, null, 2)}\n\`\`\``;
        const resultDisplay = result.is_error
          ? `❌ **Error:**\n${result.content}`
          : `✅ **Result:**\n${result.content}`;
        const combinedMessage = `${toolCallDisplay}\n\n${resultDisplay}`;

        this.addMessage("assistant", combinedMessage, true);
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
      messageDiv.classList.add("itsy:bg-blue-600", "itsy:text-white", "itsy:ml-auto");
    } else {
      messageDiv.classList.add("itsy:bg-gray-50", "itsy:border", "itsy:border-gray-200", "itsy:text-black");
    }

    if (isToolResult) {
      // Create collapsible tool result
      const lines = content.split("\n");
      const preview = lines.slice(0, 2).join("\n");
      const hasMore = lines.length > 2;

      messageDiv.innerHTML = `
        <div class="tool-result-preview itsy:font-mono itsy:text-xs itsy:whitespace-pre-wrap itsy:break-words itsy:text-black">${this.escapeHtml(preview)}</div>
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

    this.conversation.push({ role, content });
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

  private async callAnthropicAPIWithMessages(
    messages: any[],
    pageContext: PageContext
  ): Promise<any> {
    const tools = [
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
              text: systemPrompt,
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
          // Clear stored API key and show input section
          this.handleUnauthorized();
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
        this.updateTokenDisplay();
        const cost = this.calculateCost(data.usage, this.selectedModel);
        console.log(
          `Request cost: ${this.formatCost(
            cost
          )}, Total cost: ${this.formatCost(
            this.calculateCost(this.totalTokenUsage, this.selectedModel)
          )}`
        );
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
      switch (toolCall.name) {
        case "eval_js":
          const code = toolCall.input.code;
          const result = eval(code);
          const resultString = String(result || "Code executed successfully");

          // Check if result is longer than 10KB
          const maxLength = 10 * 1024; // 10KB
          if (resultString.length > maxLength) {
            // Store the full result in the array
            const resultIndex = this._eval_results.length;
            this._eval_results.push(result);

            const truncated = resultString.substring(0, maxLength);
            return {
              tool_use_id: toolCall.id,
              content: `${truncated}...\n\n[Result truncated - ${resultString.length} characters total. Full result saved as window.bookmarkletAgent.eval_results[${resultIndex}]]`,
            };
          }

          return {
            tool_use_id: toolCall.id,
            content: resultString,
          };

        default:
          return {
            tool_use_id: toolCall.id,
            content: `Unknown tool: ${toolCall.name}`,
            is_error: true,
          };
      }
    } catch (error) {
      return {
        tool_use_id: toolCall.id,
        content: `Error: ${(error as Error).message}`,
        is_error: true,
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

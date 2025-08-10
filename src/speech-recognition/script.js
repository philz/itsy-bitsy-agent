class SpeechRecognitionApp {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = '';
        
        this.initializeElements();
        this.initializeSpeechRecognition();
        this.attachEventListeners();
        this.checkBrowserSupport();
    }
    
    initializeElements() {
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.transcript = document.getElementById('transcript');
        this.statusText = document.getElementById('statusText');
        this.listeningIndicator = document.getElementById('listeningIndicator');
        this.languageSelect = document.getElementById('languageSelect');
        this.continuousCheckbox = document.getElementById('continuousCheckbox');
    }
    
    checkBrowserSupport() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showError('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or another Chromium-based browser.');
            this.disableControls();
            return false;
        }
        return true;
    }
    
    initializeSpeechRecognition() {
        if (!this.checkBrowserSupport()) return;
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // Configure recognition settings
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.languageSelect.value;
        this.recognition.maxAlternatives = 1;
        
        this.setupRecognitionEvents();
    }
    
    setupRecognitionEvents() {
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI('listening');
            console.log('Speech recognition started');
        };
        
        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    this.finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            
            this.displayTranscript(this.finalTranscript, interimTranscript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.handleError(event.error);
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI('stopped');
            console.log('Speech recognition ended');
            
            // Restart if continuous mode is enabled and we haven't manually stopped
            if (this.continuousCheckbox.checked && !this.manualStop) {
                setTimeout(() => {
                    if (!this.isListening) {
                        this.startRecognition();
                    }
                }, 100);
            }
        };
        
        this.recognition.onspeechstart = () => {
            this.updateStatus('Speech detected, processing...');
        };
        
        this.recognition.onspeechend = () => {
            this.updateStatus('Processing complete');
        };
        
        this.recognition.onnomatch = () => {
            this.updateStatus('No speech was recognized');
        };
    }
    
    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startRecognition());
        this.stopBtn.addEventListener('click', () => this.stopRecognition());
        this.clearBtn.addEventListener('click', () => this.clearTranscript());
        
        this.languageSelect.addEventListener('change', () => {
            if (this.recognition) {
                this.recognition.lang = this.languageSelect.value;
            }
        });
        
        this.continuousCheckbox.addEventListener('change', () => {
            if (this.recognition) {
                this.recognition.continuous = this.continuousCheckbox.checked;
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case 'Enter':
                        event.preventDefault();
                        if (this.isListening) {
                            this.stopRecognition();
                        } else {
                            this.startRecognition();
                        }
                        break;
                    case 'Backspace':
                        event.preventDefault();
                        this.clearTranscript();
                        break;
                }
            }
        });
    }
    
    startRecognition() {
        if (!this.recognition) {
            this.showError('Speech Recognition is not available');
            return;
        }
        
        if (this.isListening) {
            console.log('Recognition is already running');
            return;
        }
        
        this.manualStop = false;
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Error starting recognition:', error);
            this.handleError(error.message || 'Failed to start speech recognition');
        }
    }
    
    stopRecognition() {
        if (!this.recognition || !this.isListening) {
            return;
        }
        
        this.manualStop = true;
        this.recognition.stop();
    }
    
    clearTranscript() {
        this.finalTranscript = '';
        this.transcript.innerHTML = '';
        this.updateStatus('Transcript cleared');
        
        // Remove any error messages
        const errorDiv = document.querySelector('.error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    displayTranscript(finalText, interimText) {
        let html = '';
        
        if (finalText) {
            html += `<span class="final">${this.escapeHtml(finalText)}</span>`;
        }
        
        if (interimText) {
            html += `<span class="interim">${this.escapeHtml(interimText)}</span>`;
        }
        
        this.transcript.innerHTML = html;
        
        // Auto-scroll to bottom
        this.transcript.scrollTop = this.transcript.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updateUI(state) {
        switch (state) {
            case 'listening':
                this.startBtn.disabled = true;
                this.stopBtn.disabled = false;
                this.listeningIndicator.classList.add('active');
                this.updateStatus('Listening... Speak now');
                break;
            case 'stopped':
                this.startBtn.disabled = false;
                this.stopBtn.disabled = true;
                this.listeningIndicator.classList.remove('active');
                this.updateStatus('Ready to listen');
                break;
        }
    }
    
    updateStatus(message) {
        this.statusText.textContent = message;
    }
    
    handleError(error) {
        let errorMessage = 'An error occurred: ';
        
        switch (error) {
            case 'no-speech':
                errorMessage += 'No speech was detected. Please try again.';
                break;
            case 'audio-capture':
                errorMessage += 'Microphone access was denied or unavailable.';
                break;
            case 'not-allowed':
                errorMessage += 'Microphone access was denied. Please allow microphone access and try again.';
                break;
            case 'network':
                errorMessage += 'Network error occurred. Please check your internet connection.';
                break;
            case 'service-not-allowed':
                errorMessage += 'Speech recognition service is not allowed. Please try again later.';
                break;
            case 'bad-grammar':
                errorMessage += 'Grammar error occurred. Please try again.';
                break;
            case 'language-not-supported':
                errorMessage += 'The selected language is not supported.';
                break;
            default:
                errorMessage += error || 'Unknown error occurred.';
        }
        
        this.showError(errorMessage);
        this.updateUI('stopped');
    }
    
    showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(errorDiv, container.firstChild.nextSibling);
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    disableControls() {
        this.startBtn.disabled = true;
        this.stopBtn.disabled = true;
        this.updateStatus('Speech recognition not available');
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpeechRecognitionApp();
    
    // Show keyboard shortcuts info
    console.log('Keyboard shortcuts:');
    console.log('Ctrl/Cmd + Enter: Start/Stop recognition');
    console.log('Ctrl/Cmd + Backspace: Clear transcript');
});
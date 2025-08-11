class WordCounter {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.wordCounts = new Map(); // Map to store word counts
        this.targetWords = []; // Array of target words
        this.transcript = '';
        
        this.initializeElements();
        this.initializeSpeechRecognition();
        this.bindEvents();
        this.initializeCounters();
    }
    
    initializeElements() {
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.targetWordInput = document.getElementById('targetWord');
        this.countersContainer = document.getElementById('counters');
        this.statusText = document.getElementById('statusText');
        this.confidenceElement = document.getElementById('confidence');
        this.transcriptElement = document.getElementById('transcript');
    }
    
    initializeSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.statusText.textContent = 'Speech recognition not supported in this browser';
            this.startBtn.disabled = true;
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI();
            this.statusText.textContent = 'Listening... Speak now!';
        };
        
        this.recognition.onresult = (event) => {
            this.handleSpeechResult(event);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.statusText.textContent = `Error: ${event.error}`;
            this.stopListening();
        };
        
        this.recognition.onend = () => {
            if (this.isListening) {
                this.recognition.start();
            }
        };
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startListening());
        this.stopBtn.addEventListener('click', () => this.stopListening());
        this.resetBtn.addEventListener('click', () => this.resetAllCounters());
        
        this.targetWordInput.addEventListener('input', (e) => {
            this.updateTargetWords(e.target.value);
        });
        
        // Initialize with default words
        this.updateTargetWords(this.targetWordInput.value);
    }
    
    updateTargetWords(inputValue) {
        this.targetWords = inputValue
            .split(',')
            .map(word => word.trim().toLowerCase())
            .filter(word => word.length > 0);
        
        this.initializeCounters();
    }
    
    initializeCounters() {
        this.wordCounts.clear();
        this.countersContainer.innerHTML = '';
        
        this.targetWords.forEach(word => {
            this.wordCounts.set(word, 0);
            this.createCounterElement(word);
        });
    }
    
    createCounterElement(word) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter-item';
        counterDiv.innerHTML = `
            <div class="word-label">${word}</div>
            <div class="word-count" data-word="${word}">0</div>
            <div class="occurrences-text">occurrences</div>
        `;
        this.countersContainer.appendChild(counterDiv);
    }
    
    startListening() {
        if (!this.recognition) {
            this.statusText.textContent = 'Speech recognition not available';
            return;
        }
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Error starting recognition:', error);
            this.statusText.textContent = 'Error starting speech recognition';
        }
    }
    
    stopListening() {
        this.isListening = false;
        if (this.recognition) {
            this.recognition.stop();
        }
        this.updateUI();
        this.statusText.textContent = 'Stopped listening';
    }
    
    resetAllCounters() {
        this.wordCounts.clear();
        this.transcript = '';
        this.updateAllCounters();
        this.updateTranscript();
        this.statusText.textContent = 'All counters reset';
    }
    
    handleSpeechResult(event) {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            const confidence = event.results[i][0].confidence;
            
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
                this.processTranscript(transcript, false);
            } else {
                // Process interim results for real-time updates
                interimTranscript += transcript;
                this.processTranscript(transcript, true);
            }
            
            if (confidence > 0) {
                this.confidenceElement.textContent = `Confidence: ${(confidence * 100).toFixed(1)}%`;
            }
        }
        
        // Only show the most recent interim result for real-time preview
        const latestInterim = event.results[event.results.length - 1];
        if (!latestInterim.isFinal) {
            this.transcript = finalTranscript + ' ' + latestInterim[0].transcript;
        } else {
            this.transcript = finalTranscript;
        }
        
        this.updateTranscript();
    }
    
    processTranscript(transcript, isInterim) {
        if (this.targetWords.length === 0) return;
        
        const lowerTranscript = transcript.toLowerCase();
        const words = lowerTranscript.split(/\s+/);
        
        // Check each target word immediately
        this.targetWords.forEach(targetWord => {
            const count = words.filter(word => word === targetWord).length;
            if (count > 0) {
                if (isInterim) {
                    // For interim results, show temporary count in preview
                    this.updateCounterDisplay(targetWord, true, count);
                } else {
                    // For final results, increment the actual count
                    this.wordCounts.set(targetWord, this.wordCounts.get(targetWord) + count);
                    this.updateCounterDisplay(targetWord, false, this.wordCounts.get(targetWord));
                }
            }
        });
    }
    
    updateCounterDisplay(word, isInterim, count) {
        const countElement = document.querySelector(`[data-word="${word}"]`);
        if (countElement) {
            if (isInterim) {
                // Show temporary count with different styling for preview
                const currentCount = this.wordCounts.get(word) || 0;
                const previewCount = currentCount + count;
                countElement.textContent = previewCount;
                countElement.classList.add('preview');
                countElement.classList.add('preview-updating');
                
                // Remove preview styling after a short delay
                setTimeout(() => {
                    countElement.classList.remove('preview-updating');
                }, 200);
            } else {
                // Show final count with normal styling
                countElement.textContent = count;
                countElement.classList.remove('preview');
                
                // Add animation for final results
                countElement.classList.add('updated');
                setTimeout(() => {
                    countElement.classList.remove('updated');
                }, 400);
            }
        }
    }
    
    updateAllCounters() {
        this.targetWords.forEach(word => {
            this.updateCounterDisplay(word, false);
        });
    }
    
    updateUI() {
        this.startBtn.disabled = this.isListening;
        this.stopBtn.disabled = !this.isListening;
    }
    
    updateTranscript() {
        if (this.transcript) {
            let highlightedTranscript = this.transcript;
            
            // Highlight all target words
            this.targetWords.forEach(word => {
                const regex = new RegExp(`\\b${this.escapeRegExp(word)}\\b`, 'gi');
                highlightedTranscript = highlightedTranscript.replace(
                    regex,
                    `<span class="highlight">${word}</span>`
                );
            });
            
            this.transcriptElement.innerHTML = highlightedTranscript;
        } else {
            this.transcriptElement.innerHTML = '';
        }
    }
    
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WordCounter();
});

console.log('🎤 Multi-Word Counter initialized!');
console.log('💡 Enter multiple words separated by commas and start counting!'); 
/* ==================== SEPARATE JAVASCRIPT BLOCK (IMPROVED) ==================== */
// All DOM interactions, state management, and dynamic updates

(function() {
    // ---- DOM Elements with null checks ----
    const greetingCardDiv = document.getElementById('greetingCard');
    const colorBlockDiv = document.getElementById('colorBlock');
    const counterDisplayElement = document.getElementById('counterDisplay');
    const messagePreviewSpan = document.getElementById('messagePreview');
    
    // color/style inputs
    const cardBgColorPicker = document.getElementById('cardBgColor');
    const boxColorPicker = document.getElementById('boxColor');
    const radiusSlider = document.getElementById('borderRadiusSlider');
    const radiusValueSpan = document.getElementById('radiusValue');
    const resetStyleBtn = document.getElementById('resetStyleBtn');
    
    // message panel
    const messageInput = document.getElementById('messageInput');
    const updateMsgBtn = document.getElementById('updateMsgBtn');
    const clearMsgBtn = document.getElementById('clearMsgBtn');
    
    // counter panel global
    const globalIncBtn = document.getElementById('globalIncBtn');
    const globalDecBtn = document.getElementById('globalDecBtn');
    const globalResetBtn = document.getElementById('globalResetBtn');
    const globalCounterSpan = document.getElementById('globalCounterSpan');
    const multiplierSelect = document.getElementById('multiplierSelect');
    const applyMultiplierBtn = document.getElementById('applyMultiplierBtn');
    
    // local preview buttons
    const incBtnLocal = document.getElementById('incBtnLocal');
    const resetBtnLocal = document.getElementById('resetBtnLocal');
    
    // random panel
    const randomColorBtn = document.getElementById('randomColorBtn');
    const randomNumberBtn = document.getElementById('randomNumberBtn');
    const randomFactDisplay = document.getElementById('randomFactDisplay');
    
    // ---- State management ----
    let globalCounter = 0;
    let feedbackTimeout = null; // Track timeout to prevent race conditions
    
    // Helper: update all counter displays
    function updateCounterUI() {
        if (counterDisplayElement) counterDisplayElement.innerText = globalCounter;
        if (globalCounterSpan) globalCounterSpan.innerText = globalCounter;
    }
    
    // increment/decrement/reset actions with validation
    function incrementCounter() {
        globalCounter++;
        updateCounterUI();
        addTemporaryFeedback('➕ Counter increased to ' + globalCounter);
    }
    
    function decrementCounter() {
        globalCounter--;
        updateCounterUI();
        addTemporaryFeedback('➖ Counter decreased to ' + globalCounter);
    }
    
    function resetCounter() {
        globalCounter = 0;
        updateCounterUI();
        addTemporaryFeedback('⟳ Counter reset to 0');
    }
    
    // multiplier logic with validation
    function applyMultiplier() {
        if (!multiplierSelect) return;
        const multiplier = parseInt(multiplierSelect.value, 10);
        if (isNaN(multiplier)) return;
        const newValue = globalCounter * multiplier;
        globalCounter = newValue;
        updateCounterUI();
        addTemporaryFeedback(`✨ Multiplied by ${multiplier}! New value: ${globalCounter}`);
    }
    
    // ---- Style Functions with null checks ----
    function applyCardStyles() {
        if (!cardBgColorPicker || !boxColorPicker || !radiusSlider) return;
        
        const bgColor = cardBgColorPicker.value;
        const boxColor = boxColorPicker.value;
        const radius = radiusSlider.value + 'px';
        
        // Apply to all dynamic cards
        const liveContainer = document.getElementById('livePreviewContainer');
        if (liveContainer) {
            const allCards = liveContainer.querySelectorAll('.dynamic-card');
            allCards.forEach(card => {
                card.style.backgroundColor = bgColor;
                card.style.borderRadius = radius;
                card.style.transition = 'background 0.2s, border-radius 0.2s';
            });
        }
        
        // Specific colorBlock background
        if (colorBlockDiv) {
            colorBlockDiv.style.backgroundColor = boxColor;
        }
        
        if (radiusValueSpan) {
            radiusValueSpan.innerText = radiusSlider.value + 'px';
        }
    }
    
    function resetStylesToDefault() {
        if (!cardBgColorPicker || !boxColorPicker || !radiusSlider) return;
        
        cardBgColorPicker.value = '#f1f6fe';
        boxColorPicker.value = '#7b9fc7';
        radiusSlider.value = '18';
        if (radiusValueSpan) radiusValueSpan.innerText = '18px';
        applyCardStyles();
        addTemporaryFeedback('🎨 Styles reset to default');
    }
    
    // ---- Message & preview text updates with XSS protection ----
    function updateMessage() {
        if (!messageInput || !greetingCardDiv) return;
        
        let newMsg = messageInput.value;
        if (newMsg.trim() === "") {
            newMsg = "✨ (empty message) but you rock!";
        }
        
        greetingCardDiv.innerHTML = `
            <strong>💬 Message updated:</strong>
            <div style="margin-top: 8px; word-break: break-word;">${escapeHtml(newMsg)}</div>
            <div style="font-size:0.7rem; margin-top:6px;">⚡ from message machine</div>
        `;
        
        if (messagePreviewSpan) {
            messagePreviewSpan.innerText = newMsg.length > 40 ? newMsg.substring(0,40)+'…' : newMsg;
        }
        addTemporaryFeedback(`📢 Message set: "${newMsg.substring(0,30)}"`);
    }
    
    function clearMessage() {
        if (!messageInput || !greetingCardDiv) return;
        
        messageInput.value = '';
        greetingCardDiv.innerHTML = `
            <strong>👋 Hello Explorer!</strong>
            <div style="margin-top: 8px;">Message cleared. Type something new ✏️</div>
        `;
        if (messagePreviewSpan) messagePreviewSpan.innerText = '(empty)';
        addTemporaryFeedback('🗑️ Message cleared');
    }
    
    // ---- Random features ----
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function applyRandomCardColor() {
        if (!cardBgColorPicker || !boxColorPicker) return;
        
        const randomBg = getRandomColor();
        const randomBox = getRandomColor();
        cardBgColorPicker.value = randomBg;
        boxColorPicker.value = randomBox;
        applyCardStyles();
        addTemporaryFeedback(`🎲 Random colors applied: ${randomBg} & ${randomBox}`);
    }
    
    function generateRandomFact() {
        const facts = [
            "🌟 JS was created in 10 days in 1995!",
            "🎨 CSS stands for Cascading Style Sheets",
            "🧠 HTML is not a programming language",
            "⚡ 'console.log' is developer's best friend",
            "💡 The first website is still online: info.cern.ch",
            "🔢 Your current counter is " + globalCounter,
            "🌈 You changed colors " + Math.floor(Math.random()*100) + " times (probably)",
            "🚀 Flexbox & Grid are layout heroes",
            "📱 Responsive design adapts to screen sizes",
            "🎯 JavaScript is single-threaded but asynchronous"
        ];
        const randomIndex = Math.floor(Math.random() * facts.length);
        const fact = facts[randomIndex];
        if (randomFactDisplay) {
            randomFactDisplay.innerHTML = `🎲 ${fact}`;
        }
        addTemporaryFeedback('✨ Random fact generated!');
    }
    
    // Helper: improved temporary feedback with timeout management
    function addTemporaryFeedback(message) {
        if (!randomFactDisplay) return;
        
        // Clear previous timeout to prevent race conditions
        if (feedbackTimeout) {
            clearTimeout(feedbackTimeout);
        }
        
        const originalText = randomFactDisplay.innerHTML;
        randomFactDisplay.style.transition = '0.1s';
        randomFactDisplay.innerHTML = `⚡ ${message}`;
        
        feedbackTimeout = setTimeout(() => {
            if (randomFactDisplay) {
                randomFactDisplay.innerHTML = originalText;
            }
            feedbackTimeout = null;
        }, 1500);
    }
    
    // Improved XSS escape function
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    
    // ---- Synchronize local preview buttons ----
    function bindLocalButtons() {
        if (incBtnLocal) {
            incBtnLocal.onclick = () => incrementCounter();
        }
        if (resetBtnLocal) {
            resetBtnLocal.onclick = () => resetCounter();
        }
    }
    
    // ---- initial setup and listeners with null checks ----
    function initEventListeners() {
        // Style listeners
        if (cardBgColorPicker) cardBgColorPicker.addEventListener('input', applyCardStyles);
        if (boxColorPicker) boxColorPicker.addEventListener('input', applyCardStyles);
        if (radiusSlider) radiusSlider.addEventListener('input', applyCardStyles);
        if (resetStyleBtn) resetStyleBtn.addEventListener('click', resetStylesToDefault);
        
        // Message listeners
        if (updateMsgBtn) updateMsgBtn.addEventListener('click', updateMessage);
        if (clearMsgBtn) clearMsgBtn.addEventListener('click', clearMessage);
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') updateMessage();
            });
        }
        
        // Counter controls
        if (globalIncBtn) globalIncBtn.addEventListener('click', incrementCounter);
        if (globalDecBtn) globalDecBtn.addEventListener('click', decrementCounter);
        if (globalResetBtn) globalResetBtn.addEventListener('click', resetCounter);
        if (applyMultiplierBtn) applyMultiplierBtn.addEventListener('click', applyMultiplier);
        
        // Random panel
        if (randomColorBtn) randomColorBtn.addEventListener('click', applyRandomCardColor);
        if (randomNumberBtn) randomNumberBtn.addEventListener('click', generateRandomFact);
        
        // Initial message preview
        if (messagePreviewSpan && messageInput) {
            messagePreviewSpan.innerText = messageInput.value || "Learning HTML + CSS + JS";
        }
    }
    
    // ---- apply initial styles and state ----
    function initializePage() {
        applyCardStyles();
        globalCounter = 0;
        updateCounterUI();
        bindLocalButtons();
        
        // Set greeting initial message
        if (greetingCardDiv) {
            greetingCardDiv.innerHTML = `
                <strong>👋 Hello Explorer!</strong>
                <div style="margin-top: 8px;">Click the buttons & sliders → see magic ✨</div>
            `;
        }
        
        // Set colorBlock default bg
        if (colorBlockDiv) colorBlockDiv.style.backgroundColor = '#7b9fc7';
        
        // Message preview default
        if (messagePreviewSpan) messagePreviewSpan.innerText = "Learning HTML + CSS + JS";
        
        // Random fact starter
        if (randomFactDisplay) randomFactDisplay.innerHTML = "🎲 Click 'Random Fact' to discover!";
    }
    
    // Run all only after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initEventListeners();
            initializePage();
        });
    } else {
        initEventListeners();
        initializePage();
    }
})();
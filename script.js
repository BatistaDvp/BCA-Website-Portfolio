// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Particle Animation
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particlesContainer.appendChild(particle);
}

// Fade in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Plan selection
function selectPlan(planName) {
    const planSelect = document.getElementById('plan');
    planSelect.value = planName;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 1000);
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    alert(`Thank you for your interest, ${data.name}! We'll get back to you soon regarding the ${data.plan}.`);
    e.target.reset();
});

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ==================== AI CHATBOT FUNCTIONALITY ====================
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// AI Response Database
const aiResponses = {
    pricing: {
        response: "We offer three pricing plans:\n\n💼 Basic Plan - Professional websites with modern design\n🚀 Intermediate Plan - Websites + simple automations\n⚡ Advanced Plan - Full AI-powered automation solutions\n\nWould you like more details about any specific plan?",
        quickOptions: ['Basic Plan', 'Intermediate Plan', 'Advanced Plan']
    },
    services: {
        response: "BCA specializes in:\n\n🌐 Custom Website Development\n🤖 AI-Powered Automation\n🔄 N8N & Make Integrations\n💬 Microsoft Copilot Studio\n🔗 API Integrations\n📊 Business Process Optimization\n\nWhat service interests you most?",
        quickOptions: ['Website Development', 'Automation', 'Contact Sales']
    },
    contact: {
        response: "Great! You can reach us through:\n\n📧 Contact form on this website\n💬 WhatsApp: +1 (786) 806-9616\n🔗 LinkedIn: Arthur Caixeta\n📱 Instagram: @arturbatista16\n\nOr would you like to schedule a consultation?",
        quickOptions: ['WhatsApp', 'Contact Form', 'Learn More']
    },
    basic: {
        response: "The Basic Plan includes:\n\n✓ Custom responsive website\n✓ Modern, optimized design\n✓ Mobile-friendly\n✓ Fast loading speeds\n✓ Perfect for small businesses & portfolios\n\nReady to get started?",
        quickOptions: ['Request Quote', 'Other Plans', 'Contact Us']
    },
    intermediate: {
        response: "The Intermediate Plan offers:\n\n✓ Everything in Basic Plan\n✓ Simple integrations\n✓ Automated contact forms\n✓ Email automation\n✓ Scheduling systems\n✓ Ideal for growing businesses\n\nInterested in this package?",
        quickOptions: ['Request Quote', 'Other Plans', 'Contact Us']
    },
    advanced: {
        response: "The Advanced Plan delivers:\n\n✓ Everything in previous plans\n✓ Advanced automation flows\n✓ N8N, Make, Copilot Studio\n✓ Custom API integrations\n✓ AI-driven workflows\n✓ Scale operations with technology\n\nLet's discuss your needs!",
        quickOptions: ['Request Quote', 'Schedule Call', 'Contact Us']
    },
    whatsapp: {
        response: "Perfect! Click the button below to chat with us directly on WhatsApp:",
        quickOptions: ['Open WhatsApp']
    }
};

// AI Response Logic
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
        return {
            response: "Hello! 👋 Welcome to BCA. I'm here to help you learn about our AI-powered web development and automation services. What would you like to know?",
            quickOptions: ['View Services', 'Pricing Plans', 'Contact Info']
        };
    }
    
    // Pricing inquiries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return aiResponses.pricing;
    }
    
    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || lowerMessage.includes('what can you')) {
        return aiResponses.services;
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('talk')) {
        return aiResponses.contact;
    }
    
    // Plans
    if (lowerMessage.includes('basic plan')) {
        return aiResponses.basic;
    }
    if (lowerMessage.includes('intermediate') || lowerMessage.includes('middle')) {
        return aiResponses.intermediate;
    }
    if (lowerMessage.includes('advanced') || lowerMessage.includes('premium')) {
        return aiResponses.advanced;
    }
    
    // WhatsApp
    if (lowerMessage.includes('whatsapp')) {
        return aiResponses.whatsapp;
    }
    
    // Website/Development
    if (lowerMessage.includes('website') || lowerMessage.includes('web dev')) {
        return {
            response: "We build modern, responsive websites optimized for performance and user experience. Our sites are powered by the latest technologies and can be integrated with AI automation for enhanced functionality. Interested in a custom website?",
            quickOptions: ['View Examples', 'Get Quote', 'Learn More']
        };
    }
    
    // Automation
    if (lowerMessage.includes('automation') || lowerMessage.includes('ai')) {
        return {
            response: "Our AI automation solutions use cutting-edge tools like N8N, Make, and Microsoft Copilot Studio to streamline your business processes, reduce manual work, and increase efficiency. What process would you like to automate?",
            quickOptions: ['Email Automation', 'Customer Support', 'Custom Solution']
        };
    }
    
    // About founder
    if (lowerMessage.includes('arthur') || lowerMessage.includes('founder') || lowerMessage.includes('who')) {
        return {
            response: "BCA is founded by Arthur Batista Caixeta, a passionate IT student at Florida National University specializing in AI and automation. Arthur believes in connecting innovation, efficiency, and creativity through intelligent technology solutions.",
            quickOptions: ['View Services', 'Contact Arthur', 'Learn More']
        };
    }
    
    // Default response
    return {
        response: "I'd be happy to help! I can tell you about our services, pricing plans, or put you in touch with our team. What would you like to know?",
        quickOptions: ['Services', 'Pricing', 'Contact Us']
    };
}

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI thinking time
    setTimeout(() => {
        typingIndicator.classList.remove('active');
        
        const aiResponse = getAIResponse(message);
        addMessage(aiResponse.response, 'bot', aiResponse.quickOptions);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

// Add message to chat
function addMessage(text, sender, quickOptions = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="bot-avatar">AI</div>
            <div>
                <div class="message-content">${text.replace(/\n/g, '<br>')}</div>
                ${quickOptions ? `
                    <div class="quick-options">
                        ${quickOptions.map(option => `
                            <button class="quick-option" onclick="handleQuickOption('${option}')">${option}</button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
}

// Handle quick option clicks
function handleQuickOption(option) {
    const optionMap = {
        'View Pricing': 'pricing',
        'Our Services': 'services',
        'Contact Us': 'contact',
        'Basic Plan': 'basic plan',
        'Intermediate Plan': 'intermediate plan',
        'Advanced Plan': 'advanced plan',
        'Website Development': 'website development',
        'Automation': 'automation',
        'Contact Sales': 'contact',
        'WhatsApp': 'whatsapp',
        'Open WhatsApp': 'open_whatsapp',
        'Contact Form': 'scroll_contact',
        'Request Quote': 'scroll_contact',
        'Schedule Call': 'whatsapp',
        'Learn More': 'services',
        'View Services': 'services',
        'Pricing Plans': 'pricing',
        'Contact Info': 'contact',
        'View Examples': 'services',
        'Get Quote': 'scroll_contact',
        'Email Automation': 'automation email',
        'Customer Support': 'automation support',
        'Custom Solution': 'contact',
        'Contact Arthur': 'contact',
        'Services': 'services',
        'Pricing': 'pricing',
        'Other Plans': 'pricing'
    };

    const mappedOption = optionMap[option] || option.toLowerCase();

    if (mappedOption === 'open_whatsapp') {
        window.open('https://wa.me/17868069616', '_blank');
        addMessage('Opening WhatsApp... 💬', 'bot');
    } else if (mappedOption === 'scroll_contact') {
        chatWindow.classList.remove('active');
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => document.getElementById('name').focus(), 1000);
    } else {
        chatInput.value = mappedOption;
        sendMessage();
    }
}

// Quick option function for initial buttons
function selectQuickOption(option) {
    handleQuickOption(option === 'pricing' ? 'View Pricing' : 
                    option === 'services' ? 'Our Services' : 'Contact Us');
}

// Send button click
chatSend.addEventListener('click', sendMessage);

// Enter key to send
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Show chat button with delay
setTimeout(() => {
    chatButton.style.animation = 'pulse 2s infinite, fadeInUp 0.5s ease';
}, 2000);
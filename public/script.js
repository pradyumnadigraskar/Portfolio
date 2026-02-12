// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
let menuOverlay = null;

// Create overlay element
function createOverlay() {
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);

        menuOverlay.addEventListener('click', closeMenu);
    }
}

function openMenu() {
    createOverlay();
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

// Close menu when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation scroll effect
const nav = document.querySelector('.nav');

function updateNavBackground() {
    if (!nav) return;
    nav.style.removeProperty('background');
}

window.addEventListener('scroll', updateNavBackground);

// Update nav background when theme changes
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTimeout(updateNavBackground, 50);
    });
}

// Logo click - scroll to top
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing effect for README
const readmeText = `Hi, I'm Pradyumna Digraskar👋

I design and build intelligent, scalable AI systems with a strong focus on Generative AI APIs, large language model integration, and stable diffusion. With a background in Python and experience in PostgreSQL, FastAPI, and Docker, I create innovative solutions that leverage the power of AI to solve complex problems.

Tech Stack:
- Python
- Generative AI APIs
- LLM Integration
- Stable Diffusion
- PostgreSQL
- FastAPI
- Docker
`;

let i = 0;
const typingElement = document.getElementById('typing-text');
const cursor = document.querySelector('.typing-cursor');
const readmeContent = document.querySelector('.readme-content');
const typingSpeed = 20; // milliseconds per character

function typeWriter() {
    if (!typingElement) return;

    if (i < readmeText.length) {
        typingElement.textContent += readmeText.charAt(i);
        i++;

        if (readmeContent) {
            readmeContent.scrollTop = readmeContent.scrollHeight;
        }

        setTimeout(typeWriter, typingSpeed);
    } else {
        setTimeout(() => {
            if (cursor) cursor.style.display = 'none';

            if (readmeContent) {
                readmeContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    }
}

if (typingElement) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(typeWriter, 500);
        });
    } else {
        setTimeout(typeWriter, 500);
    }
}

// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.experience-item, .project, .contact-card, .skill-category');

    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });
});

// Prefers reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

/* =========================================================
   Gemini AI Assistant (Front-end)
   ========================================================= */

const PORTFOLIO_CONTEXT = `
You are an AI assistant for Pradyumna Digraskar's portfolio website.
Answer ONLY using information from this portfolio context. If something isn't in the context, say you don't know and suggest contacting Pradyumna.

Name: Pradyumna Digraskar
Role: Data Scientist

About:
- Works on real-world chatbots, stable diffusion models, AI solutions
- Strong ML/DL background; likes intelligent systems and UX
- Domains: ML, DL, NLP, Generative AI, Computer Vision
- Uses AI agent frameworks: LangGraph, crewAI
- Worked with local LLMs and stable diffusion models

Experience:
1) AI Engineer Intern — Flynaut SaaS Private Limited (Jun 2025 - Dec 2025)
   - Built end-to-end RAG chatbot for natural language queries on a corpus
   - AWS deployment and cloud operations
   - Tags: Python, RAG, OCR, LLM, AWS
2) Data Science Intern — Tech-Advance Global Solutions (Aug 2024 - Mar 2025)
   - 5ST-Vision Inspection System: classify components OK / Not OK
   - YOLOv8 segmentation + custom dataset fine-tuning
   - Tags: YOLO, OpenCV, Computer Vision, Deep Learning, Quantization
3) AI Engineer Intern — Artistic Codes (Jan 2024 - Jul 2025)
   - EDA and preprocessing on large datasets
   - Built end-to-end applications; teamwork/communication
   - Tags: Machine Learning, HTML, CSS, JS, FastAPI

Projects:
- Indian Hand Sign Text & Speech Converter (Python, MediaPipe, FastAPI, HTML/CSS/JS)
  GitHub: https://github.com/pradyumnadigraskar/Indian-Hand-Sign-Detection
- Gen AI - Multimodal Chatbot (FastAPI, Ollama Mistral/LLaVA, Diffusers/Automatic1111, faster-whisper ASR, Edge-TTS, JWT, history)
  GitHub: https://github.com/pradyumnadigraskar/Gen-AI---Multimodal-Chatbot
- Dual-Mode-RAG-Sys (Qdrant + LangChain local; Gemini 2.5 Flash cloud mode toggle)
  GitHub: https://github.com/pradyumnadigraskar/Dual-Mode-RAG-Sys
- Agentic AI Paper2Project
  GitHub: https://github.com/pradyumnadigraskar/Agentic_AI_Paper2Project

Contact:
Email: pradyumnadigraskar11@gmail.com
Phone: +91 8793487958
GitHub: https://github.com/pradyumnadigraskar
LinkedIn: https://www.linkedin.com/in/pradyumnadigraskar/
Portfolio: https://portfolio-gch5.onrender.com/
`;

const aiFab = document.getElementById('aiFab');
const aiChat = document.getElementById('aiChat');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatBody = document.getElementById('aiChatBody');
const aiChatForm = document.getElementById('aiChatForm');
const aiChatText = document.getElementById('aiChatText');
const aiChatSend = document.getElementById('aiChatSend');

let aiIsOpen = false;
const aiHistory = []; // { role: "user"|"model", parts: [{text:"..."}] }

function openAIChat() {
    if (!aiChat) return;
    aiIsOpen = true;
    aiChat.classList.add('active');
    aiChat.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
        if (aiChatText) aiChatText.focus();
    }, 50);
}

function closeAIChat() {
    if (!aiChat) return;
    aiIsOpen = false;
    aiChat.classList.remove('active');
    aiChat.setAttribute('aria-hidden', 'true');
}

function appendMessage(type, text) {
    if (!aiChatBody) return;

    const wrapper = document.createElement('div');
    wrapper.className = `ai-msg ${type === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    aiChatBody.appendChild(wrapper);

    aiChatBody.scrollTop = aiChatBody.scrollHeight;
}

function setSending(isSending) {
    if (!aiChatSend || !aiChatText) return;
    aiChatSend.disabled = isSending;
    aiChatText.disabled = isSending;
    aiChatSend.textContent = isSending ? '...' : 'Send';
}

async function sendToGemini(message) {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            context: PORTFOLIO_CONTEXT,
            history: aiHistory
        })
    });

    if (!res.ok) {
        let errText = 'Something went wrong.';
        try {
            const data = await res.json();
            errText = data?.detail || data?.error || errText;
        } catch (_) {}
        throw new Error(errText);
    }

    return res.json(); // { reply: "..." }
}

if (aiFab) {
    aiFab.addEventListener('click', () => {
        if (!aiIsOpen) openAIChat();
    });
}

if (aiChatClose) {
    aiChatClose.addEventListener('click', () => closeAIChat());
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aiIsOpen) closeAIChat();
});

if (aiChatForm) {
    aiChatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!aiChatText) return;

        const text = aiChatText.value.trim();
        if (!text) return;

        appendMessage('user', text);
        aiChatText.value = '';

        aiHistory.push({ role: "user", parts: [{ text }] });

        setSending(true);
        try {
            const data = await sendToGemini(text);
            const reply = (data && data.reply) ? data.reply : "I couldn't generate a response.";
            appendMessage('bot', reply);
            aiHistory.push({ role: "model", parts: [{ text: reply }] });
        } catch (err) {
            appendMessage('bot', `Error: ${err.message}`);
        } finally {
            setSending(false);
        }
    });
}

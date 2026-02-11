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
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

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
let lastScroll = 0;

function updateNavBackground() {
    const currentScroll = window.pageYOffset;
    const theme = htmlElement.getAttribute('data-theme');

    // Remove inline styles to let CSS variables handle it
    nav.style.removeProperty('background');
}

window.addEventListener('scroll', updateNavBackground);

// Update nav background when theme changes
themeToggle.addEventListener('click', () => {
    setTimeout(updateNavBackground, 50);
});

// Logo click - scroll to top
document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
    if (i < readmeText.length) {
        typingElement.textContent += readmeText.charAt(i);
        i++;

        // Auto-scroll the README box as content is typed
        if (readmeContent) {
            readmeContent.scrollTop = readmeContent.scrollHeight;
        }

        setTimeout(typeWriter, typingSpeed);
    } else {
        // After typing is complete, wait a bit then scroll back to top
        setTimeout(() => {
            if (cursor) {
                cursor.style.display = 'none';
            }

            // Smooth scroll back to top of README box
            if (readmeContent) {
                readmeContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    }
}

// Start typing animation when DOM is ready
if (typingElement) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(typeWriter, 500);
        });
    } else {
        // DOM already loaded, start immediately
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

// Observe elements for fade-in animation
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
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
}
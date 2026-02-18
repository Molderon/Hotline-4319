/* ==========================================================
   MOBILE MENU FUNCTIONALITY
   ========================================================== */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav a');
    const mobileMenuCta = document.querySelector('.mobile-menu-cta');
    const mobileMenuCtaButton = document.querySelector('.mobile-menu-cta a');
    const mobileMenuLogo = document.querySelector('.mobile-menu-logo');

    if (!mobileMenuBtn || !mobileMenu || !mobileMenuOverlay || !mobileMenuClose) return;

    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        mobileMenuLinks.forEach((link, index) => {
            if (link) {
                link.style.animation = 'none';
                link.style.opacity = '0';
                link.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    link.style.animation = `slideInLeft 0.4s ease forwards`;
                }, 250 + (index * 100));
            }
        });
        
        if (mobileMenuCta) {
            mobileMenuCta.style.animation = 'none';
            mobileMenuCta.style.opacity = '0';
            mobileMenuCta.style.transform = 'translateY(20px)';
            setTimeout(() => {
                mobileMenuCta.style.animation = 'slideInUp 0.4s ease forwards';
            }, 100);
        }
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });

    mobileMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileMenu();
    });
    
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    if (mobileMenuCtaButton) {
        mobileMenuCtaButton.addEventListener('click', (e) => {
            if (mobileMenuCtaButton.getAttribute('href') === '#') e.preventDefault();
            closeMobileMenu();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) closeMobileMenu();
    });
}

// Init Menu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileMenu);
} else {
    initializeMobileMenu();
}

/* ==========================================================
   BACKGROUND EFFECTS (Matrix, Particles, Streams)
   ========================================================== */
function generateMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    if (!matrixRain) return;
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ마미무메모ヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${Math.random() * 5 + 10}s`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        let text = '';
        const charCount = Math.floor(Math.random() * 20 + 10);
        for (let j = 0; j < charCount; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + ' ';
        }
        column.textContent = text;
        matrixRain.appendChild(column);
    }
}

function generateParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 20}s`;
        particlesContainer.appendChild(particle);
    }
}

function generateDataStreams() {
    const dataStreams = document.getElementById('dataStreams');
    if (!dataStreams) return;
    for (let i = 0; i < 10; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.top = `${Math.random() * 100}%`;
        stream.style.left = `-300px`;
        stream.style.animationDelay = `${Math.random() * 5}s`;
        stream.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        dataStreams.appendChild(stream);
    }
}

// Initial Call
generateMatrixRain();
generateParticles();
generateDataStreams();

window.addEventListener('resize', () => {
    const matrixRain = document.getElementById('matrixRain');
    if (matrixRain) {
        matrixRain.innerHTML = '';
        generateMatrixRain();
    }
});

/* ==========================================================
   INTERACTIVE MOUSE EFFECTS
   ========================================================== */
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - window.innerWidth / 2) * speed;
        const y = (mouseY - window.innerHeight / 2) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });

    if (window.innerWidth > 768) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const distance = Math.sqrt(Math.pow(mouseX - (rect.left + rect.width / 2), 2) + Math.pow(mouseY - (rect.top + rect.height / 2), 2));
            if (distance < 150) {
                const brightness = 1 - (distance / 150);
                particle.style.boxShadow = `0 0 ${20 + brightness * 30}px rgba(0, 255, 255, ${0.5 + brightness * 0.5})`;
                particle.style.transform = `scale(${1 + brightness * 0.5})`;
            } else {
                particle.style.boxShadow = '';
                particle.style.transform = '';
            }
        });
    }
});

// Cursor Glow Overlay
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `position: fixed; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%); pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: opacity 0.3s ease; opacity: 0;`;
    document.body.appendChild(cursorGlow);
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
}

/* ==========================================================
   UI UTILITIES (Smooth Scroll, Tabs, Fade-In)
   ========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href === '#top' ? 'body' : href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Tabs
const tabs = document.querySelectorAll('.tab-item');
const panels = document.querySelectorAll('.content-panel');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

/* ==========================================================
   FORM TRANSMISSION (NETLIFY + DISCORD)
   ========================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        
        // UI Feedback: Start upload
        submitBtn.innerText = "INITIALIZING TRANSMISSION...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        data.append("form-name", "contact");

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: data.toString()
            });

            if (response.ok) {
                submitBtn.innerText = "TRANSMISSION SUCCESSFUL";
                submitBtn.style.color = "var(--primary-cyan)";
                contactForm.reset();

                // 60 Second Cooldown
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.color = "";
                }, 60000);
            } else {
                throw new Error('Relay Failure');
            }
        } catch (err) {
            submitBtn.innerText = "ERROR: RELAY OFFLINE";
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 5000);
        }
    });
}

/* ==========================================================
   CYBER TEXT RANDOMIZER
   ========================================================== */
const cyberTexts = ['R&D...', 'DATA SCIENCE', 'INDUSTRIAL REVOLUTIONS', 'NEURO-SYMBOLICS', 'SYSTEM ARCHITECTURE', 'NEUROMORPHIC COMPUTING', 'COMPUTER SCIENCE', 'ROBOTICS', 'CONTROL THEORY', 'MACHINE LEARNING', 'DIGITAL TWINS','ADAPTIVE CONTROL', 'TEMPLE OS', 'DIGITAL PHENOTYPES'];

setInterval(() => {
    const randomText = cyberTexts[Math.floor(Math.random() * cyberTexts.length)];
    const tempElement = document.createElement('div');
    tempElement.textContent = randomText;
    tempElement.style.cssText = `position: fixed; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw; color: var(--primary-cyan); font-size: 0.8rem; font-weight: 700; z-index: 1000; opacity: 0.7; pointer-events: none; animation: fadeOut 3s ease-out forwards; text-shadow: 0 0 10px var(--primary-cyan);`;
    document.body.appendChild(tempElement);
    setTimeout(() => tempElement.remove(), 3000);
}, 5000);

// Global Styles for Cyber Text
const style = document.createElement('style');
style.textContent = `@keyframes fadeOut { 0% { opacity: 0.7; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-50px); } }`;
document.head.appendChild(style);
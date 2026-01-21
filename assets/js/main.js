// Paradise Accessories - Interactive Features
// ==================================================

// ==================================================
// MOBILE MENU TOGGLE
// ==================================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length > 0 && mobileToggle && navMenu) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// ==================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================================================
// ACTIVE NAVIGATION ON SCROLL
// ==================================================
const sections = document.querySelectorAll('section[id]');

function activateNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavOnScroll);

// ==================================================
// HEADER SCROLL EFFECT
// ==================================================
const header = document.getElementById('header');
let lastScroll = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ==================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ==================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// ==================================================
// FORM VALIDATION & SUBMISSION
// ==================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Honeypot check (anti-spam)
        if (data.website) {
            console.log('Spam detected');
            return; // Silent fail for bots
        }

        // Basic validation
        if (!data.name || !data.phone) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(data.phone)) {
            showNotification('Пожалуйста, введите корректный номер телефона', 'error');
            return;
        }

        // Email validation (if provided)
        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
        }

        // File size validation (max 10MB)
        const fileInput = document.getElementById('file');
        if (fileInput && fileInput.files[0]) {
            const fileSize = fileInput.files[0].size / 1024 / 1024; // in MB
            if (fileSize > 10) {
                showNotification('Размер файла не должен превышать 10MB', 'error');
                return;
            }
        }

        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type=\"submit\"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        try {
            // Prepare FormData for API
            const formDataToSend = new FormData(contactForm);
            
            // Add current language
            const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'ru';
            formDataToSend.append('language', currentLang);
            
            // Add source/URL
            formDataToSend.append('source', window.location.href);
            
            // API endpoint - use config if available
            const apiEndpoint = (window.API_CONFIG && window.API_CONFIG.contactURL) 
                ? window.API_CONFIG.contactURL 
                : '/api/contact/submit/';
            
            // Send to backend API
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    // Don't set Content-Type - browser will set it with boundary for FormData
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || 'Ошибка отправки формы');
            }

            // Google Analytics event (if configured)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Contact Form',
                    'value': 1
                });
            }

            // Track analytics event (if API available)
            try {
                const analyticsEndpoint = (window.API_CONFIG && window.API_CONFIG.analyticsURL) 
                    ? window.API_CONFIG.analyticsURL 
                    : '/api/analytics/track/';
                fetch(analyticsEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        event_type: 'form_submission',
                        event_category: 'Lead Generation',
                        event_label: 'Contact Form',
                        page_url: window.location.href,
                        language: currentLang
                    })
                }).catch(err => console.log('Analytics tracking failed:', err));
            } catch (analyticsError) {
                // Silent fail for analytics
                console.log('Analytics error:', analyticsError);
            }

            // Success notification with message from API or default
            const successMessage = result.message || 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в течение 2 часов.';
            showNotification(successMessage, 'success');

            // Reset form
            contactForm.reset();

            // Log for debugging
            console.log('Form submitted successfully:', result);

        } catch (error) {
            // Handle different error types
            let errorMessage = 'Произошла ошибка. Пожалуйста, попробуйте позже или позвоните нам: +998 90 123 45 67';
            
            if (error.message) {
                errorMessage = error.message;
            } else if (error instanceof TypeError && error.message.includes('fetch')) {
                errorMessage = 'Не удалось подключиться к серверу. Проверьте подключение к интернету.';
            }
            
            showNotification(errorMessage, 'error');
            console.error('Form error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ==================================================
// NOTIFICATION SYSTEM
// ==================================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================================================
// PHONE NUMBER FORMATTING
// ==================================================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    // Auto-add +998 for Uzbekistan if user starts typing
    if (value.length > 0 && !value.startsWith('998')) {
        if (value.length <= 9) {
            value = '998' + value;
        }
    }

    // Format: +998 XX XXX XX XX
    if (value.startsWith('998')) {
        let formatted = '+998';
        if (value.length > 3) formatted += ' ' + value.substring(3, 5);
        if (value.length > 5) formatted += ' ' + value.substring(5, 8);
        if (value.length > 8) formatted += ' ' + value.substring(8, 10);
        if (value.length > 10) formatted += ' ' + value.substring(10, 12);

        e.target.value = formatted;
    }
    });
}

// ==================================================
// PRODUCT CARD TILT EFFECT (Optional Enhancement)
// ==================================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================================================
// CONSOLE BRANDING
// ==================================================
console.log(
    '%cParadise Accessories',
    'color: #4F46E5; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
);
console.log(
    '%cПремиальные бирки и этикетки для вашего бренда',
    'color: #6B6B6B; font-size: 14px;'
);
console.log(
    '%c🌐 www.paradise-acc.uz | 📞 +998 90 123 45 67',
    'color: #2A2A2A; font-size: 12px;'
);

// ==================================================
// INITIALIZATION
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Paradise Accessories website loaded successfully');

    // Trigger initial scroll check for active nav
    activateNavOnScroll();

    // Add initial animation class to hero
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.classList.add('animate-fadeInUp');
    }
});

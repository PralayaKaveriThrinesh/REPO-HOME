/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL TOP ===============*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 350) scrollTop.classList.add('show');
    else scrollTop.classList.remove('show');
}
window.addEventListener('scroll', scrollTop);

/*=============== SCROLL TO TOP FUNCTIONALITY ===============*/
const scrollTopButton = document.getElementById('scroll-top');
if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SMOOTH SCROLLING FOR NAVIGATION LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== CONTACT FORM VALIDATION ===============*/
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        inputElement.style.borderColor = 'var(--error-color)';
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = '';
        inputElement.style.borderColor = 'var(--border-color)';
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.form__error');
    const inputElements = document.querySelectorAll('.form__input');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    inputElements.forEach(element => {
        element.style.borderColor = 'var(--border-color)';
    });
}

// Real-time validation
document.getElementById('name').addEventListener('input', function() {
    const name = this.value.trim();
    if (name.length > 0) {
        if (validateName(name)) {
            clearError('name');
            this.style.borderColor = 'var(--success-color)';
        } else {
            showError('name', 'Name must be at least 2 characters long');
        }
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('input', function() {
    const email = this.value.trim();
    if (email.length > 0) {
        if (validateEmail(email)) {
            clearError('email');
            this.style.borderColor = 'var(--success-color)';
        } else {
            showError('email', 'Please enter a valid email address');
        }
    } else {
        clearError('email');
    }
});

document.getElementById('message').addEventListener('input', function() {
    const message = this.value.trim();
    if (message.length > 0) {
        if (validateMessage(message)) {
            clearError('message');
            this.style.borderColor = 'var(--success-color)';
        } else {
            showError('message', 'Message must be at least 10 characters long');
        }
    } else {
        clearError('message');
    }
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        let isValid = true;
        
        // Validate name
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (!validateMessage(message)) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        // If validation passes
        if (isValid) {
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Reset form after success
                setTimeout(() => {
                    contactForm.reset();
                    clearAllErrors();
                    contactForm.style.display = 'block';
                    formSuccess.classList.remove('show');
                }, 5000);
                
            }, 2000);
        } else {
            // Focus on first error field
            const firstError = document.querySelector('.form__error:not(:empty)');
            if (firstError) {
                const fieldId = firstError.id.replace('-error', '');
                const field = document.getElementById(fieldId);
                if (field) {
                    field.focus();
                }
            }
        }
    });
}

/*=============== SCROLL ANIMATIONS FOR SERVICES ===============*/
function animateOnScroll() {
    const serviceCards = document.querySelectorAll('.service__card');
    
    serviceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.8) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Initialize service cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service__card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);

/*=============== INTERSECTION OBSERVER FOR BETTER PERFORMANCE ===============*/
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service__card, .about__card, .contact__card');
    animateElements.forEach(el => observer.observe(el));
}

/*=============== LAZY LOADING FOR IMAGES ===============*/
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

/*=============== KEYBOARD NAVIGATION SUPPORT ===============*/
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
    
    // Enter key on scroll-to-top button
    if (e.key === 'Enter' && e.target.id === 'scroll-top') {
        e.target.click();
    }
});

/*=============== THEME PREFERENCE DETECTION ===============*/
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.body.classList.add('reduce-motion');
}

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollTop = debounce(scrollTop, 10);
const debouncedScrollActive = debounce(scrollActive, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollTop);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollTop);
window.addEventListener('scroll', debouncedScrollActive);

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could implement error reporting here
});

/*=============== INITIALIZATION ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any components that need setup
    console.log('G.K. Reddy Company website loaded successfully');
    
    // Add loading class removal after page load
    document.body.classList.add('loaded');
    
    // Set current year in footer if needed
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer__copyright');
    if (copyrightText && copyrightText.textContent.includes('2025')) {
        copyrightText.textContent = copyrightText.textContent.replace('2025', currentYear);
    }
});

/*=============== UTILITY FUNCTIONS ===============*/
// Function to get element by ID safely
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with ID '${id}' not found`);
    }
    return element;
}

// Function to safely add event listener
function addEventListenerSafe(element, event, handler) {
    if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
        return true;
    }
    return false;
}

// Function to toggle class safely
function toggleClassSafe(element, className) {
    if (element && className) {
        element.classList.toggle(className);
        return true;
    }
    return false;
}

/*=============== ACCESSIBILITY ENHANCEMENTS ===============*/
// Skip to main content functionality
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Add main ID to main element
const mainElement = document.querySelector('main');
if (mainElement && !mainElement.id) {
    mainElement.id = 'main';
}

/*=============== FINAL SETUP ===============*/
// Ensure all critical functionality is working
function finalCheck() {
    const criticalElements = [
        'nav-menu',
        'nav-toggle',
        'contact-form',
        'scroll-top'
    ];
    
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Critical element '${id}' not found`);
        }
    });
}

// Run final check after DOM is loaded
document.addEventListener('DOMContentLoaded', finalCheck);

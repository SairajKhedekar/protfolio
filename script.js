// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link highlighting
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    setActiveNavLink();
});

// Form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('form-message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    const nameError = document.getElementById('name-error');
    
    if (name === '') {
        nameError.textContent = 'Name is required';
        nameInput.style.borderColor = '#ef4444';
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.style.borderColor = '#ef4444';
        return false;
    } else {
        nameError.textContent = '';
        nameInput.style.borderColor = '#e5e7eb';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('email-error');
    
    if (email === '') {
        emailError.textContent = 'Email is required';
        emailInput.style.borderColor = '#ef4444';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.style.borderColor = '#ef4444';
        return false;
    } else {
        emailError.textContent = '';
        emailInput.style.borderColor = '#e5e7eb';
        return true;
    }
}

function validateSubject() {
    const subject = subjectInput.value.trim();
    const subjectError = document.getElementById('subject-error');
    
    if (subject === '') {
        subjectError.textContent = 'Subject is required';
        subjectInput.style.borderColor = '#ef4444';
        return false;
    } else if (subject.length < 3) {
        subjectError.textContent = 'Subject must be at least 3 characters';
        subjectInput.style.borderColor = '#ef4444';
        return false;
    } else {
        subjectError.textContent = '';
        subjectInput.style.borderColor = '#e5e7eb';
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    const messageError = document.getElementById('message-error');
    
    if (message === '') {
        messageError.textContent = 'Message is required';
        messageInput.style.borderColor = '#ef4444';
        return false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.style.borderColor = '#ef4444';
        return false;
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = '#e5e7eb';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() !== '') {
        validateName();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() !== '') {
        validateEmail();
    }
});

subjectInput.addEventListener('blur', validateSubject);
subjectInput.addEventListener('input', () => {
    if (subjectInput.value.trim() !== '') {
        validateSubject();
    }
});

messageInput.addEventListener('blur', validateMessage);
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() !== '') {
        validateMessage();
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Simulate form submission
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        
        // Reset form
        contactForm.reset();
        
        // Clear error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Reset border colors
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.style.borderColor = '#e5e7eb';
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    } else {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill in all required fields correctly.';
        
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and detail cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const detailCards = document.querySelectorAll('.detail-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    detailCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add scroll reveal animation to contact form
const contactFormObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const contactInfo = document.querySelector('.contact-info');
    const contactFormElement = document.querySelector('.contact-form');
    
    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateX(-30px)';
        contactInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactFormObserver.observe(contactInfo);
    }
    
    if (contactFormElement) {
        contactFormElement.style.opacity = '0';
        contactFormElement.style.transform = 'translateX(30px)';
        contactFormElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactFormObserver.observe(contactFormElement);
    }
});

// Initialize active nav link on page load
setActiveNavLink();

// Smooth scroll on page load if hash exists
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            setTimeout(() => {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});


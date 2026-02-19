// Hamburger Menu functionality
function initMobileMenu() {
    const nav = document.querySelector('nav');
    let menuButton = document.querySelector('.mobile-menu-toggle');
    
    // Create menu button if it doesn't exist
    if (!menuButton) {
        menuButton = document.createElement('button');
        menuButton.classList.add('mobile-menu-toggle');
        menuButton.innerHTML = '☰';
        menuButton.setAttribute('aria-label', 'Toggle menu');
        
        const logo = document.querySelector('.logo');
        logo.parentElement.insertBefore(menuButton, nav);
    }
    
    // Toggle menu on button click
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        menuButton.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuButton.innerHTML = '☰';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuButton.contains(e.target)) {
            nav.classList.remove('active');
            menuButton.innerHTML = '☰';
        }
    });
}

// Smooth scrolling for anchor links
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

// Tab functionality for About page
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project-card, .service-card, .team-member, .service-detail, .project-detail').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

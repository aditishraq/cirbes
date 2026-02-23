// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu functionality
    function initMobileMenu() {
        const nav = document.querySelector('nav');
        const headerContainer = document.querySelector('header .container');
        
        if (!nav || !headerContainer) {
            return;
        }
        
        // Check if button already exists
        let menuButton = headerContainer.querySelector('.mobile-menu-toggle');
        
        // Create menu button if it doesn't exist
        if (!menuButton) {
            menuButton = document.createElement('button');
            menuButton.className = 'mobile-menu-toggle';
            menuButton.innerHTML = '☰';
            menuButton.setAttribute('aria-label', 'Toggle menu');
            
            // Add button to header container (it will be positioned with CSS)
            headerContainer.appendChild(menuButton);
        }
        
        // Toggle menu on button click
        menuButton.onclick = function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            this.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        };
        
        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.onclick = function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuButton.innerHTML = '☰';
                }
            };
        });
        
        // Close menu when clicking outside
        document.onclick = function(e) {
            if (window.innerWidth <= 768 && 
                nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuButton.contains(e.target)) {
                nav.classList.remove('active');
                menuButton.innerHTML = '☰';
            }
        };
        
        // Handle window resize
        window.onresize = function() {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                menuButton.innerHTML = '☰';
            }
        };
    }

    // Initialize mobile menu
    initMobileMenu();

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
    document.querySelectorAll('.project-card, .service-card, .team-member, .service-detail, .project-detail, .step-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
});
});

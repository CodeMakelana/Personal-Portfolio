/* ===============================================
   Portfolio Interactive Functionality
   =============================================== */

// DOM Elements
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');

/* ===============================================
   Navigation Functionality
   =============================================== */

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger bars
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close mobile menu when clicking on nav links
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the link's href attribute
            const href = this.getAttribute('href');
            
            // Check if the link points to a section on the current page
            // A same-page link will either start with # or contain current page name + #
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const isCurrentPageLink = href.startsWith('#') || 
                                     (href.includes(currentPage) && href.includes('#'));
            
            // Only apply smooth scrolling to same-page links
            if (isCurrentPageLink) {
                e.preventDefault();
                
                // Extract the section ID (everything after the # symbol)
                let targetId;
                if (href.startsWith('#')) {
                    targetId = href; // It's already in the format "#section-id"
                } else {
                    targetId = '#' + href.split('#')[1]; // Extract section ID from "page.html#section-id"
                }
                
                // Find the target element
                const targetSection = document.querySelector(targetId);
                
                // If the target exists on current page, scroll to it
                if (targetSection) {
                    // Account for fixed header height
                    const headerOffset = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close the mobile menu if it's open
                    closeMobileMenu();
                    
                    // Update the active state in the navigation
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // For links to other pages (not preventing default), normal navigation occurs
        });
    });
}

/* ===============================================
   Active Navigation State Management
   =============================================== */

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/* ===============================================
   Header Scroll Effects
   =============================================== */

function handleHeaderScroll() {
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(13, 17, 23, 0.98)';
        header.style.borderBottom = '1px solid rgba(88, 166, 255, 0.2)';
    } else {
        header.style.background = 'rgba(13, 17, 23, 0.95)';
        header.style.borderBottom = '1px solid rgba(88, 166, 255, 0.1)';
    }
}

/* ===============================================
   Scroll Animations
   =============================================== */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            } else {
                entry.target.classList.remove('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .contact-item, .highlight-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ===============================================
   Project Card Interactions
   =============================================== */

function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect for project links
        const projectLinks = card.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // For now, show a coming soon message
                // In the future, these will link to actual demos
                showComingSoonNotification();
            });
        });
        
        // Add parallax-like effect on mouse move
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
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* ===============================================
   Utility Functions
   =============================================== */

function showComingSoonNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = 'Demo links coming soon! 🚀';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(88, 166, 255, 0.9);
        color: #0D1117;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

/* ===============================================
   Scroll to Top Functionality
   =============================================== */

function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #58A6FF;
        color: #0D1117;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(88, 166, 255, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.background = '#79C0FF';
        scrollTopBtn.style.transform = 'translateY(-3px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.background = '#58A6FF';
        scrollTopBtn.style.transform = 'translateY(0)';
    });
}

/* ===============================================
   Theme and Performance Optimizations
   =============================================== */

function optimizePerformance() {
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNavLink();
        handleHeaderScroll();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

/* ===============================================
   Initialization
   =============================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initProjectCardEffects();
    initScrollToTop();
    optimizePerformance();
    
    // Add event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    console.log('Portfolio initialized successfully! 🚀');
});

/* ===============================================
   Error Handling
   =============================================== */

window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Fallback for older browsers
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
    };
}
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const program = formData.get('program');
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="background-color: var(--secondary-blue); padding: 20px; border-radius: 8px; border-left: 4px solid var(--cyber-green); margin-top: 20px;">
                    <h3 style="color: var(--cyber-green); margin-bottom: 10px;">Thank you, ${name}!</h3>
                    <p style="color: var(--light-blue);">Your inquiry has been received. We'll contact you at ${email} regarding the ${program} program within 24 hours.</p>
                </div>
            `;
            
            // Insert after form
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            // Reset form
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Animate progress bar on scroll
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        const animateProgressBar = () => {
            const section = document.querySelector('.strategic-goal');
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                progressBar.style.width = '25%';
            }
        };
        
        window.addEventListener('scroll', animateProgressBar);
        // Initial check
        animateProgressBar();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.includes('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksArray = document.querySelectorAll('.main-nav a');
    
    navLinksArray.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add hover effect to program cards
    const programCards = document.querySelectorAll('.program-card, .feature-card, .cert-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(100, 255, 218, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Price formatting function
    function formatPrice(price) {
        return '₦' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Update all price elements with formatting
    const priceElements = document.querySelectorAll('.program-price, .price-tag, .cert-price, .service-price');
    priceElements.forEach(element => {
        const text = element.textContent;
        const priceMatch = text.match(/₦(\d+(?:,\d{3})*)/);
        
        if (priceMatch) {
            const numericPrice = priceMatch[1].replace(/,/g, '');
            element.textContent = text.replace(/₦(\d+(?:,\d{3})*)/, formatPrice(parseInt(numericPrice)));
        }
    });
    
    // Initialize animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .program-card, .value-card, .cert-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});
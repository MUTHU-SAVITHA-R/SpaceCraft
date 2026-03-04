// ===== js/script.js =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            let isValid = true;
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const service = document.getElementById('service');
            
            // Validate name
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate phone (optional but must be valid if provided)
            if (phone.value.trim()) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
                    document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
                    isValid = false;
                }
            }
            
            // Validate message
            if (!message.value.trim()) {
                document.getElementById('msgError').textContent = 'Message is required';
                isValid = false;
            }
            
            // Validate service
            if (!service.value) {
                alert('Please select a service');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                document.getElementById('form-feedback').innerHTML = '<span class="success-message">Thank you for contacting us! We\'ll get back to you within 24 hours.</span>';
                
                // EmailJS integration - Uncomment and configure when ready
                /*
                // Initialize EmailJS (add this script to your HTML first)
                emailjs.sendForm('service_id', 'template_id', this)
                    .then(() => {
                        document.getElementById('form-feedback').innerHTML = '<span class="success-message">Form submitted successfully! We\'ll contact you soon.</span>';
                        contactForm.reset();
                    }, (error) => {
                        document.getElementById('form-feedback').innerHTML = '<span class="error-message">Failed to send message. Please try again.</span>';
                        console.log('Failed to send email', error);
                    });
                */
                
                // Clear form
                contactForm.reset();
            }
        });
    }

    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const feedback = document.getElementById('newsletter-feedback');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailInput.value) {
                feedback.innerHTML = '<span style="color: #E76F51;">Email is required</span>';
            } else if (!emailRegex.test(emailInput.value)) {
                feedback.innerHTML = '<span style="color: #E76F51;">Please enter a valid email</span>';
            } else {
                feedback.innerHTML = '<span class="success-message">Thank you for subscribing! Check your inbox for design tips.</span>';
                emailInput.value = '';
                
                // Newsletter API integration - Uncomment when ready
                // fetch('/api/subscribe', { 
                //     method: 'POST', 
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email: emailInput.value }) 
                // });
            }
        });
    }

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .testimonial-card, .before-after-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animated elements
    document.querySelectorAll('.card, .testimonial-card, .before-after-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Loading animation (show on page transition)
    window.addEventListener('beforeunload', function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'block';
        }
    });
    
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    });
});
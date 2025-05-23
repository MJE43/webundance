/**
 * Contact Page JavaScript Functionality
 * Handles form validation, FAQ accordion, and form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scroll for CTA button
    initSmoothScroll();
});

/**
 * FAQ Accordion Functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Contact Form Functionality
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = validateForm();
        if (!isValid) return;
        
        // Check honeypot
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            return; // Bot detected, silently fail
        }
        
        // Show loading state
        setLoadingState(true);
        hideMessages();
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await submitForm(new FormData(form));
            showSuccessMessage();
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage();
        } finally {
            setLoadingState(false);
        }
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation (optional)
        else if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        
        // Project type validation
        else if (fieldName === 'project-type' && field.required && !value) {
            isValid = false;
            errorMessage = 'Please select a project type.';
        }
        
        // Update error display
        if (errorElement) {
            errorElement.textContent = errorMessage;
            field.classList.toggle('error', !isValid);
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (errorElement && field.value.trim()) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }
    
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }
    
    function showSuccessMessage() {
        hideMessages();
        successMessage.style.display = 'flex';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function showErrorMessage() {
        hideMessages();
        errorMessage.style.display = 'flex';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
    
    async function submitForm(formData) {
        // This is a mock implementation
        // Replace with actual form submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success most of the time
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }
}

/**
 * Smooth Scroll for CTA Button
 */
function initSmoothScroll() {
    const ctaButton = document.querySelector('a[href="#contact-form"]');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus on first input after scroll
                setTimeout(() => {
                    const firstInput = contactForm.querySelector('input, select, textarea');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 1000);
            }
        });
    }
}

/**
 * Add error styling to form fields
 */
const style = document.createElement('style');
style.textContent = `
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
    
    .form-input.error:focus,
    .form-select.error:focus,
    .form-textarea.error:focus {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
    }
`;
document.head.appendChild(style); 

/* ==========================================================================
   Webundance Main JavaScript - Task 6.1: Core Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all core functionality
  initNavigation();
  initSmoothScroll();
  initLazyLoading();
  initFormValidationHelpers();
  initIntersectionObserver();
  
  /**
   * Navigation functionality
   */
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.getElementById('navbar-nav');
    
    // Mobile menu toggle
    if (navbarToggle && navbarNav) {
      navbarToggle.addEventListener('click', function() {
        navbarToggle.classList.toggle('active');
        navbarNav.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const expanded = navbarToggle.classList.contains('active');
        navbarToggle.setAttribute('aria-expanded', expanded);
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target)) {
          navbarToggle.classList.remove('active');
          navbarNav.classList.remove('active');
          navbarToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Close mobile menu when clicking on a link
      const navLinks = navbarNav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navbarToggle.classList.remove('active');
          navbarNav.classList.remove('active');
          navbarToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
    
    // Navbar scroll effect
    if (navbar) {
      let scrolled = false;
      
      function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50 && !scrolled) {
          navbar.classList.add('scrolled');
          scrolled = true;
        } else if (scrollTop <= 50 && scrolled) {
          navbar.classList.remove('scrolled');
          scrolled = false;
        }
      }
      
      // Throttle scroll events for performance
      let ticking = false;
      
      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(handleScroll);
          ticking = true;
          setTimeout(() => { ticking = false; }, 16); // ~60fps
        }
      }
      
      window.addEventListener('scroll', requestTick);
    }
    
    // Set active nav link
    setActiveNavLink();
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
      // Close mobile menu with Escape key
      if (e.key === 'Escape' && navbarNav && navbarNav.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbarNav.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
      
      // Handle Enter key on nav toggle
      if (e.key === 'Enter' && e.target === navbarToggle) {
        navbarToggle.click();
      }
    });
  }
  
  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just a hash
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80; // Account for fixed navbar
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without triggering scroll
          if (history.pushState) {
            history.pushState(null, null, href);
          }
          
          // Focus on target for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }
  
  /**
   * Lazy loading for images
   */
  function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Load srcset if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          // Remove lazy class and add loaded class
          img.classList.remove('lazy');
          img.classList.add('loaded');
          
          // Stop observing this image
          observer.unobserve(img);
          
          // Handle loading error
          img.addEventListener('error', function() {
            this.classList.add('error');
            console.warn('Failed to load image:', this.src);
          });
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
    
    // Add lazy loading styles
    if (!document.querySelector('style[data-lazy-loading]')) {
      const style = document.createElement('style');
      style.setAttribute('data-lazy-loading', 'true');
      style.textContent = `
        img.lazy {
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        img.loaded {
          opacity: 1;
        }
        
        img.error {
          opacity: 0.5;
          filter: grayscale(100%);
        }
        
        /* Placeholder for lazy images */
        img.lazy::before {
          content: '';
          display: block;
          background: #f1f3f4;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Basic form validation helpers
   */
  function initFormValidationHelpers() {
    // Email validation regex
    window.validateEmail = function(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    
    // Phone validation (flexible for international numbers)
    window.validatePhone = function(phone) {
      const re = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
      return re.test(phone.replace(/\s/g, ''));
    };
    
    // Required field validation
    window.validateRequired = function(value) {
      return value && value.trim().length > 0;
    };
    
    // URL validation
    window.validateURL = function(url) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };
    
    // Show field error
    window.showFieldError = function(field, message) {
      const fieldContainer = field.closest('.form-group') || field.parentElement;
      let errorElement = fieldContainer.querySelector('.form-error');
      
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        fieldContainer.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', errorElement.id || 'error-' + field.name);
    };
    
    // Clear field error
    window.clearFieldError = function(field) {
      const fieldContainer = field.closest('.form-group') || field.parentElement;
      const errorElement = fieldContainer.querySelector('.form-error');
      
      if (errorElement) {
        errorElement.textContent = '';
      }
      
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    };
    
    // Real-time validation setup for forms
    document.querySelectorAll('form').forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        // Clear errors on input
        input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            window.clearFieldError(this);
          }
        });
      });
    });
    
    // Generic field validation
    function validateField(field) {
      const value = field.value.trim();
      const type = field.type;
      const required = field.required;
      
      // Clear previous errors
      window.clearFieldError(field);
      
      // Required validation
      if (required && !window.validateRequired(value)) {
        window.showFieldError(field, 'This field is required.');
        return false;
      }
      
      // Type-specific validation
      if (value) {
        switch (type) {
          case 'email':
            if (!window.validateEmail(value)) {
              window.showFieldError(field, 'Please enter a valid email address.');
              return false;
            }
            break;
          case 'tel':
            if (!window.validatePhone(value)) {
              window.showFieldError(field, 'Please enter a valid phone number.');
              return false;
            }
            break;
          case 'url':
            if (!window.validateURL(value)) {
              window.showFieldError(field, 'Please enter a valid URL.');
              return false;
            }
            break;
        }
      }
      
      return true;
    }
  }
  
  /**
   * Intersection Observer setup for animations
   */
  function initIntersectionObserver() {
    // Create observer for animation triggers
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;
          
          setTimeout(() => {
            element.classList.add('animate-in');
            
            // Trigger custom animations based on element type
            if (element.classList.contains('stat-item')) {
              triggerStatAnimation(element);
            }
            
            if (element.classList.contains('progress-bar')) {
              triggerProgressAnimation(element);
            }
            
            // Dispatch custom event for other scripts
            element.dispatchEvent(new CustomEvent('animate-in', {
              detail: { element: element }
            }));
          }, delay);
          
          // Only animate once
          animationObserver.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements marked for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animationObserver.observe(el);
    });
    
    // Create observer for background effects
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
        } else {
          entry.target.classList.remove('in-viewport');
        }
      });
    }, {
      threshold: 0.2
    });
    
    // Observe sections with background effects
    document.querySelectorAll('.section, .hero').forEach(section => {
      backgroundObserver.observe(section);
    });
  }
  
  /**
   * Trigger stat number animation
   */
  function triggerStatAnimation(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    if (!numberElement || numberElement.dataset.animated) return;
    
    const target = parseInt(numberElement.dataset.target) || parseInt(numberElement.textContent);
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;
    
    numberElement.dataset.animated = 'true';
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOutCubic);
      
      numberElement.textContent = current;
      
      if (frame >= totalFrames) {
        clearInterval(counter);
        numberElement.textContent = target;
      }
    }, 1000 / frameRate);
  }
  
  /**
   * Trigger progress bar animation
   */
  function triggerProgressAnimation(progressElement) {
    const bar = progressElement.querySelector('.progress-fill');
    if (!bar || bar.dataset.animated) return;
    
    const target = parseInt(progressElement.dataset.progress) || 100;
    bar.dataset.animated = 'true';
    
    setTimeout(() => {
      bar.style.width = target + '%';
    }, 100);
  }
  
  /**
   * Set active navigation link
   */
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');
      
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === '/') ||
          (currentPage === 'index.html' && linkHref === '/')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  
  // Utility functions
  window.WebundanceUtils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
      let timeout;
      return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  };
  
}); 

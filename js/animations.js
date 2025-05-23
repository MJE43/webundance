/* ==========================================================================
   Webundance Animations JavaScript - Task 4.2 & 4.3
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        
        setTimeout(() => {
          entry.target.classList.add('animate-in');
          
          // Trigger number counter for stat cards
          if (entry.target.classList.contains('stat-card')) {
            animateStatNumber(entry.target);
          }
        }, delay);
        
        // Only animate once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Number counter animation for stats
  function animateStatNumber(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    if (!numberElement) return;
    
    const target = parseInt(numberElement.dataset.target);
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Use easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOutCubic);
      
      numberElement.textContent = current;
      
      if (frame >= totalFrames) {
        clearInterval(counter);
        numberElement.textContent = target;
      }
    }, 1000 / frameRate);
  }

  // Add CSS classes for animations if not already defined
  if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
      }
      
      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        .animate-on-scroll {
          opacity: 1;
          transform: none;
          transition: none;
        }
        
        .browser-mockup,
        .floating-element,
        .mockup-element {
          animation: none !important;
        }
      }
      
      /* Additional hover animations for service cards */
      .service-card {
        position: relative;
        overflow: hidden;
      }
      
      .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent);
        transition: left 0.6s ease;
      }
      
      .service-card:hover::before {
        left: 100%;
      }
      
      /* Enhanced stat card animations */
      .stat-card {
        position: relative;
        overflow: hidden;
      }
      
      .stat-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--primary);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }
      
      .stat-card:hover::after {
        transform: scaleX(1);
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced hover effects for cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Parallax effect for floating elements (subtle)
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  function requestParallaxTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Only add parallax on non-mobile devices
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestParallaxTick);
  }

}); 

/* ==========================================================================
   Webundance Animations JavaScript - Task 6.2: Animation Controllers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

  // Initialize all animation systems
  initScrollAnimations();
  initStaggerAnimations();
  initProgressBarAnimations();
  initParallaxEffects();
  initHoverAnimations();
  initPerformanceOptimizations();
  initAdvancedMicroInteractions();

  /**
   * Main scroll-triggered animations
   */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          
          setTimeout(() => {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations
            if (entry.target.classList.contains('stat-card')) {
              animateStatNumber(entry.target);
            } else if (entry.target.classList.contains('progress-bar')) {
              const percentage = entry.target.dataset.percentage || 100;
              animateProgressBar(entry.target, percentage);
            }
          }, delay);
          
          // Only animate once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Staggered animations for lists and grids
   */
  function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    staggerContainers.forEach(container => {
      const children = container.children;
      const staggerType = container.dataset.stagger || 'fade-up';
      const staggerDelay = parseInt(container.dataset.staggerDelay) || 100;
      
      Array.from(children).forEach((child, index) => {
        child.classList.add('stagger-item', `stagger-${staggerType}`);
        child.dataset.staggerIndex = index;
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('stagger-animate-in');
              }, index * staggerDelay);
            });
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(container);
    });
  }

  /**
   * Progress bar animations
   */
  function initProgressBarAnimations() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      if (!bar.querySelector('.progress-fill')) {
        createProgressFill(bar);
      }
    });
  }

  /**
   * Parallax effects for decorative elements
   */
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0 || window.innerWidth <= 768) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    }
    
    function requestParallaxTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestParallaxTick, { passive: true });
  }

  /**
   * Enhanced hover animations for interactive elements
   */
  function initHoverAnimations() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
      
      // Add ripple effect on click
      button.addEventListener('click', function(e) {
        if (!this.disabled) {
          createAdvancedRippleEffect(this, e);
        }
      });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  /**
   * Performance optimizations for smooth animations
   */
  function initPerformanceOptimizations() {
    // Use will-change for frequently animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .card, .btn');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
    });

    // Clean up will-change after animations complete
    setTimeout(() => {
      animatedElements.forEach(el => {
        el.style.willChange = 'auto';
      });
    }, 3000);

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        // Scroll-based optimizations
      }, 16); // ~60fps
    }, { passive: true });
  }

  /**
   * Advanced Micro-Interactions System
   */
  function initAdvancedMicroInteractions() {
    // Initialize all micro-interaction systems
    initButtonMicroInteractions();
    initFormFieldAnimations();
    initNavigationAnimations();
    initSmartHoverEffects();
    initTouchOptimizedInteractions();
    initAdvancedScrollEffects();
  }

  /**
   * Sophisticated Button Micro-Interactions
   */
  function initButtonMicroInteractions() {
    const buttons = document.querySelectorAll('.btn, .navbar-link, .footer-link');
    
    buttons.forEach(button => {
      // Add sophisticated hover states
      button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('btn-primary') && !this.classList.contains('btn-secondary')) {
          // Ghost buttons and links get subtle effects
          this.style.transform = 'translateY(-1px)';
          this.style.filter = 'brightness(1.1)';
        } else {
          // Primary/Secondary buttons get more pronounced effects
          this.style.transform = 'translateY(-3px) scale(1.05)';
          this.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.25)';
          this.style.filter = 'brightness(1.1) saturate(1.1)';
        }
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.filter = '';
      });
      
      // Enhanced click feedback with loading states
      button.addEventListener('click', function(e) {
        if (!this.disabled && !this.classList.contains('loading')) {
          createAdvancedRippleEffect(this, e);
          
          // Add subtle loading state for form submissions
          if (this.type === 'submit' || this.getAttribute('href')?.includes('contact')) {
            addLoadingState(this);
          }
        }
      });
    });
  }

  /**
   * Form Field Micro-Interactions
   */
  function initFormFieldAnimations() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Focus animations
      input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        animateLabel(this, 'focus');
      });
      
      input.addEventListener('blur', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        animateLabel(this, 'blur');
      });
      
      // Typing feedback
      input.addEventListener('input', function() {
        if (this.value.length > 0) {
          this.classList.add('has-content');
        } else {
          this.classList.remove('has-content');
        }
      });
    });
  }

  /**
   * Smart Navigation Animations
   */
  function initNavigationAnimations() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-link');
    let lastScrollY = window.scrollY;
    
    // Smart navbar visibility
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.classList.add('navbar-scrolled');
        if (currentScrollY > lastScrollY) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
    
    // Enhanced nav link animations
    navLinks.forEach((link, index) => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.color = 'var(--primary)';
        createUnderlineEffect(this);
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.color = '';
        removeUnderlineEffect(this);
      });
    });
  }

  /**
   * Smart Hover Effects Based on Element Type
   */
  function initSmartHoverEffects() {
    // Service cards get specialized hover animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.03)';
        this.querySelector('.card-icon')?.style.transform = 'scale(1.2) rotate(5deg)';
        animateServiceIcon(this);
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.querySelector('.card-icon')?.style.transform = '';
      });
    });
    
    // Testimonial cards get subtle personal touches
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        pulseAvatar(this.querySelector('.author-avatar'));
        highlightStars(this.querySelector('.testimonial-stars'));
      });
    });
    
    // Process steps get progressive reveals
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
      step.addEventListener('mouseenter', function() {
        highlightProcessConnection(index);
      });
      
      step.addEventListener('mouseleave', function() {
        resetProcessConnection();
      });
    });
  }

  /**
   * Touch-Optimized Interactions for Mobile
   */
  function initTouchOptimizedInteractions() {
    if ('ontouchstart' in window) {
      const touchElements = document.querySelectorAll('.btn, .card, .navbar-link');
      
      touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
          this.classList.add('touch-feedback');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
          setTimeout(() => {
            this.classList.remove('touch-feedback');
          }, 150);
        }, { passive: true });
      });
    }
  }

  /**
   * Advanced Scroll-Based Effects
   */
  function initAdvancedScrollEffects() {
    let ticking = false;
    const scrollElements = document.querySelectorAll('[data-scroll-effect]');
    
    function updateScrollEffects() {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      scrollElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const effectType = element.dataset.scrollEffect;
        
        // Calculate visibility percentage
        const visibilityStart = elementTop - windowHeight;
        const visibilityEnd = elementTop + elementHeight;
        const progress = Math.max(0, Math.min(1, (scrolled - visibilityStart) / (visibilityEnd - visibilityStart)));
        
        applyScrollEffect(element, effectType, progress);
      });
      
      ticking = false;
    }
    
    function requestScrollTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestScrollTick, { passive: true });
  }

  // Advanced animation helper functions
  function animateStatNumber(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    if (!numberElement || numberElement.dataset.animated) return;
    
    const target = parseInt(numberElement.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOutCubic);
      
      numberElement.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        numberElement.textContent = target;
        numberElement.dataset.animated = 'true';
      }
    }
    
    requestAnimationFrame(animate);
  }

  function animateProgressBar(progressBar, percentage, duration = 1000) {
    const fill = progressBar.querySelector('.progress-fill') || createProgressFill(progressBar);
    const startTime = performance.now();
    
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentWidth = percentage * easeOutCubic;
      
      fill.style.width = `${currentWidth}%`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  function triggerCustomAnimation(element, type) {
    if (element && !element.classList.contains(`animate-${type}`)) {
        element.classList.add(`animate-${type}`);
    }
  }

  function createAdvancedRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'advanced-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: advancedRipple 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 800);
  }

  function addLoadingState(button) {
    if (button.classList.contains('loading')) return;
    
    button.classList.add('loading');
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    
    // Remove loading state after animation (for demo purposes)
    setTimeout(() => {
      button.classList.remove('loading');
      button.textContent = originalText;
    }, 2000);
  }

  function animateLabel(input, state) {
    const label = input.previousElementSibling;
    if (!label || label.tagName !== 'LABEL') return;
    
    if (state === 'focus') {
      label.style.transform = 'translateY(-5px) scale(0.85)';
      label.style.color = 'var(--primary)';
    } else if (state === 'blur' && !input.value) {
      label.style.transform = '';
      label.style.color = '';
    }
  }

  function createUnderlineEffect(link) {
    const underline = document.createElement('div');
    underline.className = 'hover-underline';
    underline.style.cssText = `
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      width: 100%;
      background: var(--primary);
      transform: scaleX(0);
      transform-origin: left;
      animation: expandUnderline 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;
    
    link.style.position = 'relative';
    link.appendChild(underline);
  }

  function removeUnderlineEffect(link) {
    const underline = link.querySelector('.hover-underline');
    if (underline) {
      underline.style.animation = 'contractUnderline 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      setTimeout(() => underline.remove(), 300);
    }
  }

  function animateServiceIcon(card) {
    const icon = card.querySelector('.service-icon, .card-icon');
    if (icon) {
      icon.style.animation = 'iconBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => {
        icon.style.animation = '';
      }, 600);
    }
  }

  function pulseAvatar(avatar) {
    if (avatar) {
      avatar.style.animation = 'avatarPulse 0.6s ease-in-out';
      setTimeout(() => {
        avatar.style.animation = '';
      }, 600);
    }
  }

  function highlightStars(starsContainer) {
    if (!starsContainer) return;
    
    const stars = starsContainer.querySelectorAll('.star');
    stars.forEach((star, index) => {
      setTimeout(() => {
        star.style.animation = 'starTwinkle 0.4s ease-in-out';
        setTimeout(() => {
          star.style.animation = '';
        }, 400);
      }, index * 50);
    });
  }

  function highlightProcessConnection(index) {
    const timeline = document.querySelector('.process-timeline');
    if (timeline) {
      timeline.classList.add(`highlight-step-${index}`);
    }
  }

  function resetProcessConnection() {
    const timeline = document.querySelector('.process-timeline');
    if (timeline) {
      timeline.className = timeline.className.replace(/highlight-step-\d+/g, '');
    }
  }

  function applyScrollEffect(element, effectType, progress) {
    switch (effectType) {
      case 'parallax':
        const speed = parseFloat(element.dataset.speed) || 0.5;
        element.style.transform = `translateY(${-progress * 100 * speed}px)`;
        break;
      case 'fade':
        element.style.opacity = progress;
        break;
      case 'scale':
        const scale = 0.8 + (progress * 0.2);
        element.style.transform = `scale(${scale})`;
        break;
      case 'slide':
        const direction = element.dataset.direction || 'up';
        const distance = 50;
        let transform = '';
        switch (direction) {
          case 'up':
            transform = `translateY(${distance * (1 - progress)}px)`;
            break;
          case 'left':
            transform = `translateX(${-distance * (1 - progress)}px)`;
            break;
          case 'right':
            transform = `translateX(${distance * (1 - progress)}px)`;
            break;
        }
        element.style.transform = transform;
        element.style.opacity = progress;
        break;
    }
  }

  function createProgressFill(progressBar) {
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.cssText = `
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      border-radius: inherit;
      width: 0%;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    `;
    progressBar.appendChild(fill);
    return fill;
  }

  // Add enhanced CSS animations if not already present
  if (!document.querySelector('style[data-webundance-micro-interactions]')) {
    const style = document.createElement('style');
    style.setAttribute('data-webundance-micro-interactions', 'true');
    style.textContent = `
      /* Advanced Micro-Interaction Styles */
      
      /* Base animation classes */
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
      }

      /* Enhanced Button States */
      .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, box-shadow, filter;
      }

      .btn.loading {
        pointer-events: none;
        opacity: 0.7;
      }

      .btn.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: buttonSpinner 1s linear infinite;
      }

      /* Touch Feedback */
      .touch-feedback {
        background-color: rgba(0, 0, 0, 0.1) !important;
        transform: scale(0.98) !important;
      }

      /* Enhanced Form Field States */
      input, textarea, select {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, box-shadow;
      }

      input.has-content + label,
      textarea.has-content + label {
        transform: translateY(-5px) scale(0.85);
        color: var(--primary);
      }

      /* Navbar Enhancements */
      .navbar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
      }

      .navbar-scrolled {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      }

      /* Stagger animation base */
      .stagger-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .stagger-item.stagger-animate-in {
        opacity: 1;
        transform: translateY(0);
      }

      /* Advanced Keyframe Animations */
      @keyframes advancedRipple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        50% {
          transform: scale(0.5);
          opacity: 0.6;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }

      @keyframes buttonSpinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes expandUnderline {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }

      @keyframes contractUnderline {
        0% { transform: scaleX(1); }
        100% { transform: scaleX(0); }
      }

      @keyframes iconBounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-2deg); }
      }

      @keyframes avatarPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
      }

      @keyframes starTwinkle {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(10deg); filter: brightness(1.3); }
      }

      /* Progress bar styles */
      .progress-bar {
        width: 100%;
        height: 8px;
        background: var(--bg-gray);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        border-radius: inherit;
        width: 0%;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }

      .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      /* Hover effects */
      .hover-lift {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .hover-lift:hover {
        transform: translateY(-5px);
      }

      /* Respect reduced motion preferences */
      @media (prefers-reduced-motion: reduce) {
        .animate-on-scroll,
        .stagger-item,
        .floating-element,
        .mockup-element,
        [data-parallax],
        .btn,
        input,
        textarea,
        select,
        .navbar {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
        
        .browser-mockup,
        .floating-element {
          animation: none !important;
        }
      }

      /* Performance optimizations */
      .card,
      .service-card,
      .testimonial-card,
      .btn,
      .navbar-link {
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .btn {
          border: 2px solid currentColor;
        }
        
        .progress-fill {
          background: currentColor;
        }
        
        .hover-underline {
          background: currentColor;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Export animation functions for external use
  window.WebundanceAnimations = {
    animateStatNumber,
    animateProgressBar,
    triggerCustomAnimation,
    createAdvancedRippleEffect,
    addLoadingState,
    initAdvancedMicroInteractions
  };

}); 

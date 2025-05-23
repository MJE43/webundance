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
          const element = entry.target;
          const delay = parseInt(element.dataset.delay) || 0;
          
          setTimeout(() => {
            element.classList.add('animate-in');
            
            // Trigger number counter for stat cards
            if (element.classList.contains('stat-card') || element.classList.contains('stat-item')) {
              animateStatNumber(element);
            }

            // Trigger custom animations based on data attributes
            const animationType = element.dataset.animation;
            if (animationType) {
              triggerCustomAnimation(element, animationType);
            }

            // Dispatch custom event for external listeners
            element.dispatchEvent(new CustomEvent('webundance:animate-in', {
              detail: { element, delay }
            }));
          }, delay);
          
          // Only animate once unless specified otherwise
          if (!element.dataset.repeatAnimation) {
            observer.unobserve(element);
          }
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Stagger animations for grid items
   */
  function initStaggerAnimations() {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const items = container.querySelectorAll('.stagger-item, .card, .service-card, .testimonial-card, .case-study');
          const staggerDelay = parseInt(container.dataset.staggerDelay) || 100;
          const maxDelay = parseInt(container.dataset.maxDelay) || 1000;
          
          items.forEach((item, index) => {
            const delay = Math.min(index * staggerDelay, maxDelay);
            
            setTimeout(() => {
              item.classList.add('stagger-animate-in');
              
              // Add entrance animation based on type
              const animationType = container.dataset.staggerType || 'fade-up';
              item.classList.add(`stagger-${animationType}`);
            }, delay);
          });
          
          staggerObserver.unobserve(container);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    // Observe containers marked for stagger animation
    document.querySelectorAll('.stagger-container, .services-grid, .testimonials-grid, .stats-grid').forEach(container => {
      staggerObserver.observe(container);
    });
  }

  /**
   * Progress bar animations
   */
  function initProgressBarAnimations() {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressContainer = entry.target;
          const progressBars = progressContainer.querySelectorAll('.progress-bar');
          
          progressBars.forEach((bar, index) => {
            const delay = index * 200;
            const percentage = parseInt(bar.dataset.percentage) || 100;
            const duration = parseInt(bar.dataset.duration) || 2000;
            
            setTimeout(() => {
              animateProgressBar(bar, percentage, duration);
            }, delay);
          });
          
          progressObserver.unobserve(progressContainer);
        }
      });
    }, {
      threshold: 0.3
    });

    document.querySelectorAll('.progress-container, .skills-section').forEach(container => {
      progressObserver.observe(container);
    });
  }

  /**
   * Enhanced parallax effects
   */
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    // Only enable parallax on non-mobile devices for performance
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    let ticking = false;
    let scrollY = window.pageYOffset;

    function updateParallax() {
      parallaxElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const direction = element.dataset.parallaxDirection || 'vertical';
        const maxOffset = parseInt(element.dataset.parallaxMax) || 100;
        
        // Only animate if element is in or near viewport
        if (rect.bottom >= -200 && rect.top <= window.innerHeight + 200) {
          const elementTop = element.getBoundingClientRect().top + scrollY;
          const elementSpeed = (scrollY - elementTop) * speed;
          const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, elementSpeed));
          
          if (direction === 'horizontal') {
            element.style.transform = `translateX(${clampedOffset}px)`;
          } else {
            element.style.transform = `translateY(${clampedOffset}px)`;
          }
        }
      });
      
      ticking = false;
    }

    function requestParallaxTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Throttled scroll handler
    window.addEventListener('scroll', WebundanceUtils.throttle(() => {
      scrollY = window.pageYOffset;
      requestParallaxTick();
    }, 16));

    // Handle resize
    window.addEventListener('resize', WebundanceUtils.debounce(() => {
      if (window.innerWidth <= 768) {
        // Reset transforms on mobile
        parallaxElements.forEach(el => {
          el.style.transform = '';
        });
      }
    }, 250));
  }

  /**
   * Enhanced hover animations
   */
  function initHoverAnimations() {
    // Enhanced card hover effects
    document.querySelectorAll('.card, .service-card, .testimonial-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        const intensity = this.dataset.hoverIntensity || '1';
        const scale = 1 + (0.02 * intensity);
        const translateY = -5 * intensity;
        
        this.style.transform = `translateY(${translateY}px) scale(${scale})`;
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Button hover effects with ripple
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
          createRippleEffect(this, e);
        }
      });
    });

    // Image hover effects
    document.querySelectorAll('.hover-zoom').forEach(img => {
      img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }

  /**
   * Performance optimizations
   */
  function initPerformanceOptimizations() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Disable all animations
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
      return;
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
      const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animate"]');
      
      if (document.hidden) {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'paused';
        });
      } else {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'running';
        });
      }
    });
  }

  /**
   * Number counter animation for stats
   */
  function animateStatNumber(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    if (!numberElement || numberElement.dataset.animated) return;
    
    const targetText = numberElement.textContent.trim();
    const target = parseInt(targetText.replace(/[^\d]/g, ''));
    const suffix = targetText.replace(/[\d]/g, '');
    const duration = parseInt(statCard.dataset.duration) || 2000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;
    
    numberElement.dataset.animated = 'true';
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * easeOutQuart);
      
      numberElement.textContent = current + suffix;
      
      if (frame >= totalFrames) {
        clearInterval(counter);
        numberElement.textContent = targetText;
      }
    }, 1000 / frameRate);
  }

  /**
   * Progress bar animation
   */
  function animateProgressBar(progressBar, percentage, duration) {
    if (progressBar.dataset.animated) return;
    
    const fill = progressBar.querySelector('.progress-fill') || createProgressFill(progressBar);
    const label = progressBar.querySelector('.progress-label');
    
    progressBar.dataset.animated = 'true';
    
    let current = 0;
    const increment = percentage / (duration / 16);
    
    const animate = () => {
      current += increment;
      
      if (current >= percentage) {
        current = percentage;
      }
      
      fill.style.width = current + '%';
      fill.style.transition = 'width 0.1s ease';
      
      if (label) {
        label.textContent = Math.round(current) + '%';
      }
      
      if (current < percentage) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * Custom animation triggers
   */
  function triggerCustomAnimation(element, type) {
    switch (type) {
      case 'bounce':
        element.style.animation = 'bounce 0.6s ease-out';
        break;
      case 'pulse':
        element.style.animation = 'pulse 1s ease-in-out';
        break;
      case 'shake':
        element.style.animation = 'shake 0.5s ease-in-out';
        break;
      case 'flip':
        element.style.animation = 'flip 0.8s ease-in-out';
        break;
      case 'zoom':
        element.style.animation = 'zoomIn 0.5s ease-out';
        break;
      default:
        element.classList.add(`animate-${type}`);
    }
  }

  /**
   * Create ripple effect for buttons
   */
  function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  /**
   * Create progress fill element if it doesn't exist
   */
  function createProgressFill(progressBar) {
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.cssText = `
      height: 100%;
      background: var(--primary);
      border-radius: inherit;
      width: 0%;
      transition: width 0.3s ease;
    `;
    progressBar.appendChild(fill);
    return fill;
  }

  // Add CSS animations if not already present
  if (!document.querySelector('style[data-webundance-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-webundance-animations', 'true');
    style.textContent = `
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

      /* Stagger animation types */
      .stagger-fade-up.stagger-animate-in {
        transform: translateY(0);
      }

      .stagger-fade-left.stagger-animate-in {
        transform: translateX(0);
      }

      .stagger-fade-right.stagger-animate-in {
        transform: translateX(0);
      }

      .stagger-fade-left {
        transform: translateX(-20px);
      }

      .stagger-fade-right {
        transform: translateX(20px);
      }

      .stagger-scale {
        transform: scale(0.9);
      }

      .stagger-scale.stagger-animate-in {
        transform: scale(1);
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
        transition: width 0.3s ease;
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

      /* Keyframe animations */
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-15px); }
        70% { transform: translateY(-7px); }
        90% { transform: translateY(-3px); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }

      @keyframes flip {
        0% { transform: rotateY(0); }
        50% { transform: rotateY(-90deg); }
        100% { transform: rotateY(0); }
      }

      @keyframes zoomIn {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }

      /* Parallax base styles */
      [data-parallax] {
        will-change: transform;
      }

      /* Hover effects */
      .hover-lift {
        transition: transform 0.3s ease;
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
        [data-parallax] {
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
      .testimonial-card {
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
      }
    `;
    document.head.appendChild(style);
  }

  // Export animation functions for external use
  window.WebundanceAnimations = {
    animateStatNumber,
    animateProgressBar,
    triggerCustomAnimation,
    createRippleEffect
  };

}); 

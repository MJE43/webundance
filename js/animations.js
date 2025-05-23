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

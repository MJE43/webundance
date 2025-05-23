/* ==========================================================================
   Webundance Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // Navigation functionality
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarNav = document.getElementById('navbar-nav');
  
  // Mobile menu toggle
  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navbar.contains(event.target)) {
        navbarToggle.classList.remove('active');
        navbarNav.classList.remove('active');
      }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navbarNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarNav.classList.remove('active');
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
  
  // Smooth scroll for anchor links
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
      }
    });
  });
  
  // Add active class to current page nav link
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === '/') ||
          (currentPage === 'index.html' && linkHref === '/')) {
        link.classList.add('active');
      }
    });
  }
  
  setActiveNavLink();
  
  // Keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navbarNav && navbarNav.classList.contains('active')) {
      navbarToggle.classList.remove('active');
      navbarNav.classList.remove('active');
    }
  });
  
}); 

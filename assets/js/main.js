// KHJ Transcriptions - Interactive Elements
// Modern, professional JavaScript for smooth user experience

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(30, 58, 95, 0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
  });
  
  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal anchors
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ============================================
  // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
  });
  
  // ============================================
  // CARD HOVER EFFECTS
  // ============================================
  const cards = document.querySelectorAll('.card, .feature');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
  
  // ============================================
  // EMAIL LINK FORMATTING
  // ============================================
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add a subtle animation on click
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });
  
  // ============================================
  // ACTIVE MENU STATE
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('.menu a');
  
  menuLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      // Cleanup
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // ============================================
  // PERFORMANCE: LAZY LOAD BACKGROUND IMAGES
  // ============================================
  const lazyBackgrounds = document.querySelectorAll('.media-panel, .card-img');
  
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        bgObserver.unobserve(entry.target);
      }
    });
  });
  
  lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
  
  // ============================================
  // FORM VALIDATION (if forms exist)
  // ============================================
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc2626';
          
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        
        // Show error message
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'Please fill in all required fields';
        errorMsg.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: #dc2626;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          z-index: 9999;
        `;
        
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
          errorMsg.style.opacity = '0';
          errorMsg.style.transition = 'opacity 0.3s';
          setTimeout(() => errorMsg.remove(), 300);
        }, 3000);
      }
    });
  });
  
  // ============================================
  // CONSOLE BRANDING
  // ============================================
  console.log('%c KHJ Transcriptions ', 'background: #1e3a5f; color: #fff; padding: 8px 16px; font-size: 14px; font-weight: bold; border-radius: 4px;');
  console.log('%c Professional Insurance Billing Solutions ', 'color: #8b3a3a; font-size: 12px; font-weight: 600;');
  
});

// ============================================
// CSS FOR RIPPLE EFFECT
// ============================================
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .loaded {
    opacity: 1 !important;
  }
`;
document.head.appendChild(style);
/**
 * PSP Ventures - Main Redesigned JavaScript (Lovable Edition)
 * Author: Antigravity Code Assistant
 * Core interactive scripts: navigation, scroll reveals, stats animation, background particles, form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveals();
  initStatsCounter();
  initBackgroundParticles();
  initContactForm();
});

/* ==========================================================================
   Navigation Behavior
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active Link State based on scroll position
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

/* ==========================================================================
   Statistics Increment Counter on Scroll
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(stat => {
    countObserver.observe(stat);
  });

  function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const isDecimal = element.getAttribute('data-decimal') === 'true';
    let current = 0;
    const duration = 1800; // 1.8 seconds
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      current += increment;
      stepCount++;

      if (stepCount >= steps) {
        clearInterval(timer);
        element.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
      } else {
        element.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      }
    }, stepTime);
  }
}

/* ==========================================================================
   Dynamic Floating Particles Generator
   ========================================================================== */
function initBackgroundParticles() {
  const targetContainers = document.querySelectorAll('.particle-target');
  if (targetContainers.length === 0) return;

  targetContainers.forEach(container => {
    // Check if container contains particles overlay already
    let overlay = container.querySelector('.particles-overlay-container');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'particles-overlay-container';
      container.appendChild(overlay);
    }

    const numParticles = 25;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-item';
      
      // Random coordinates, sizes, delays and translations
      const size = Math.random() * 4 + 2; // 2px to 6px
      const left = Math.random() * 100;
      const bottom = Math.random() * 40; // start near bottom
      const delay = Math.random() * 8; // 0s to 8s
      const duration = Math.random() * 6 + 6; // 6s to 12s
      
      // Alternate colors: Neon Green (#7CFF00) and Neon Cyan (#00E5FF)
      const color = Math.random() > 0.5 ? '#7CFF00' : '#00E5FF';

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.bottom = `${bottom}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}`;

      overlay.appendChild(particle);
    }
  });
}

/* ==========================================================================
   Contact & Partnership Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form') || document.getElementById('partnership-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusContainer = document.createElement('div');
  statusContainer.className = 'form-status';
  statusContainer.style.marginTop = '1.5rem';
  statusContainer.style.fontSize = '0.95rem';
  statusContainer.style.borderRadius = '24px'; // match capsule styling
  statusContainer.style.padding = '0.85rem 1.25rem';
  statusContainer.style.display = 'none';
  statusContainer.style.transition = 'all 0.3s ease';
  
  form.appendChild(statusContainer);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    statusContainer.style.display = 'none';
    statusContainer.textContent = '';
    
    let hasError = false;
    let errorMsg = '';

    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    // 1. Validate Name
    if (nameInput && nameInput.value.trim() === '') {
      hasError = true;
      nameInput.style.borderColor = 'rgba(255, 0, 0, 0.4)';
      errorMsg = 'Please enter your name.';
    } else if (nameInput) {
      nameInput.style.borderColor = '';
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
      hasError = true;
      emailInput.style.borderColor = 'rgba(255, 0, 0, 0.4)';
      if (!errorMsg) errorMsg = 'Please enter a valid email address.';
    } else if (emailInput) {
      emailInput.style.borderColor = '';
    }

    // 3. Validate Message
    if (messageInput && messageInput.value.trim().length < 10) {
      hasError = true;
      messageInput.style.borderColor = 'rgba(255, 0, 0, 0.4)';
      if (!errorMsg) errorMsg = 'Message details must be at least 10 characters long.';
    } else if (messageInput) {
      messageInput.style.borderColor = '';
    }

    if (hasError) {
      statusContainer.style.display = 'block';
      statusContainer.style.background = 'rgba(255, 0, 0, 0.1)';
      statusContainer.style.border = '1px solid rgba(255, 0, 0, 0.25)';
      statusContainer.style.color = '#FF4A4A';
      statusContainer.textContent = errorMsg;
      return;
    }

    // Simulate sending message
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting... <svg class="spinner" viewBox="0 0 50 50" style="animation: spin 1s linear infinite; width: 18px; height: 18px; margin-left: 5px;"><circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="80, 200"></circle></svg>';
      
      if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }

      setTimeout(() => {
        statusContainer.style.display = 'block';
        statusContainer.style.background = 'rgba(124, 255, 0, 0.08)';
        statusContainer.style.border = '1px solid rgba(124, 255, 0, 0.2)';
        statusContainer.style.color = 'var(--primary-accent)';
        statusContainer.textContent = 'Inquiry submitted successfully! We will contact you shortly.';
        
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        setTimeout(() => {
          statusContainer.style.display = 'none';
        }, 5000);
      }, 1500);
    }
  });
}

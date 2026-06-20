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
    // Remove existing DOM overlay if present
    const oldOverlay = container.querySelector('.particles-overlay-container');
    if (oldOverlay) oldOverlay.remove();

    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let width = 0;
    let height = 0;
    const particles = [];
    const maxParticles = container.id === 'hero' ? 120 : 60;

    function resize() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.15), // upward drift
        radius: Math.random() * 1.5 + 0.75, // 0.75px to 2.25px
        alpha: Math.random() * 0.4 + 0.1,
        targetAlpha: Math.random() * 0.4 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        color: Math.random() > 0.5 ? 'rgba(124, 255, 0, ' : 'rgba(0, 229, 255, ' // Neon Green / Cyan
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Update physics
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        // Random fade calculation
        if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
          p.targetAlpha = Math.random() * 0.45 + 0.05;
        }
        p.alpha += (p.targetAlpha - p.alpha) * p.fadeSpeed;

        // Draw particle core
        ctx.beginPath();
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer soft glow
        ctx.beginPath();
        ctx.fillStyle = p.color + (p.alpha * 0.25) + ')';
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Performance optimization: only draw when inside the viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationFrameId) animate();
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0.01 });

    observer.observe(container);
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

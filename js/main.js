/**
 * PSP Ventures - Main JavaScript
 * Author: Antigravity Code Assistant
 * Core interactive scripts: navigation, scroll reveals, canvas particles, form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveals();
  initHeroCanvas();
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
      
      // Toggle body overflow to prevent scroll behind menu
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
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
      const sectionTop = current.offsetTop - 120;
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
        // Once visible, stop observing to improve performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

/* ==========================================================================
   Interactive Hero Canvas Particles
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let mouse = {
    x: null,
    y: null,
    radius: 120
  };

  // Resize canvas to match hero section
  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Capture mouse move in hero area
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.baseColor = 'rgba(0, 217, 255, 0.4)'; // secondary-accent-like cyan
      this.color = this.baseColor;
    }

    update() {
      // Bounds collision checking
      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse proximity interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Attract particles slightly to mouse
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
          this.color = 'rgba(0, 245, 160, 0.8)'; // transition to primary-accent green
        } else {
          this.color = this.baseColor;
        }
      } else {
        this.color = this.baseColor;
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate particles
  const numberOfParticles = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }

  // Draw lines connecting points
  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          opacityValue = 1 - (distance / 110);
          ctx.strokeStyle = `rgba(123, 97, 255, ${opacityValue * 0.15})`; // subtle purple lines
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* ==========================================================================
   Contact Form Validation & Client Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form') || document.getElementById('partnership-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusContainer = document.createElement('div');
  statusContainer.className = 'form-status';
  statusContainer.style.marginTop = '1.5rem';
  statusContainer.style.fontSize = '0.95rem';
  statusContainer.style.borderRadius = 'var(--border-radius-sm)';
  statusContainer.style.padding = '0.75rem 1rem';
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

    // Field references
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
      if (!errorMsg) errorMsg = 'Message must be at least 10 characters long.';
    } else if (messageInput) {
      messageInput.style.borderColor = '';
    }

    // Handle feedback output
    if (hasError) {
      statusContainer.style.display = 'block';
      statusContainer.style.background = 'rgba(255, 0, 0, 0.1)';
      statusContainer.style.border = '1px solid rgba(255, 0, 0, 0.2)';
      statusContainer.style.color = '#FF4A4A';
      statusContainer.textContent = errorMsg;
      return;
    }

    // Simulate sending message (mock success)
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message... <svg class="spinner" viewBox="0 0 50 50" style="animation: spin 1s linear infinite; width: 18px; height: 18px; margin-left: 5px;"><circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="80, 200"></circle></svg>';
      
      // Inject CSS spinner styles if not present
      if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }

      setTimeout(() => {
        // Success feedback
        statusContainer.style.display = 'block';
        statusContainer.style.background = 'rgba(0, 245, 160, 0.1)';
        statusContainer.style.border = '1px solid rgba(0, 245, 160, 0.2)';
        statusContainer.style.color = 'var(--primary-accent)';
        statusContainer.textContent = 'Message sent successfully! We will get in touch with you soon.';
        
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          statusContainer.style.fadeOut = 'slow';
          setTimeout(() => {
            statusContainer.style.display = 'none';
          }, 300);
        }, 5000);
      }, 1500);
    }
  });
}

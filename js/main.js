/**
 * PSP Ventures - Main Redesigned JavaScript (Lovable Edition)
 * Author: Antigravity Code Assistant
 * Core interactive scripts: navigation, scroll reveals, stats animation, background particles, form validation
 */

// Parallax coordinates shared globally
let targetParallaxX = 0;
let targetParallaxY = 0;
let currentParallaxX = 0;
let currentParallaxY = 0;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveals();
  initStatsCounter();
  initBackgroundParticles();
  initHologramParticles();
  initHeroParallax();
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
  const canvas = document.createElement('canvas');
  canvas.className = 'global-particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let width = 0;
  let height = 0;
  const particles = [];
  const maxParticles = 250;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
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

      // Calculate dynamic rendering coordinates with mouse parallax offset
      let renderX = p.x;
      let renderY = p.y;
      
      // Global parallax
      if (typeof currentParallaxX !== 'undefined' && typeof currentParallaxY !== 'undefined') {
        renderX -= currentParallaxX * 0.35;
        renderY -= currentParallaxY * 0.35;
      }

      // Draw particle core
      ctx.beginPath();
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer soft glow
      ctx.beginPath();
      ctx.fillStyle = p.color + (p.alpha * 0.25) + ')';
      ctx.arc(renderX, renderY, p.radius * 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(animate);
  }
  
  animate();
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

/* ==========================================================================
   Hologram Projection Particle System
   ========================================================================== */
function initHologramParticles() {
  const canvas = document.querySelector('.hologram-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const particles = [];
  const maxParticles = 720; // Reduced density by 20% to keep logo as primary focus

  let platformOffsetY = 360;
  let maxOrbitDistance = 530;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Read dynamic CSS variables
    const wrapper = canvas.closest('.hologram-wrapper');
    if (wrapper) {
      const wrapperStyles = window.getComputedStyle(wrapper);
      const rawOffset = wrapperStyles.getPropertyValue('--platform-offset-y');
      if (rawOffset.includes('%')) {
        platformOffsetY = (parseFloat(rawOffset) / 100) * height;
      } else {
        platformOffsetY = parseFloat(rawOffset) || 360;
      }
      maxOrbitDistance = width * 0.38; // cluster orbiting particles within 38% of canvas width
    }
  }

  resize();
  window.addEventListener('resize', resize);

  // Helper to create a particle centered around the logo or rising from the platform
  function createParticle(randomInit = false, forceType = null) {
    const type = forceType || (Math.random() < 0.35 ? 'rise' : 'orbit');
    const radius = Math.random() * 1.2 + 0.35; // tiny particles
    const centerX = width / 2;
    const centerY = height * 0.5 + 40; // Centered exactly at the shifted logo position

    if (type === 'orbit') {
      // Polar coordinates centered around the logo
      const angle = Math.random() * Math.PI * 2;
      // We want the particles clustered closely around the logo boundaries
      const distance = randomInit ? (Math.pow(Math.random(), 1.2) * maxOrbitDistance) : (Math.random() * (maxOrbitDistance * 0.2) + (maxOrbitDistance * 0.05)); 
      
      // Twinkling rates for random durations between 2s and 6s
      const twinklePhase = Math.random() * Math.PI * 2;
      const twinkleSpeed = Math.random() * 0.035 + 0.017; // speed per frame at 60fps

      return {
        type: 'orbit',
        centerX: centerX,
        centerY: centerY,
        angle: angle,
        distance: distance,
        speed: (Math.random() * 0.012 + 0.003) * (Math.random() > 0.5 ? 1 : -1), // orbit speed
        radialSpeed: Math.random() * 0.45 + 0.15, // speed drifting outwards
        radius: radius,
        alpha: Math.random() * 0.6 + 0.2,
        twinklePhase: twinklePhase,
        twinkleSpeed: twinkleSpeed
      };
    } else {
      // Rising particles emerging from the platform base and heading towards the logo
      const pX = centerX + (Math.random() - 0.5) * (width * 0.15); // emerging from platform center
      const pY = randomInit ? (centerY + Math.random() * platformOffsetY) : (centerY + platformOffsetY - Math.random() * 10);
      
      const speedY = -(Math.random() * 1.0 + 0.4); // rising upwards
      const speedX = (Math.random() - 0.5) * 0.25; // slight horizontal drift
      
      const twinklePhase = Math.random() * Math.PI * 2;
      const twinkleSpeed = Math.random() * 0.035 + 0.017;

      return {
        type: 'rise',
        x: pX,
        y: pY,
        speedX: speedX,
        speedY: speedY,
        radius: radius + 0.15, // slightly larger for vertical beam glow look
        alpha: Math.random() * 0.55 + 0.25,
        twinklePhase: twinklePhase,
        twinkleSpeed: twinkleSpeed,
        startY: centerY + platformOffsetY,
        endY: centerY
      };
    }
  }

  // Initialize particle set
  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle(true));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      if (p.type === 'orbit') {
        // Update coordinates (orbiting, expanding, and twinkling)
        p.angle += p.speed;
        p.distance += p.radialSpeed;
        p.twinklePhase += p.twinkleSpeed;

        // Twinkling effect: smooth sinusoidal scaling between 0.3 and 1.0 opacity
        const twinkle = 0.65 + Math.sin(p.twinklePhase) * 0.35;
        let alpha = p.alpha * twinkle;

        // Fade out as it expands further from the logo
        if (p.distance > maxOrbitDistance) {
          alpha = (p.alpha * twinkle) * Math.max(0, ((maxOrbitDistance * 1.1) - p.distance) / (maxOrbitDistance * 0.1));
        }

        // If particle drifts too far, recycle it close to the logo
        if (p.distance > maxOrbitDistance * 1.1) {
          particles[i] = createParticle(false, 'orbit');
          continue;
        }

        const x = p.centerX + Math.cos(p.angle) * p.distance;
        const y = p.centerY + Math.sin(p.angle) * p.distance;

        ctx.beginPath();
        ctx.fillStyle = `rgba(127, 255, 0, ${alpha})`;
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Rising particles
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinklePhase += p.twinkleSpeed;

        const twinkle = 0.65 + Math.sin(p.twinklePhase) * 0.35;
        
        // Alpha fades out as it approaches endY (logo center)
        const totalDist = p.startY - p.endY;
        const currentDist = p.startY - p.y;
        let alpha = p.alpha * twinkle;
        
        if (currentDist > totalDist - 40) {
          // fading out close to the logo
          alpha = alpha * Math.max(0, (totalDist - currentDist) / 40);
        }
        
        // If particle reaches the logo level or goes above start, recycle it
        if (p.y <= p.endY || p.y > p.startY + 20) {
          particles[i] = createParticle(false, 'rise');
          continue;
        }

        ctx.beginPath();
        // Alternating color spectrum matches primary cyan and secondary green themes
        ctx.fillStyle = (i % 2 === 0) ? `rgba(0, 229, 255, ${alpha})` : `rgba(127, 255, 0, ${alpha})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   Hero Mouse Parallax System
   ========================================================================== */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const logoWrapper = document.querySelector('.holographic-logo-parallax-wrapper');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Normalize coordinates: -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Max movement 15px
    targetParallaxX = x * 30; // -15px to 15px
    targetParallaxY = y * 30; // -15px to 15px
  });

  hero.addEventListener('mouseleave', () => {
    targetParallaxX = 0;
    targetParallaxY = 0;
  });

  // Smooth easing loop
  function updateParallax() {
    currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
    currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

    if (logoWrapper) {
      logoWrapper.style.transform = `translate(calc(-50% + ${currentParallaxX}px), calc(-50% + ${currentParallaxY}px))`;
    }

    requestAnimationFrame(updateParallax);
  }
  
  updateParallax();
}

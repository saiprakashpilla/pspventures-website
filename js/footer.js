class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer-wrapper section-masked" style="border-top: 1px solid rgba(0, 220, 255, 0.15); position: relative; overflow: hidden; background: rgba(10, 15, 20, 0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding-top: 5rem;">
        
        <!-- Soft Ambient Glows -->
        <div style="position: absolute; top: -100px; left: 15%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(0, 220, 255, 0.04) 0%, transparent 70%); pointer-events: none;"></div>
        <div style="position: absolute; bottom: -100px; right: 10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(140, 255, 47, 0.03) 0%, transparent 70%); pointer-events: none;"></div>

        <div class="container" style="position: relative; z-index: 1;">
          <div class="footer-grid">
            <div class="footer-info">
              <a href="index.html" class="logo-wrapper logo-glow-effect" style="display: inline-flex; margin-bottom: 1.5rem;">
                <img src="assets/images/logo-icon.png" alt="PSP Ventures Logo Icon" class="logo-img">
                <span class="logo-text">PSP VENTURES</span>
              </a>
              <p class="footer-description" style="color: #A0A0A0; line-height: 1.7;">
                Building innovative, enterprise-grade digital products for a better tomorrow.
              </p>
              <div class="footer-socials" style="margin-top: 2rem;">
                <svg width="0" height="0" style="position:absolute">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#f09433"/>
                      <stop offset="25%" stop-color="#e6683c"/>
                      <stop offset="50%" stop-color="#dc2743"/>
                      <stop offset="75%" stop-color="#cc2366"/>
                      <stop offset="100%" stop-color="#bc1888"/>
                    </linearGradient>
                  </defs>
                </svg>
                <a href="https://linkedin.com" class="social-icon linkedin" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://instagram.com/pspventures" class="social-icon instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://youtube.com" class="social-icon youtube" aria-label="YouTube">
                  <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
    
            <div class="footer-column">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="products.html">Our Work</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
    
            <div class="footer-column">
              <h4>Products</h4>
              <ul class="footer-links">
                <li><a href="products.html">All Products</a></li>
                <li><a href="product-mysavingsbook.html">Mobile Apps</a></li>
                <li><a href="products.html">Websites</a></li>
                <li><a href="index.html#statistics">Future Apps</a></li>
              </ul>
            </div>
    
            <div class="footer-column">
              <h4>Legal</h4>
              <ul class="footer-links">
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                <li><a href="privacy-policy.html">Refund Policy</a></li>
              </ul>
            </div>
    
            <div class="footer-column">
              <h4>Get In Touch</h4>
              <ul class="footer-links">
                <li style="font-size: 0.95rem; color: var(--text-secondary); word-break: break-all;">
                  <a href="mailto:pspventuresofficial@gmail.com" style="color: var(--primary-accent); transition: color 0.3s ease;">pspventuresofficial@gmail.com</a>
                </li>
                <li style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.5rem;">
                  India
                </li>
              </ul>
            </div>
          </div>
    
          <div class="footer-bottom" style="border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 4rem; padding: 2rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <span class="copyright" style="color: rgba(255, 255, 255, 0.4); font-size: 0.9rem;">&copy; 2025 PSP Ventures. All rights reserved.</span>
            <div class="footer-bottom-links" style="display: flex; gap: 1.5rem;">
              <a href="privacy-policy.html" style="color: rgba(255, 255, 255, 0.4); font-size: 0.9rem; text-decoration: none; transition: color 0.3s ease;">Privacy Policy</a>
              <a href="terms-and-conditions.html" style="color: rgba(255, 255, 255, 0.4); font-size: 0.9rem; text-decoration: none; transition: color 0.3s ease;">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);

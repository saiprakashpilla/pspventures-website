import re

with open('index.html', 'r') as f:
    index_content = f.read()

header_match = re.search(r'(<header>.*?</header>)', index_content, re.DOTALL)
header = header_match.group(1) if header_match else ''

footer_match = re.search(r'(<footer>.*?</footer>)', index_content, re.DOTALL)
footer = footer_match.group(1) if footer_match else ''

scripts_match = re.search(r'(<!-- Scripts -->.*?</body>)', index_content, re.DOTALL)
scripts = scripts_match.group(1) if scripts_match else '  <script src="js/main.js"></script>\n</body>'

privacy_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Read the official Privacy Policy for PSP Ventures applications, websites, and digital services.">
  <title>Privacy Policy | PSP Ventures</title>

  <!-- Style Sheets -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/responsive.css">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/images/logo-icon.png">

  <!-- Internal styles for white premium theme -->
  <style>
    /* Privacy Policy Specific Styles */
    body {{
      background-color: #050505;
    }}
    .privacy-section {{
      background: linear-gradient(135deg, #ffffff 0%, #f7f9fa 100%);
      color: #1a1a1a;
      padding: calc(var(--header-height) + 5rem) 2rem 5rem 2rem;
      position: relative;
    }}
    .privacy-header {{
      text-align: center;
      margin-bottom: 4rem;
    }}
    .privacy-header h1 {{
      color: #050505;
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      margin-bottom: 1rem;
      font-weight: 800;
      letter-spacing: -1px;
    }}
    .privacy-header p {{
      color: #555;
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }}
    .privacy-content {{
      max-width: 800px;
      margin: 0 auto;
    }}
    .privacy-card {{
      background: #ffffff;
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0,0,0,0.04);
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
      position: relative;
    }}
    .privacy-card:hover {{
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
      border-color: rgba(124, 255, 0, 0.3);
    }}
    .privacy-card-icon {{
      width: 54px;
      height: 54px;
      background: rgba(124, 255, 0, 0.15);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: #000;
    }}
    .privacy-card-icon svg {{
      width: 26px;
      height: 26px;
      stroke: #050505;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }}
    .privacy-card h2 {{
      font-size: 1.4rem;
      color: #050505;
      margin-bottom: 1rem;
      font-weight: 700;
    }}
    .privacy-card p, .privacy-card ul {{
      color: #4a4a4a;
      font-size: 1.05rem;
      line-height: 1.7;
    }}
    .privacy-card ul {{
      padding-left: 1.5rem;
      margin-top: 1rem;
    }}
    .privacy-card li {{
      margin-bottom: 0.5rem;
    }}
    .privacy-card a {{
      color: #050505;
      text-decoration: underline;
      font-weight: 600;
      transition: color 0.3s ease;
    }}
    .privacy-card a:hover {{
      color: #7CFF00;
    }}
    html {{
      scroll-behavior: smooth;
    }}
  </style>
</head>
<body>

  {header}

  <section class="privacy-section">
    <div class="privacy-header reveal">
      <h1>Privacy Policy</h1>
      <p>Effective Date: June 26, 2026</p>
    </div>

    <div class="privacy-content">
      
      <!-- 1. Introduction -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <h2>1. Introduction</h2>
        <p>PSP Ventures (“we”, “our”, or “us”) develops and publishes mobile applications, websites, and digital services. This Privacy Policy explains how information is collected, used, and protected across all applications and services published by PSP Ventures.</p>
        <p style="margin-top: 1rem;">By using our applications or services, you agree to the collection and use of information in accordance with this Privacy Policy.</p>
      </div>

      <!-- 2. Information We Collect -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
        </div>
        <h2>2. Information We Collect</h2>
        <p>Depending on the application or service, we may collect:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Contact information</li>
          <li>Financial information entered by users</li>
          <li>Device information</li>
          <li>Crash logs</li>
          <li>Usage analytics</li>
          <li>Advertising identifiers</li>
        </ul>
      </div>

      <!-- 3. How We Use Information -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        <h2>3. How We Use Information</h2>
        <p>Information may be used to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Store and restore user data</li>
          <li>Provide customer support</li>
          <li>Analyze app performance</li>
          <li>Detect and fix technical issues</li>
          <li>Display relevant advertisements</li>
        </ul>
      </div>

      <!-- 4. Data Storage -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
        </div>
        <h2>4. Data Storage</h2>
        <p>Many PSP Ventures applications store data locally on the user’s device. Some applications may offer cloud backup or synchronization features if enabled by the user.</p>
      </div>

      <!-- 5. Third-Party Services -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
        </div>
        <h2>5. Third-Party Services</h2>
        <p>Our applications may use:</p>
        <ul>
          <li>Google Play Services</li>
          <li>Google AdMob</li>
          <li>Google Analytics for Firebase</li>
          <li>Firebase Crashlytics</li>
          <li>Google Drive APIs</li>
        </ul>
        <p style="margin-top: 1rem;">Google Privacy Policy:<br>
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>
      </div>

      <!-- 6. Data Sharing -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        </div>
        <h2>6. Data Sharing</h2>
        <p>PSP Ventures does not sell, trade, or rent users’ personal information to third parties.</p>
      </div>

      <!-- 7. Data Security -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h2>7. Data Security</h2>
        <p>We implement reasonable security measures to protect user information. However, no electronic storage method is completely secure.</p>
      </div>

      <!-- 8. Children’s Privacy -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <h2>8. Children’s Privacy</h2>
        <p>Our applications are not intended for children under 13 years of age unless explicitly stated otherwise.</p>
      </div>

      <!-- 9. User Rights -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </div>
        <h2>9. User Rights</h2>
        <p>Users may:</p>
        <ul>
          <li>Delete app data</li>
          <li>Uninstall applications</li>
          <li>Contact us regarding privacy concerns</li>
        </ul>
      </div>

      <!-- 10. Changes to This Privacy Policy -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><path d="M2 12a10 10 0 1 0 10-10 10 10 0 0 0-10 10z"></path><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h2>10. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.</p>
      </div>

      <!-- 11. Contact Information -->
      <div class="privacy-card reveal">
        <div class="privacy-card-icon">
          <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <h2>11. Contact Information</h2>
        <p>PSP Ventures</p>
        <p style="margin-top: 0.5rem;">Email: <a href="mailto:pspventuresofficial@gmail.com">pspventuresofficial@gmail.com</a></p>
        <p style="margin-top: 0.5rem;">Website: <a href="https://pspventures.pages.dev" target="_blank" rel="noopener noreferrer">https://pspventures.pages.dev</a></p>
      </div>

    </div>
  </section>

  {footer}

{scripts}
"""

with open('privacy-policy.html', 'w') as f:
    f.write(privacy_html)

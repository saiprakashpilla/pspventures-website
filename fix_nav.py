import os
import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We want to replace the entire <ul class="nav-links">...</ul> block.
    # First, let's capture which link was active.
    active_link = None
    if 'href="index.html" class="active"' in content: active_link = 'index'
    elif 'href="about.html" class="active"' in content: active_link = 'about'
    elif 'href="products.html" class="active"' in content: active_link = 'products'
    elif 'href="contact.html" class="active"' in content: active_link = 'contact'

    # The new block base:
    # Notice we removed the "ABOUT US" split text, just "ABOUT", because the user said "Menu order: HOME, ABOUT, OUR WORK, GET IN TOUCH".
    # And we keep <li class="mobile-only-link"><a href="contact.html">GET IN TOUCH</a></li>
    
    # Create the nav items with correct active state
    items = [
        ('index.html', 'HOME', 'index'),
        ('about.html', 'ABOUT', 'about'),
        ('products.html', 'OUR WORK', 'products')
    ]
    
    new_nav = '        <ul class="nav-links">\n'
    for href, text, key in items:
        active_str = ' class="active"' if active_link == key else ''
        new_nav += f'          <li><a href="{href}"{active_str}>{text}</a></li>\n'
    
    active_str_contact = ' class="active"' if active_link == 'contact' else ''
    new_nav += f'          <li class="mobile-only-link"><a href="contact.html"{active_str_contact}>GET IN TOUCH</a></li>\n'
    new_nav += '        </ul>'
    
    # Replace the old block
    # Regex to match <ul class="nav-links">...</ul> spanning multiple lines
    new_content = re.sub(r'<ul class="nav-links">[\s\S]*?</ul>', new_nav, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")


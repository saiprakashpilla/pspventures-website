import glob

html_files = glob.glob('*.html')
nav_addition = '          <li><a href="privacy-policy.html">PRIVACY POLICY</a></li>\n'

for file_path in html_files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # We look for the products link in the nav and insert privacy policy after it
    # We need to handle both active and non-active states, though in most pages it's just <a href="products.html">PRODUCTS</a>
    # Let's target the exact string to be safe
    target1 = '<li><a href="products.html">PRODUCTS</a></li>'
    target2 = '<li><a href="products.html" class="active">PRODUCTS</a></li>'
    
    new_content = content
    if target1 in content:
        new_content = content.replace(target1, target1 + '\n' + nav_addition.rstrip('\n'))
    elif target2 in content:
        new_content = content.replace(target2, target2 + '\n' + nav_addition.rstrip('\n'))
        
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"Could not find nav target in {file_path}")


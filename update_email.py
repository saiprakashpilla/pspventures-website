import glob

html_files = glob.glob('*.html')
old_email = 'hello@pspventures.in'
new_email = 'pspventuresofficial@gmail.com'

for file_path in html_files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    if old_email in content:
        new_content = content.replace(old_email, new_email)
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated email in {file_path}")


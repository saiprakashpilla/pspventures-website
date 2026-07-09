from PIL import Image

def get_bounding_box(image_path):
    img = Image.open(image_path).convert("RGBA")
    bbox = img.getbbox()
    print(f"Original size: {img.size}")
    print(f"Bounding box (left, top, right, bottom): {bbox}")
    
    width, height = img.size
    if bbox:
        left_padding = bbox[0]
        print(f"Left padding in pixels: {left_padding}")
        print(f"Left padding percentage: {left_padding / width * 100:.2f}%")
    else:
        print("Image is entirely transparent.")

get_bounding_box("assets/product-logos/trend-bull-logo.png")

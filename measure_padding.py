import sys
from PIL import Image

def get_bounding_box(image_path):
    img = Image.open(image_path).convert("RGBA")
    bbox = img.getbbox()
    print(f"Original size: {img.size}")
    print(f"Bounding box (left, top, right, bottom): {bbox}")
    
    width, height = img.size
    if bbox:
        left_padding = bbox[0]
        top_padding = bbox[1]
        print(f"Left padding in pixels: {left_padding}")
        print(f"Left padding percentage: {left_padding / width * 100:.2f}%")
        print(f"Top padding in pixels: {top_padding}")
        print(f"Top padding percentage: {top_padding / height * 100:.2f}%")
        
        # Calculate actual size
        actual_w = bbox[2] - bbox[0]
        actual_h = bbox[3] - bbox[1]
        print(f"Actual visible size: {actual_w}x{actual_h}")
    else:
        print("Image is entirely transparent.")

if __name__ == "__main__":
    get_bounding_box(sys.argv[1])

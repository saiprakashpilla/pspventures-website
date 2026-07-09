from PIL import Image

def crop_transparent(image_path):
    img = Image.open(image_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        cropped_img.save(image_path)
        print(f"Cropped to bounding box: {bbox}. New size: {cropped_img.size}")
    else:
        print("Image is entirely transparent.")

crop_transparent("assets/product-logos/trend-bull-logo.png")

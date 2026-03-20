from PIL import Image, ImageDraw

def create_icon(size, filename):
    img = Image.new('RGBA', (size, size), color=(0, 193, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw a rounded rectangle background
    margin = size // 8
    draw.rounded_rectangle([margin, margin, size-margin, size-margin], radius=size//4, fill=(0, 193, 255, 255))
    
    # Draw a simple "N" or note icon
    padding = size // 4
    draw.line([padding, padding, padding, size-padding], fill=(0, 0, 0, 255), width=size//10)
    draw.line([padding, padding, size-padding, size-padding], fill=(0, 0, 0, 255), width=size//10)
    draw.line([size-padding, padding, size-padding, size-padding], fill=(0, 0, 0, 255), width=size//10)
    
    img.save(f'icons/{filename}')

import os
os.makedirs('icons', exist_ok=True)
create_icon(16, 'icon16.png')
create_icon(48, 'icon48.png')
create_icon(128, 'icon128.png')
print("Icons generated successfully.")

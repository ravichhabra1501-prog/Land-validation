import struct
import zlib
import os

def create_png(width, height, draw_fn, filepath):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # Filter type 0 (None)
        for x in range(width):
            r, g, b, a = draw_fn(x, y, width, height)
            raw_data.extend([r, g, b, a])
    
    compressed = zlib.compress(bytes(raw_data), level=9)
    
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    png.extend(struct.pack('>I', len(ihdr_data)))
    png.extend(b'IHDR')
    png.extend(ihdr_data)
    png.extend(struct.pack('>I', ihdr_crc))
    
    # IDAT chunk
    idat_crc = zlib.crc32(b'IDAT' + compressed) & 0xffffffff
    png.extend(struct.pack('>I', len(compressed)))
    png.extend(b'IDAT')
    png.extend(compressed)
    png.extend(struct.pack('>I', idat_crc))
    
    # IEND chunk
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    png.extend(struct.pack('>I', 0))
    png.extend(b'IEND')
    png.extend(struct.pack('>I', iend_crc))
    
    with open(filepath, 'wb') as f:
        f.write(png)
    print(f"Generated {filepath} ({width}x{height})")

def draw_cadastral_icon(x, y, w, h):
    nx = x / w
    ny = y / h
    cx, cy = 0.5, 0.5
    dx = nx - cx
    dy = ny - cy
    dist = (dx*dx + dy*dy)**0.5

    # Rounded rectangle background #4A4A32 to #2D2D1E
    # Corner radius approx 20%
    rx = abs(nx - 0.5)
    ry = abs(ny - 0.5)
    in_box = rx <= 0.46 and ry <= 0.46
    
    # Base earthy background
    base_r = int(74 - ny * 29)
    base_g = int(74 - ny * 29)
    base_b = int(50 - ny * 20)

    # Gold rim
    gold_dist = abs(max(rx, ry) - 0.44)
    if gold_dist < 0.015:
        return (212, 175, 55, 255)

    # Cadastral polygon in center (normalized coords: (0.3,0.35) to (0.7,0.3) to (0.75,0.65) to (0.55,0.8) to (0.28,0.7))
    # Simple polygon check
    # Check if point is inside polygon
    poly = [(0.28, 0.35), (0.72, 0.28), (0.78, 0.65), (0.55, 0.82), (0.25, 0.68)]
    n = len(poly)
    inside = False
    p1x, p1y = poly[0]
    for i in range(n + 1):
        p2x, p2y = poly[i % n]
        if ny > min(p1y, p2y):
            if ny <= max(p1y, p2y):
                if nx <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (ny - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or nx <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y

    # Central emblem circle
    if dist < 0.12:
        # Cadastral centroid emblem (ivory with gold border)
        if dist > 0.105:
            return (212, 175, 55, 255)
        return (250, 248, 245, 255)
    
    # Corner stones (munaras)
    for px, py in poly:
        if ((nx - px)**2 + (ny - py)**2)**0.5 < 0.035:
            return (229, 195, 122, 255)

    if inside:
        # Green land parcel tint #3D5A40 to #82B37A
        return (61 + int(ny*30), 90 + int(ny*40), 64 + int(ny*25), 255)

    # Cadastral grid lines
    if in_box and (abs(nx % 0.15) < 0.008 or abs(ny % 0.15) < 0.008):
        return (90, 90, 68, 255)

    if in_box:
        return (base_r, base_g, base_b, 255)
    
    return (0, 0, 0, 0)

os.makedirs('public', exist_ok=True)
create_png(192, 192, draw_cadastral_icon, 'public/pwa-192x192.png')
create_png(512, 512, draw_cadastral_icon, 'public/pwa-512x512.png')
create_png(512, 512, draw_cadastral_icon, 'public/pwa-maskable-512x512.png')
create_png(180, 180, draw_cadastral_icon, 'public/apple-touch-icon.png')
create_png(32, 32, draw_cadastral_icon, 'public/favicon.ico')

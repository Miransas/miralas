import os
import numpy as np
from PIL import Image

W, H = 800, 600          # dither grid, upscaled 2x so the dots stay chunky
SCALE = 2
LEVELS = 5               # colour levels per channel after quantisation

# 8x8 Bayer matrix, normalised to (0, 1)
def bayer(n):
    m = np.array([[0, 2], [3, 1]])
    while m.shape[0] < n:
        s = m.shape[0]
        m = np.block([[4 * m, 4 * m + 2], [4 * m + 3, 4 * m + 1]])
    return (m + 0.5) / (n * n)

BAYER = bayer(8)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
u = xx / W
v = yy / H


def blob(cx, cy, sx, sy, angle, power=2.0):
    """Anisotropic gaussian-like blob, stretched along `angle`."""
    ca, sa = np.cos(angle), np.sin(angle)
    dx = (u - cx) * (W / H)
    dy = v - cy
    rx = dx * ca + dy * sa
    ry = -dx * sa + dy * ca
    d = (rx / sx) ** 2 + (ry / sy) ** 2
    return np.exp(-(d ** (power / 2.0)))


def smooth_noise(rng, scale, amp):
    """Low-frequency domain noise from a handful of sine waves."""
    out = np.zeros((H, W), np.float32)
    for _ in range(6):
        fx = rng.uniform(0.5, 2.2) * scale
        fy = rng.uniform(0.5, 2.2) * scale
        ph = rng.uniform(0, 2 * np.pi)
        out += np.sin(2 * np.pi * (fx * u + fy * v) + ph)
    return out / 6.0 * amp


def compose(seed, warm, cool, blobs, streak=0.0, bg=(0, 0, 0)):
    rng = np.random.RandomState(seed)

    # warp the sampling grid a little so the light bends like smoke
    global u, v
    u0, v0 = u.copy(), v.copy()
    u = u0 + smooth_noise(rng, 1.0, 0.045)
    v = v0 + smooth_noise(rng, 1.0, 0.045)

    a = np.zeros((H, W), np.float32)  # warm field
    b = np.zeros((H, W), np.float32)  # cool field
    for kind, cx, cy, sx, sy, ang, gain in blobs:
        f = blob(cx, cy, sx, sy, ang) * gain
        if kind == "w":
            a += f
        else:
            b += f

    u, v = u0, v0

    if streak:
        # horizontal light streaks: smear the fields along x
        k = max(1, int(W * streak))
        smeared = []
        for arr in (a, b):
            padded = np.pad(arr, ((0, 0), (k, 0)))
            c = np.cumsum(padded, axis=1)
            trail = (c[:, k:] - c[:, :-k]) / k  # trailing window mean, no seam
            smeared.append(trail * 1.6 + arr * 0.35)
        a, b = smeared

    # tone map
    a = 1 - np.exp(-1.7 * a)
    b = 1 - np.exp(-1.5 * b)

    warm = np.array(warm, np.float32) / 255.0
    cool = np.array(cool, np.float32) / 255.0
    bgc = np.array(bg, np.float32) / 255.0

    rgb = bgc + a[..., None] * warm + b[..., None] * cool

    # where both fields overlap, burn towards white like a hot core
    core = np.clip(a * b * 2.2 + np.maximum(a, b) ** 6 * 0.6, 0, 1)
    rgb = rgb + core[..., None] * (1.0 - rgb)

    # fall to black at the corners for a clean frame
    vig = 1 - 0.55 * np.clip(((u - 0.5) ** 2 + (v - 0.5) ** 2) * 2.2, 0, 1)
    rgb = np.clip(rgb * vig[..., None], 0, 1)
    return rgb


def dither(rgb):
    t = BAYER[(yy.astype(int) % 8), (xx.astype(int) % 8)][..., None]
    n = LEVELS - 1
    q = np.floor(rgb * n + t) / n
    q = np.clip(q, 0, 1)
    img = (q * 255).astype(np.uint8)
    im = Image.fromarray(img, "RGB")
    return im.resize((W * SCALE, H * SCALE), Image.NEAREST)


PIECES = {
    "ember": dict(
        seed=3, warm=(255, 92, 22), cool=(28, 160, 190), streak=0.16,
        blobs=[
            ("w", 0.12, 0.78, 0.30, 0.20, -0.5, 1.15),
            ("w", 0.36, 0.55, 0.42, 0.14, 0.05, 0.9),
            ("c", 0.78, 0.30, 0.44, 0.15, 0.25, 1.0),
            ("c", 0.62, 0.55, 0.30, 0.10, 0.1, 0.55),
        ],
    ),
    "violet": dict(
        seed=11, warm=(236, 72, 190), cool=(110, 80, 255), streak=0.12,
        blobs=[
            ("w", 0.80, 0.80, 0.30, 0.18, 0.7, 1.1),
            ("c", 0.22, 0.30, 0.42, 0.16, -0.35, 1.1),
            ("c", 0.55, 0.52, 0.34, 0.10, 0.0, 0.7),
            ("w", 0.45, 0.62, 0.22, 0.09, 0.3, 0.5),
        ],
    ),
    "ocean": dict(
        seed=21, warm=(40, 215, 205), cool=(35, 125, 255), streak=0.20,
        blobs=[
            ("w", 0.30, 0.65, 0.46, 0.13, 0.1, 1.0),
            ("c", 0.72, 0.38, 0.40, 0.18, -0.2, 1.1),
            ("w", 0.82, 0.78, 0.22, 0.12, 0.6, 0.7),
            ("c", 0.18, 0.22, 0.26, 0.12, 0.4, 0.8),
        ],
    ),
    "mono": dict(
        seed=33, warm=(255, 255, 255), cool=(130, 135, 150), streak=0.10,
        blobs=[
            ("w", 0.50, 0.55, 0.42, 0.14, 0.0, 1.15),
            ("c", 0.20, 0.30, 0.34, 0.14, 0.5, 0.9),
            ("c", 0.82, 0.78, 0.34, 0.14, -0.4, 0.9),
        ],
    ),
    "aurora": dict(
        seed=44, warm=(70, 235, 150), cool=(85, 110, 255), streak=0.18,
        blobs=[
            ("w", 0.28, 0.40, 0.44, 0.13, -0.15, 1.05),
            ("c", 0.74, 0.62, 0.44, 0.16, 0.2, 1.1),
            ("w", 0.60, 0.80, 0.26, 0.10, 0.0, 0.6),
            ("c", 0.12, 0.82, 0.24, 0.12, 0.5, 0.6),
        ],
    ),
}

if __name__ == "__main__":
    os.makedirs("out", exist_ok=True)
    for name, p in PIECES.items():
        rgb = compose(p["seed"], p["warm"], p["cool"], p["blobs"], p["streak"])
        img = dither(rgb)
        img.save(f"out/{name}.png", optimize=True)
        print(name, img.size)

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG del logo Komuny — K con colores de marca terracota
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#D4622A"/>
  <text x="256" y="345" font-family="Arial Black, Arial, sans-serif" font-size="320" font-weight="900" text-anchor="middle" fill="#F5F0E8">K</text>
</svg>`;

const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#D4622A"/>
  <text x="256" y="345" font-family="Arial Black, Arial, sans-serif" font-size="280" font-weight="900" text-anchor="middle" fill="#F5F0E8">K</text>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 180, 192, 256, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const svgBuffer = Buffer.from(svgIcon);
const svgMaskableBuffer = Buffer.from(svgMaskable);

async function main() {
  // Iconos estandar
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
    console.log(`OK icon-${size}x${size}.png`);
  }

  // favicon 32x32
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon-32x32.png'));
  console.log('OK favicon-32x32.png');

  // favicon 16x16
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon-16x16.png'));
  console.log('OK favicon-16x16.png');

  // apple-touch-icon 180x180 (iOS)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'));
  console.log('OK apple-touch-icon.png');

  // Maskable para Android (area segura al 100%)
  await sharp(svgMaskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));
  console.log('OK icon-maskable-512x512.png');

  await sharp(svgMaskableBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-192x192.png'));
  console.log('OK icon-maskable-192x192.png');

  console.log('\nDONE — todos los iconos PWA generados correctamente');
}

main().catch((err) => {
  console.error('ERROR generando iconos:', err);
  process.exit(1);
});

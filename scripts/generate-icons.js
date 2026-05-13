// =====================================================================
// Komuny Edu - Generador de iconos PWA / favicon / apple-touch
// =====================================================================
// Genera todos los iconos desde el isologo real de Komuny
// Source: public/komuny-isologo-transparent.png
//
// Ejecutar: node scripts/generate-icons.js
// =====================================================================
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_ISOLOGO = path.join(__dirname, '..', 'public', 'komuny-isologo-transparent.png');
const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');

// Tamaños estándar PWA + iOS + Android
const sizes = [72, 96, 128, 144, 152, 180, 192, 256, 384, 512];

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

if (!fs.existsSync(SOURCE_ISOLOGO)) {
  console.error(`ERROR: source no encontrado: ${SOURCE_ISOLOGO}`);
  process.exit(1);
}

console.log(`Generando iconos desde: ${path.basename(SOURCE_ISOLOGO)}\n`);

async function main() {
  // 1. Iconos estandar PWA (fondo transparente, isologo centrado)
  // Padding del 12% para que el isologo no toque los bordes en displays redondos
  for (const size of sizes) {
    const padding = Math.round(size * 0.12);
    const inner = size - padding * 2;

    await sharp(SOURCE_ISOLOGO)
      .resize(inner, inner, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
    console.log(`OK  icon-${size}x${size}.png`);
  }

  // 2. Favicon 32x32 (con padding minimo para favicon de pestaña)
  await sharp(SOURCE_ISOLOGO)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('OK  favicon-32x32.png');

  // 3. Favicon 16x16
  await sharp(SOURCE_ISOLOGO)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('OK  favicon-16x16.png');

  // 4. apple-touch-icon 180x180 (iOS Add to Home Screen)
  // iOS requiere fondo solido (no transparencia)
  await sharp(SOURCE_ISOLOGO)
    .resize(140, 140, { fit: 'contain', background: { r: 245, g: 240, b: 232, alpha: 1 } })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: { r: 245, g: 240, b: 232, alpha: 1 }, // crema Komuny (#F5F0E8)
    })
    .flatten({ background: { r: 245, g: 240, b: 232 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('OK  apple-touch-icon.png (fondo crema #F5F0E8)');

  // 5. Maskable icons (Android adaptive - safe zone al 80%)
  // El area maskable se recorta en circulo/rounded por Android, asi que
  // el isologo va al 70% para mantener safe zone
  const maskableSize = 512;
  const maskableInner = Math.round(maskableSize * 0.65);
  const maskablePadding = Math.round((maskableSize - maskableInner) / 2);

  await sharp(SOURCE_ISOLOGO)
    .resize(maskableInner, maskableInner, {
      fit: 'contain',
      background: { r: 245, g: 240, b: 232, alpha: 1 },
    })
    .extend({
      top: maskablePadding,
      bottom: maskablePadding,
      left: maskablePadding,
      right: maskablePadding,
      background: { r: 245, g: 240, b: 232, alpha: 1 },
    })
    .flatten({ background: { r: 245, g: 240, b: 232 } })
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));
  console.log('OK  icon-maskable-512x512.png');

  await sharp(path.join(iconsDir, 'icon-maskable-512x512.png'))
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-192x192.png'));
  console.log('OK  icon-maskable-192x192.png');

  // 6. favicon.jpg para usos locales / previews de archivos en Windows
  await sharp(SOURCE_ISOLOGO)
    .resize(420, 420, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({
      top: 46,
      bottom: 46,
      left: 46,
      right: 46,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile(path.join(publicDir, 'favicon.jpg'));
  console.log('OK  favicon.jpg');

  console.log('\nDONE - todos los iconos generados con isologo Komuny correcto');
}

main().catch((err) => {
  console.error('ERROR generando iconos:', err);
  process.exit(1);
});

import sharp from 'sharp'
import { mkdir, copyFile, access } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const sourceCandidates = [
  path.resolve(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-samsung-Downloads-Spare-parts-Ac-Ref-Washing-Machine/assets/image-ec2f0d79-25d2-416b-89c8-870c545f4248.png'
  ),
  path.resolve(root, 'assets/image-ec2f0d79-25d2-416b-89c8-870c545f4248.png'),
]

async function findSource() {
  for (const candidate of sourceCandidates) {
    try {
      await access(candidate)
      return candidate
    } catch {
      // continue
    }
  }
  throw new Error('Logo source PNG not found')
}

/** Keep only red / green emblem pixels. Strip white, gray, and black backgrounds. */
function emblemAlpha(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const chroma = max - min
  const sat = max === 0 ? 0 : chroma / max

  const isRed = r > g + 16 && r > b + 16
  const isGreen = g > r + 10 && g > b + 6

  if ((isRed || isGreen) && sat >= 0.2 && chroma >= 28) return 255
  if ((isRed || isGreen) && chroma >= 14 && sat >= 0.1) {
    return Math.round(255 * Math.min(1, (chroma - 8) / 36))
  }

  // No white disc, gray square, or black fill — fully transparent
  return 0
}

async function removeLogoBackground(inputPath, outputPath) {
  const image = sharp(inputPath)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels
    data[idx + 3] = Math.min(data[idx + 3], emblemAlpha(data[idx], data[idx + 1], data[idx + 2]))
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 8 })
    .toFile(outputPath)
}

const source = await findSource()
const logoDir = path.join(root, 'src/assets/logo')
const publicDir = path.join(root, 'public')
await mkdir(logoDir, { recursive: true })
await mkdir(publicDir, { recursive: true })

const transparentLogo = path.join(logoDir, 'huma-logo.png')
const publicLogo = path.join(publicDir, 'logo.png')

await removeLogoBackground(source, transparentLogo)
await copyFile(transparentLogo, publicLogo)

// Checkerboard preview so transparency is visually obvious
const logo = sharp(transparentLogo)
const meta = await logo.metadata()
const size = Math.max(meta.width || 200, meta.height || 200)
const cell = 12
const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs>
      <pattern id="c" width="${cell * 2}" height="${cell * 2}" patternUnits="userSpaceOnUse">
        <rect width="${cell}" height="${cell}" fill="#ddd"/>
        <rect x="${cell}" width="${cell}" height="${cell}" fill="#fff"/>
        <rect y="${cell}" width="${cell}" height="${cell}" fill="#fff"/>
        <rect x="${cell}" y="${cell}" width="${cell}" height="${cell}" fill="#ddd"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#c)"/>
  </svg>`
)
await sharp(svg)
  .composite([{ input: transparentLogo, gravity: 'centre' }])
  .png()
  .toFile(path.join(logoDir, 'huma-logo-preview.png'))

console.log('Transparent logo written to:', transparentLogo)
console.log('Public logo written to:', publicLogo)

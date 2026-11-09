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

/**
 * Keep only the emblem artwork (red/green mark + dark outlines).
 * Remove white disc, gray square, and other neutral backgrounds.
 */
function emblemAlpha(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const chroma = max - min
  const lum = (r + g + b) / 3
  const sat = max === 0 ? 0 : chroma / max

  const isRed = r > g + 18 && r > b + 18
  const isGreen = g > r + 12 && g > b + 8

  // Solid brand colors
  if ((isRed || isGreen) && sat >= 0.22 && chroma >= 35) return 255

  // Soft anti-aliased brand edges over white/gray
  if ((isRed || isGreen) && chroma >= 18 && sat >= 0.12) {
    return Math.round(255 * Math.min(1, (chroma - 12) / 40))
  }

  // Black / dark outline strokes that belong to the emblem
  if (lum <= 70 && sat <= 0.35) return 255
  if (lum <= 110 && sat <= 0.25 && chroma < 45) {
    return Math.round(255 * Math.min(1, (110 - lum) / 55))
  }

  // Everything else (white disc, gray square, soft neutrals) → transparent
  return 0
}

async function removeLogoBackground(inputPath, outputPath) {
  const image = sharp(inputPath)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels
    const nextAlpha = emblemAlpha(data[idx], data[idx + 1], data[idx + 2])
    data[idx + 3] = Math.min(data[idx + 3], nextAlpha)
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 6 })
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

console.log('Transparent logo written to:', transparentLogo)
console.log('Public logo written to:', publicLogo)

import sharp from 'sharp'
import { mkdir, copyFile } from 'fs/promises'
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
  const { access } = await import('fs/promises')
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

function backgroundAlpha(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const chroma = max - min
  const lum = (r + g + b) / 3
  const sat = max === 0 ? 0 : chroma / max

  // Pure / near-white disc and light gray square
  if (lum >= 210 && sat <= 0.18) return 0
  if (lum >= 185 && sat <= 0.12) return 0
  if (lum >= 140 && sat <= 0.08) return 0

  // Mid gray backdrop outside the emblem
  if (sat <= 0.1 && lum >= 90 && lum < 210) return 0

  // Soft anti-aliased fringe against white: keep only saturated color
  if (lum >= 160 && sat < 0.28) {
    const keep = Math.min(1, Math.max(0, (sat - 0.08) / 0.2))
    return Math.round(255 * keep)
  }

  // Light tinted edge pixels (pink/mint from anti-alias)
  if (chroma < 55 && lum > 175) {
    return Math.round(255 * Math.min(1, chroma / 55))
  }

  return 255
}

async function removeLogoBackground(inputPath, outputPath) {
  const image = sharp(inputPath)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels
    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]
    const nextAlpha = backgroundAlpha(r, g, b)
    data[idx + 3] = Math.min(data[idx + 3], nextAlpha)
  }

  // Trim empty margins so the logo sits cleanly in its frame
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

console.log('Transparent logo written to:', transparentLogo)
console.log('Public logo written to:', publicLogo)

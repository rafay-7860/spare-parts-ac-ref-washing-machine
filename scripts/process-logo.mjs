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

function isBackdrop(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const chroma = max - min
  const lum = (r + g + b) / 3
  const sat = max === 0 ? 0 : chroma / max

  // Keep pure white disc inside the emblem (never treat as backdrop)
  if (lum >= 230 && sat <= 0.12) return false

  // Neutral gray square outside the circular emblem only
  if (sat <= 0.14 && lum >= 95 && lum < 225) return true
  // Soft anti-aliased gray fringe outside the black ring
  if (sat <= 0.2 && lum >= 120 && lum < 220 && chroma < 40) return true
  return false
}

/**
 * Remove only the exterior square backdrop via flood-fill from image edges.
 * Keeps the white circular disc, black ring, and colored monogram intact.
 */
async function removeLogoBackground(inputPath, outputPath) {
  const image = sharp(inputPath)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const total = width * height
  const visited = new Uint8Array(total)
  const queue = new Int32Array(total)
  let qh = 0
  let qt = 0

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const i = y * width + x
    if (visited[i]) return
    const idx = i * channels
    if (!isBackdrop(data[idx], data[idx + 1], data[idx + 2])) return
    visited[i] = 1
    queue[qt++] = i
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  while (qh < qt) {
    const i = queue[qh++]
    const x = i % width
    const y = (i / width) | 0
    data[i * channels + 3] = 0
    push(x + 1, y)
    push(x - 1, y)
    push(x, y + 1)
    push(x, y - 1)
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 4 })
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

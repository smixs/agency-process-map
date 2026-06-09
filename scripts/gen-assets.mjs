// Генерация растровых ассетов из SVG (resvg-js, грузит системные шрифты).
// Запуск: node scripts/gen-assets.mjs
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

function render(svgPath, outPath, widthPx) {
  const svg = readFileSync(svgPath)
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: widthPx },
    font: { loadSystemFonts: true },
    background: 'rgba(0,0,0,0)',
  })
  writeFileSync(outPath, r.render().asPng())
  console.log('✓', outPath.replace(root + '/', ''), `(${widthPx}px)`)
}

const favicon = join(pub, 'favicon.svg')
render(favicon, join(pub, 'favicon-32.png'), 32)
render(favicon, join(pub, 'apple-touch-icon.png'), 180)
render(favicon, join(pub, 'icon-192.png'), 192)
render(favicon, join(pub, 'icon-512.png'), 512)

// OG-картинка 1200×630 (фон непрозрачный)
const og = join(root, 'scripts', 'og.svg')
const ogSvg = readFileSync(og)
const ogr = new Resvg(ogSvg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
})
writeFileSync(join(pub, 'og.png'), ogr.render().asPng())
console.log('✓ public/og.png (1200×630)')

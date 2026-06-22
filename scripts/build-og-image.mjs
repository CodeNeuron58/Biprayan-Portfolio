// Build the 1200x630 Open Graph preview card for social link previews.
// Renders a dark editorial layout: large italic "B" mark on the left,
// name + role on the right, hairline frame. Re-runnable.
//
//   node scripts/build-og-image.mjs                       # text-based (default)
//   node scripts/build-og-image.mjs --logo=public/logo.png  # logo-based
//
// Output: public/og-image.png

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");

const W = 1200;
const H = 630;

const NAME = "Biprayan Choudhuri";
const ROLE = "AI / ML engineer";
const ORG  = "IIT Guwahati";
const STATUS = "Open to roles from 2026";

const BG    = "#0a0a0c";
const INK   = "#f4f1ea";
const INK_2 = "#c9c5bd";
const INK_3 = "#89867f";
const LINE  = "rgba(244,241,234,0.10)";
const WARM  = "#ff8a3d";

const argv = process.argv.slice(2);
const logoArg = argv.find((a) => a.startsWith("--logo="));
const logoPath = logoArg ? resolve(ROOT, logoArg.split("=")[1]) : null;

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const FRAME_INSET = 36;
const GUTTER = 96;
const MARK_BOX = { x: GUTTER, y: 140, w: 360, h: 360 };
const TEXT_X = MARK_BOX.x + MARK_BOX.w + 64;

function buildSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="warm" cx="80%" cy="0%" r="60%">
      <stop offset="0%" stop-color="${WARM}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${WARM}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#warm)"/>
  <rect x="${FRAME_INSET}" y="${FRAME_INSET}" width="${W - 2 * FRAME_INSET}" height="${H - 2 * FRAME_INSET}" fill="none" stroke="${LINE}" stroke-width="1"/>
  <rect x="${FRAME_INSET + 18}" y="${FRAME_INSET + 18}" width="${W - 2 * FRAME_INSET - 36}" height="${H - 2 * FRAME_INSET - 36}" fill="none" stroke="${LINE}" stroke-width="1" opacity="0.6"/>
  <text x="${MARK_BOX.x + MARK_BOX.w / 2}" y="${MARK_BOX.y + MARK_BOX.h / 2 + 80}" text-anchor="middle" font-family="Georgia, 'Iowan Old Style', serif" font-style="italic" font-weight="400" font-size="320" fill="${INK}">B</text>
  <text x="${MARK_BOX.x}" y="${MARK_BOX.y + MARK_BOX.h + 30}" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="20" letter-spacing="3" fill="${INK_3}">BIPRAYAN / BC</text>
  <text x="${TEXT_X}" y="220" font-family="Georgia, 'Iowan Old Style', serif" font-size="86" font-weight="400" letter-spacing="-2" fill="${INK}">${escapeXml(NAME)}</text>
  <text x="${TEXT_X}" y="300" font-family="Inter, system-ui, sans-serif" font-size="32" font-weight="500" fill="${INK_2}">${escapeXml(ROLE)}</text>
  <text x="${TEXT_X}" y="360" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="18" letter-spacing="2.4" fill="${INK_3}">${escapeXml(ORG.toUpperCase())}</text>
  <g transform="translate(${TEXT_X},410)">
    <circle cx="6" cy="-6" r="6" fill="#4ade80"/>
    <text x="22" y="0" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="18" letter-spacing="2.4" fill="${INK_3}">${escapeXml(STATUS.toUpperCase())}</text>
  </g>
  <text x="${W - GUTTER}" y="${H - 56}" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="16" letter-spacing="2" fill="${INK_3}">biprayan.is-a.dev</text>
</svg>
`;
}

async function main() {
  if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });
  const svg = Buffer.from(buildSvg());

  let base = sharp(svg, { density: 96 }).resize(W, H, { fit: "contain", background: BG });

  if (logoPath && existsSync(logoPath)) {
    const logo = await sharp(logoPath)
      .resize(MARK_BOX.w, MARK_BOX.h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    base = sharp(svg, { density: 96 })
      .resize(W, H, { fit: "contain", background: BG })
      .composite([{ input: logo, left: MARK_BOX.x, top: MARK_BOX.y }]);
  }

  const out = resolve(PUBLIC, "og-image.png");
  await base.png({ compressionLevel: 9 }).toFile(out);
  console.log(`[og] wrote ${out}${logoPath ? ` (with ${logoPath})` : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

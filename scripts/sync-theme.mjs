// Pull the shared theme (stylesheet, script, fonts) from the portfolio repo so
// both sites stay visually identical. Run after changing the portfolio's design:
//   npm run sync-theme
import { writeFileSync } from "node:fs";

const RAW = "https://raw.githubusercontent.com/rajwinder-mankoo/rajwindersinghmankoo.github.io/main/src";
const files = [
  "style.css",
  "script.js",
  "assets/favicon.png",
  "assets/fonts/manrope-regular.woff2",
  "assets/fonts/manrope-bold.woff2",
  "assets/fonts/ibm-plex-mono-latin.woff2",
  "assets/fonts/instrument-serif-italic.woff2",
];

for (const file of files) {
  const res = await fetch(`${RAW}/${file}`);
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  writeFileSync(`src/${file}`, Buffer.from(await res.arrayBuffer()));
  console.log(`synced ${file}`);
}

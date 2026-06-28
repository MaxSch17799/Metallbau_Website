import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "Example work");
const outputDir = path.join(root, "public", "projects");

const images = [
  {
    input: "WhatsApp Image 2026-06-28 at 14.51.11.jpeg",
    output: "balkon-gelaender.webp",
    width: 1800,
  },
  { input: "IMG_20201027_141245.jpg", output: "aussentreppe-gelaender.webp", width: 1800 },
  { input: "IMG_20200524_171950.jpg", output: "metall-holz-regal.webp", width: 1600 },
  { input: "IMG_20210613_002025.jpg", output: "metall-holz-schreibtisch.webp", width: 1600 },
  { input: "IMG_20210805_202925.jpg", output: "metall-holz-tisch.webp", width: 1600 },
  { input: "IMG_20200818_213030.jpg", output: "leuchtobjekt.webp", width: 1400 },
  { input: "IMG_20210207_120605.jpg", output: "tor-werkstatt.webp", width: 1600 },
  { input: "IMG_20200731_170252.jpg", output: "rahmen-fertigung.webp", width: 1600 },
  { input: "IMG_20201223_203020.jpg", output: "metallblume.webp", width: 1400 },
];

await fs.mkdir(outputDir, { recursive: true });

for (const image of images) {
  const input = path.join(inputDir, image.input);
  const output = path.join(outputDir, image.output);
  await sharp(input)
    .rotate()
    .resize({ width: image.width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(output);
  const stat = await fs.stat(output);
  console.log(`${image.output} ${(stat.size / 1024).toFixed(0)} KB`);
}

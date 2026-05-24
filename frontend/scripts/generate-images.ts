import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const input = join(dir, "akseli.jpg");
const out = join(dir, "../dist/assets");

const variants = [
  { width: 200, suffix: "200" },
  { width: 400, suffix: "200@2x" },
  { width: 400, suffix: "400" },
  { width: 800, suffix: "400@2x" },
] as const;

for (const { width, suffix } of variants) {
  const meta = await sharp(input)
    .resize(width)
    .webp({ quality: 85 })
    .toFile(`${out}/akseli-${suffix}.webp`);
  console.log(`akseli-${suffix}.webp: ${meta.width}x${meta.height}`);
  await sharp(input)
    .resize(width)
    .jpeg({ quality: 85 })
    .toFile(`${out}/akseli-${suffix}.jpg`);
  console.log(`akseli-${suffix}.jpg: done`);
}

const meta = await sharp(input).metadata();
console.log(`Source image: ${meta.width}x${meta.height}`);

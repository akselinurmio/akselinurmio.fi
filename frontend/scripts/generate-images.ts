import sharp from "sharp";
import { join } from "node:path";

const source = sharp(join(import.meta.dirname, "akseli.jpg"));
const out = join(import.meta.dirname, "../dist/assets");

const meta = await source.metadata();
console.log(`Source image: ${meta.width}x${meta.height}`);

const widths = [200, 400, 600, 800];
const formats = [
  { format: "avif", quality: 60 },
  { format: "webp", quality: 85 },
] as const;

await Promise.all(
  widths.flatMap((width) =>
    formats.map(async ({ format, quality }) => {
      const file = `akseli-${width}.${format}`;
      const info = await source
        .clone()
        .resize(width)
        .toFormat(format, { quality })
        .toFile(join(out, file));
      console.log(
        `${file}: ${info.width}x${info.height}, ${Math.round(info.size / 1000)} KB`,
      );
    }),
  ),
);

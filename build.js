import { Parcel } from "@parcel/core";
import { cp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "url";

const buildDirectory = "./dist";
const staticDirectory = "./static";

async function clear() {
  console.log("Clearing build directory %s", buildDirectory);

  await rm(buildDirectory, { recursive: true, force: true });
}

async function build() {
  const bundler = new Parcel({
    entries: [
      "./src/index.html",
      "./src/404.html",
      "./src/en/index.html",
      "./src/en/404.html",
    ],
    mode: "production",
    additionalReporters: [
      {
        packageName: "@parcel/reporter-cli",
        resolveFrom: fileURLToPath(import.meta.url),
      },
    ],
  });

  await bundler.run();
}

async function generateHeadersFile() {
  const hashedAssetNamePattern = /\.[a-f0-9]{8}\.[a-z0-9]{2,5}(?:\.map)?$/;

  const files = await readdir(buildDirectory, { recursive: true });

  const hashedAssets = files.filter((file) =>
    hashedAssetNamePattern.test(file),
  );

  console.log(
    "Appending cache rules to _headers file for %d cached assets",
    hashedAssets.length,
  );

  const template = await readFile(`${staticDirectory}/_headers`, {
    encoding: "utf-8",
  });

  const headersContent =
    template +
    "\n" +
    hashedAssets
      .map(
        (fileName) =>
          `/${fileName}\n  Cache-Control: max-age=604800, immutable`,
      )
      .join("\n") +
    "\n";

  console.log("Writing _headers file to %s", buildDirectory);

  await writeFile(`${buildDirectory}/_headers`, headersContent, {
    encoding: "utf-8",
  });
}

async function copyStaticFiles() {
  console.log(
    "Copying other static files from %s to %s",
    staticDirectory,
    buildDirectory,
  );

  await cp(staticDirectory, buildDirectory, {
    recursive: true,
    filter: (sourcePath) => !sourcePath.endsWith("_headers"),
  });
}

async function init() {
  await clear();
  await build();
  await generateHeadersFile();
  await copyStaticFiles();
}

await init();

import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const clientRoot = path.join(distRoot, "client");
const serverRoot = path.join(distRoot, "server");

await rm(distRoot, { recursive: true, force: true });
await mkdir(clientRoot, { recursive: true });
await mkdir(serverRoot, { recursive: true });
await mkdir(path.join(distRoot, ".openai"), { recursive: true });

await cp(path.join(projectRoot, "index.html"), path.join(clientRoot, "index.html"));
await cp(path.join(projectRoot, "static"), path.join(clientRoot, "static"), { recursive: true });

for (const directory of ["PrivacyPolicy", "UserAgreement", "privacy", "terms"]) {
  await cp(path.join(projectRoot, directory), path.join(clientRoot, directory), { recursive: true });
}

await cp(
  path.join(projectRoot, ".openai", "hosting.json"),
  path.join(distRoot, ".openai", "hosting.json"),
);

await writeFile(
  path.join(clientRoot, "_headers"),
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/static/images/*\n  Cache-Control: public, max-age=86400\n`,
);

await writeFile(
  path.join(serverRoot, "index.js"),
  `export default {\n  async fetch(request, env) {\n    return env.ASSETS.fetch(request);\n  },\n};\n`,
);

await writeFile(
  path.join(serverRoot, "wrangler.json"),
  `${JSON.stringify({
    main: "index.js",
    compatibility_date: "2026-08-04",
    assets: { binding: "ASSETS", directory: "../client" },
  }, null, 2)}\n`,
);

process.stdout.write(`Static site built at ${distRoot}\n`);


// Server static minimal pentru folderul out/ (folosit de teste și Lighthouse).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
};

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, clean);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    try {
      await stat(file + ".html");
      return file + ".html";
    } catch {
      return null;
    }
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url ?? "/");
  if (!file) {
    res.writeHead(404, { "content-type": types[".html"] });
    res.end(await readFile(join(root, "404.html")));
    return;
  }
  const type = types[extname(file)] ?? "application/octet-stream";
  let body = await readFile(file);
  const headers = { "content-type": type };
  // Comprimare, ca la o găzduire reală (Netlify, Vercel etc.).
  if (/text|javascript|svg|json/.test(type)) {
    const accept = String(req.headers["accept-encoding"] ?? "");
    if (accept.includes("br")) {
      body = brotliCompressSync(body);
      headers["content-encoding"] = "br";
    } else if (accept.includes("gzip")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
    }
  }
  if (file.includes("/_next/static/")) headers["cache-control"] = "public, max-age=31536000, immutable";
  res.writeHead(200, headers);
  res.end(body);
}).listen(port, () => console.log(`http://localhost:${port}`));

import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Local preview only. GitHub Pages serves the exported files itself.
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(projectRoot, "out");
let basePath;
try {
  await stat(path.join(outputRoot, "index.html"));
  const manifest = JSON.parse(await readFile(path.join(projectRoot, ".next/routes-manifest.json"), "utf8"));
  basePath = manifest.basePath || "";
} catch {
  console.error("Сначала выполните npm run build — затем npm start.");
  process.exit(1);
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (basePath && pathname === "/") {
      response.writeHead(302, { Location: `${basePath}/${url.search}` }).end();
      return;
    }
    if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404).end("Not found");
      return;
    }
    const relativePath = pathname.slice(basePath.length).replace(/^\/+/, "");
    let filePath = path.resolve(outputRoot, relativePath);
    const relativeToRoot = path.relative(outputRoot, filePath);
    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot) || relativePath.includes(":")) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    let info = await stat(filePath);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      filePath = path.join(filePath, "index.html");
      info = await stat(filePath);
    }
    const headers = {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Content-Length": info.size,
      "Cache-Control": "no-store",
      "Accept-Ranges": "bytes",
    };
    let start = 0;
    let end = info.size - 1;
    const range = request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
    if (range && request.method === "GET") {
      start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
      end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
      if (start > end || start >= info.size) {
        response.writeHead(416, { "Content-Range": `bytes */${info.size}` }).end();
        return;
      }
      headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
      headers["Content-Length"] = end - start + 1;
    }
    response.writeHead(range && request.method === "GET" ? 206 : 200, headers);
    if (request.method === "HEAD" || !info.size) response.end();
    else createReadStream(filePath, { start, end }).on("error", () => response.destroy()).pipe(response);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" || error.code === "ENOTDIR" ? 404 : 400).end("Not found");
  }
});

const port = Number(process.env.PORT || 3000);
server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE" ? `Порт ${port} занят. Закройте другой просмотр сайта или задайте PORT.` : error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Готовая инструкция: http://localhost:${port}${basePath}/guide/`);
});

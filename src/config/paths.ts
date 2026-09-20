const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";

export const basePath = rawBasePath && rawBasePath !== "/"
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

export function publicAssetPath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

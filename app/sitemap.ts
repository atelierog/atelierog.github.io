import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: "https://atelierog.github.io", lastModified: new Date() }]; }
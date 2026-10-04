import type { MetadataRoute } from "next";
import { site, solutions } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/contact", "/industries", "/faq", ...solutions.map((solution) => `/solutions/${solution.slug}`)];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-10-03"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}

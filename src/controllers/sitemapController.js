import { categories } from "../data/categories.js";

const SITE_URL = process.env.SITE_URL || "https://utils.leviro.net";

// All static page paths (without locale prefix)
const PAGE_PATHS = [
  { path: "/",           priority: "1.0",  changefreq: "weekly"  },
  { path: "/categories", priority: "0.90", changefreq: "weekly"  },
  ...categories.map((c) => ({
    path: `/categories/${c.slug}`,
    priority: "0.85",
    changefreq: "weekly",
  })),
  ...categories.flatMap((c) =>
    c.tools.map((tool) => ({
      path: tool.href,
      priority: "0.80",
      changefreq: "monthly",
    }))
  ),
];

function hreflangLinks(enHref, arHref) {
  return [
    `    <xhtml:link rel="alternate" hreflang="en"        href="${enHref}"/>`,
    `    <xhtml:link rel="alternate" hreflang="ar"        href="${arHref}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}"/>`,
  ].join("\n");
}

function urlEntry({ path, priority, changefreq }) {
  const enHref = `${SITE_URL}${path}`;
  const arHref = `${SITE_URL}/ar${path === "/" ? "" : path}`;

  return `
  <!-- EN: ${path} -->
  <url>
    <loc>${enHref}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks(enHref, arHref)}
  </url>

  <!-- AR: ${path} -->
  <url>
    <loc>${arHref}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks(enHref, arHref)}
  </url>`;
}

export const getSitemapXml = (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${PAGE_PATHS.map(urlEntry).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=43200"); // 12-hour cache
  res.send(xml);
};

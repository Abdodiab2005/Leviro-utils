import { categories, findCategory } from "../data/categories.js";

const SITE_URL = process.env.SITE_URL || "https://utils.leviro.net";

export const listCategories = (req, res) => {
  res.locals.categoriesData = categories;
  res.render("categories", {
    title: "All Tool Categories",
    description:
      "Browse all Leviro Utils tool categories: developer tools, text and writing helpers, generators, files and media, and daily-life calculators.",
    keywords:
      "tool categories, online tools, developer tools, text tools, generators, file tools, daily-life calculators",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Tool Categories",
      url: `${SITE_URL}/categories`,
      hasPart: categories.map((c) => ({
        "@type": "CollectionPage",
        name: c.name,
        url: `${SITE_URL}/categories/${c.slug}`,
        description: c.seoDescription,
      })),
    }),
  });
};

export const showCategory = (req, res, next) => {
  const category = findCategory(req.params.slug);
  if (!category) return next();

  res.render("category", {
    title: category.name,
    description: category.seoDescription,
    keywords: category.tools.map((t) => t.title.toLowerCase()).join(", "),
    category,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.name,
      url: `${SITE_URL}/categories/${category.slug}`,
      description: category.seoDescription,
      hasPart: category.tools.map((t) => ({
        "@type": "WebApplication",
        name: t.title,
        url: `${SITE_URL}${t.href}`,
        description: t.desc,
        applicationCategory: "Utility",
      })),
    }),
  });
};

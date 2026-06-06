import { categories, findCategory } from "../data/categories.js";

const SITE_URL = process.env.SITE_URL || "https://utils.leviro.net";

export const listCategories = (req, res) => {
  const { t, locale, canonicalUrl } = res.locals;
  const title = t("categories.title");
  const description = t("categories.description");

  res.locals.categoriesData = categories;
  res.render("categories", {
    title,
    description,
    keywords:
      "tool categories, online tools, developer tools, text tools, generators, file tools, daily-life calculators",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      url: canonicalUrl,
      inLanguage: locale,
      hasPart: categories.map((c) => ({
        "@type": "CollectionPage",
        name: t(`categories.${c.slug}.name`),
        url: `${SITE_URL}/categories/${c.slug}`,
        description: c.seoDescription,
      })),
    }),
  });
};

export const showCategory = (req, res, next) => {
  const category = findCategory(req.params.slug);
  if (!category) return next();

  const { t, locale, canonicalUrl } = res.locals;
  const catName = t(`categories.${category.slug}.name`);
  const catDesc = t(`categories.${category.slug}.description`);

  res.render("category", {
    title: catName,
    description: category.seoDescription,
    keywords: category.tools.map((tool) => t(`tools.${tool.key}.title`).toLowerCase()).join(", "),
    category,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: catName,
      url: canonicalUrl,
      inLanguage: locale,
      description: category.seoDescription,
      hasPart: category.tools.map((tool) => ({
        "@type": "WebApplication",
        name: t(`tools.${tool.key}.title`),
        url: `${SITE_URL}${tool.href}`,
        description: t(`tools.${tool.key}.description`),
        applicationCategory: "Utility",
      })),
    }),
  });
};

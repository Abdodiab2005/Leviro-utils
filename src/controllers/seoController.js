export const getSeoGenerator = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.seoGenerator.title");
  const description = t("tools.seoGenerator.description");
  const keywords = t("tools.seoGenerator.keywords");
  res.render("seo-generator", {
    title,
    description,
    keywords,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
      description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

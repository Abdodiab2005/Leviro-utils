export const getJsonFormatter = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.jsonFormatter.title");
  const description = t("tools.jsonFormatter.description");
  const keywords = t("tools.jsonFormatter.keywords");
  res.render("services/json-formatter", {
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

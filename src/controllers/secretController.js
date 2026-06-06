export const getSecretGenerator = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.secretGenerator.title");
  const description = t("tools.secretGenerator.description");
  const keywords = t("tools.secretGenerator.keywords");
  res.render("services/secret-generator", {
    title,
    description,
    keywords,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
      description,
      applicationCategory: "Security",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

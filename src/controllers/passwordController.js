export const getPasswordGenerator = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.passwordGenerator.title");
  const description = t("tools.passwordGenerator.description");
  const keywords = t("tools.passwordGenerator.keywords");
  res.render("services/password-generator", {
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

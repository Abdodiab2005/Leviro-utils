export const getAgeCalculator = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.ageCalculator.title");
  const description = t("tools.ageCalculator.description");
  const keywords = t("tools.ageCalculator.keywords");
  res.render("services/age-calculator", {
    title,
    description,
    keywords,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
      description,
      applicationCategory: "Utility",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

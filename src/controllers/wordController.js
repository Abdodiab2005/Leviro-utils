export const getWordCounter = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.wordCounter.title");
  const description = t("tools.wordCounter.description");
  const keywords = t("tools.wordCounter.keywords");
  res.render("word-counter", {
    title,
    description,
    keywords,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
      description,
      applicationCategory: "Productivity",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

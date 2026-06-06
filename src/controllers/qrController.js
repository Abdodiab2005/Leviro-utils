export const getQrGenerator = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.qrGenerator.title");
  const description = t("tools.qrGenerator.description");
  const keywords = t("tools.qrGenerator.keywords");
  res.render("services/qr-generator", {
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

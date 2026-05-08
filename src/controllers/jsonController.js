export const getJsonFormatter = (req, res) => {
  const description =
    "Format, validate, and minify JSON online with a clean, color-coded view. Pretty print, compact, and instantly catch syntax errors before shipping.";
  res.render("services/json-formatter", {
    title: "JSON Formatter & Validator",
    description,
    keywords:
      "json formatter, json validator, json beautifier, json minifier, online json viewer, pretty print json, json parser",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "JSON Formatter",
      url: "https://leviro.net/services/json-formatter",
      description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

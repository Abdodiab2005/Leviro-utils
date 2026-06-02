export const getSecretGenerator = (req, res) => {
  const description =
    "Generate cryptographically secure random secrets, API keys, and tokens with custom length. Perfect for JWT secrets, session keys, and environment variables.";
  res.render("services/secret-generator", {
    title: "Secret Key Generator",
    description,
    keywords:
      "secret generator, api key generator, random token, jwt secret generator, secure key generator, session secret",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Secret Generator",
      url: "https://utils.leviro.net/services/secret-generator",
      description,
      applicationCategory: "Security",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

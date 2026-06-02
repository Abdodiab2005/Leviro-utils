export const getPasswordGenerator = (req, res) => {
  const description =
    "Generate strong, secure random passwords with custom length, uppercase, lowercase, numbers, and symbols. Cryptographically random and built right in your browser.";
  res.render("services/password-generator", {
    title: "Password Generator",
    description,
    keywords:
      "password generator, strong password generator, random password, secure password creator, custom password generator, online password generator",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Password Generator",
      url: "https://utils.leviro.net/services/password-generator",
      description,
      applicationCategory: "Security",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

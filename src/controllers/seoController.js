export const getSeoGenerator = (req, res) => {
  const description =
    "Build complete SEO meta tag sets - title, description, Open Graph, Twitter Card, canonical, and structured data - to boost search rankings and social previews.";
  res.render("seo-generator", {
    title: "SEO Meta Tags Generator",
    description,
    keywords:
      "seo meta tag generator, open graph generator, twitter card generator, meta description tool, structured data generator, schema.org generator",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SEO Meta Tags Generator",
      url: "https://leviro.net/services/seo-generator",
      description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

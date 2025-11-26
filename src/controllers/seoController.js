export const getSeoGenerator = (req, res) => {
  res.render("seo-generator", {
    title: "SEO Meta Tags Generator",
    description: "Generate SEO-optimized meta tags for your website.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SEO Meta Tags Generator",
      url: "https://leviro.net/services/seo-generator",
      description: "Generate SEO-optimized meta tags for your website.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

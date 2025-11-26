export const getJsonFormatter = (req, res) => {
  res.render("services/json-formatter", {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data instantly.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "JSON Formatter",
      url: "https://leviro.net/services/json-formatter",
      description: "Format, validate, and minify JSON data instantly.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

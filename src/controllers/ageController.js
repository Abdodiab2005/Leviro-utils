export const getAgeCalculator = (req, res) => {
  res.render("services/age-calculator", {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, weeks, and days.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Age Calculator",
      url: "https://leviro.net/services/age-calculator",
      description:
        "Calculate your exact age in years, months, weeks, and days.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

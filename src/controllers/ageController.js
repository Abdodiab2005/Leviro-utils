export const getAgeCalculator = (req, res) => {
  const description =
    "Free online age calculator: find your exact age in years, months, weeks, days, hours, and minutes from any date of birth. Quick, accurate, mobile-friendly.";
  res.render("services/age-calculator", {
    title: "Age Calculator",
    description,
    keywords:
      "age calculator, calculate age, age in years months days, date of birth calculator, how old am i, age difference calculator",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Age Calculator",
      url: "https://leviro.net/services/age-calculator",
      description,
      applicationCategory: "Utility",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

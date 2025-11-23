export const getAgeCalculator = (req, res) => {
  res.render("services/age-calculator", {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, weeks, and days.",
  });
};

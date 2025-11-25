export const getSeoGenerator = (req, res) => {
  res.render("seo-generator", {
    title: "SEO Meta Tags Generator",
    description: "Generate SEO-optimized meta tags for your website.",
  });
};

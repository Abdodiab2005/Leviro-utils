export const getWordCounter = (req, res) => {
  res.render("word-counter", {
    title: "Word Counter",
    description: "Count words and characters in your text.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Word Counter",
      url: "https://leviro.net/services/word-counter",
      description: "Count words and characters in your text.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

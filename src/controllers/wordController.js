export const getWordCounter = (req, res) => {
  const description =
    "Free online word counter and text analyzer: count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time.";
  res.render("word-counter", {
    title: "Word Counter & Text Analyzer",
    description,
    keywords:
      "word counter, character counter, text analyzer, count words online, reading time calculator, sentence counter, paragraph counter",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Word Counter",
      url: "https://leviro.net/services/word-counter",
      description,
      applicationCategory: "Productivity",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

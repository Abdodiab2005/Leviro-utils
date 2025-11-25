export const getWordCounter = (req, res) => {
  res.render("word-counter", {
    title: "Word Counter",
    description: "Count words and characters in your text.",
  });
};

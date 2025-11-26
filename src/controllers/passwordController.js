import { render } from "ejs";

export const getPasswordGenerator = (req, res) => {
  res.render("services/password-generator", {
    title: "Password Generator",
    description:
      "Generate strong, secure passwords with custom length and character types.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Password Generator",
      url: "https://leviro.net/services/password-generator",
      description:
        "Generate strong, secure passwords with custom length and character types.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

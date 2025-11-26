import bcrypt from "bcrypt";

export const getSecretGenerator = (req, res) => {
  res.render("services/secret-generator", {
    title: "Secret Generator",
    description:
      "Generate secure, random secrets and passwords locally in your browser.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Secret Generator",
      url: "https://leviro.net/services/secret-generator",
      description:
        "Generate secure, random secrets and passwords locally in your browser.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

export const generateSecretAPI = async (req, res) => {
  try {
    const { length = 32 } = req.body;

    // Validate length
    const secretLength = Math.min(Math.max(parseInt(length), 8), 255);

    // Generate random bytes
    const crypto = await import("crypto");
    const secret = crypto
      .randomBytes(Math.ceil(secretLength / 2))
      .toString("hex")
      .slice(0, secretLength);

    res.json({ secret });
  } catch (error) {
    console.error("Secret generation error:", error);
    res.status(500).json({ error: "Failed to generate secret" });
  }
};

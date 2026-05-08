import bcrypt from "bcrypt";

export const getSecretGenerator = (req, res) => {
  const description =
    "Generate cryptographically secure random secrets, API keys, and tokens with custom length. Perfect for JWT secrets, session keys, and environment variables.";
  res.render("services/secret-generator", {
    title: "Secret Key Generator",
    description,
    keywords:
      "secret generator, api key generator, random token, jwt secret generator, secure key generator, session secret",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Secret Generator",
      url: "https://leviro.net/services/secret-generator",
      description,
      applicationCategory: "Security",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

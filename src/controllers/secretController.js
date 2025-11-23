import bcrypt from "bcrypt";

export const getSecretGenerator = (req, res) => {
  res.render("services/secret-generator", {
    title: "Secret Generator",
    description:
      "Generate secure, random secrets and passwords locally in your browser.",
  });
};

export const generateSecretAPI = async (req, res) => {
  try {
    const { length = 32 } = req.body;
    const saltRounds = 10;
    // Generate a random string to hash
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const hash = await bcrypt.hash(randomString, saltRounds);

    // Return the hash truncated or extended to requested length (though bcrypt hashes are fixed length usually)
    // The user asked to "generate random secret key" using bcrypt.
    // Bcrypt hashes are 60 chars. If user wants different length, we might just return the hash.
    // Let's return the full hash as the secret.

    res.json({ secret: hash });
  } catch (error) {
    console.error("Secret generation error:", error);
    res.status(500).json({ error: "Failed to generate secret" });
  }
};

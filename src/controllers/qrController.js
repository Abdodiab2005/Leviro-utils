import QRCode from "qrcode";

export const getQrGenerator = (req, res) => {
  res.render("services/qr-generator", {
    title: "QR Code Generator",
    description:
      "Generate customizable QR codes with colors and high quality output.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "QR Code Generator",
      url: "https://leviro.net/services/qr-generator",
      description:
        "Generate customizable QR codes with colors and high quality output.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

export const generateQrAPI = async (req, res) => {
  try {
    const {
      text,
      darkColor = "#000000",
      lightColor = "#ffffff",
      width = 300,
      margin = 4,
    } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text or URL is required" });
    }

    const options = {
      color: {
        dark: darkColor,
        light: lightColor,
      },
      width: parseInt(width),
      margin: parseInt(margin),
      errorCorrectionLevel: "H",
    };

    const qrDataUrl = await QRCode.toDataURL(text, options);

    res.json({ qrDataUrl });
  } catch (error) {
    console.error("QR generation error:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};

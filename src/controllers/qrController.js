import QRCode from "qrcode";

export const getQrGenerator = (req, res) => {
  const description =
    "Generate high-quality, customizable QR codes for URLs, Wi-Fi, contacts, and any text. Choose colors, error correction, and download as PNG instantly.";
  res.render("services/qr-generator", {
    title: "QR Code Generator",
    description,
    keywords:
      "qr code generator, qr generator online, custom qr code, qr code with colors, free qr code maker, url to qr",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "QR Code Generator",
      url: "https://leviro.net/services/qr-generator",
      description,
      applicationCategory: "Utility",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

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

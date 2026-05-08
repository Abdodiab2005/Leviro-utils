// Single source of truth for the site's tool categories.
// Used by the homepage, the category pages, the header nav, and the footer.

export const categories = [
  {
    slug: "developer",
    name: "Developer Tools",
    icon: "fa-solid fa-code",
    description:
      "Speed up daily coding with formatters, encoders, and debuggers.",
    seoDescription:
      "Free online developer tools: JSON formatter, Base64 encoder, URL encoder, hash generator, JWT decoder, regex tester, UUID generator, timestamp converter, CSS minifier, and HTML viewer.",
    tools: [
      { href: "/services/json-formatter", icon: "fa-solid fa-code", color: "bg-yellow-100 text-yellow-600", title: "JSON Formatter", desc: "Validate, format, and minify JSON data instantly." },
      { href: "/services/base64", icon: "fa-solid fa-file-code", color: "bg-emerald-100 text-emerald-600", title: "Base64 Encoder", desc: "Encode and decode Base64 strings entirely in your browser." },
      { href: "/services/url-encoder", icon: "fa-solid fa-link", color: "bg-cyan-100 text-cyan-600", title: "URL Encoder", desc: "Percent-encode and decode URL strings and query parameters." },
      { href: "/services/hash-generator", icon: "fa-solid fa-fingerprint", color: "bg-rose-100 text-rose-600", title: "Hash Generator", desc: "Generate SHA-256, SHA-512, SHA-1, and MD5 checksums." },
      { href: "/services/jwt-decoder", icon: "fa-solid fa-shield-halved", color: "bg-sky-100 text-sky-600", title: "JWT Decoder", desc: "Inspect JSON Web Tokens and read their claims locally." },
      { href: "/services/regex-tester", icon: "fa-solid fa-asterisk", color: "bg-lime-100 text-lime-700", title: "Regex Tester", desc: "Test regular expressions with live match highlighting." },
      { href: "/services/uuid-generator", icon: "fa-solid fa-id-badge", color: "bg-violet-100 text-violet-600", title: "UUID Generator", desc: "Bulk-generate cryptographically random UUID v4 IDs." },
      { href: "/services/timestamp-converter", icon: "fa-solid fa-clock", color: "bg-orange-100 text-orange-600", title: "Timestamp Converter", desc: "Convert between Unix timestamps and human-readable dates." },
      { href: "/services/css-minifier", icon: "fa-brands fa-css3-alt", color: "bg-blue-100 text-blue-600", title: "CSS Minifier", desc: "Minify CSS to reduce size or beautify it for readability." },
      { href: "/services/html-viewer", icon: "fa-brands fa-html5", color: "bg-orange-100 text-orange-600", title: "HTML Viewer", desc: "Render and preview HTML live in a sandboxed iframe." },
    ],
  },
  {
    slug: "text",
    name: "Text & Writing",
    icon: "fa-solid fa-pen-nib",
    description:
      "Tools for writers, editors, and content creators - count, transform, convert.",
    seoDescription:
      "Free online text and Markdown tools: word counter, case converter, lorem ipsum generator, Markdown previewer, Markdown to HTML, HTML to Markdown, and Markdown to WhatsApp.",
    tools: [
      { href: "/services/word-counter", icon: "fa-solid fa-file-word", color: "bg-blue-100 text-blue-600", title: "Word Counter", desc: "Count words, characters, sentences, and reading time." },
      { href: "/services/case-converter", icon: "fa-solid fa-text-height", color: "bg-teal-100 text-teal-600", title: "Case Converter", desc: "Switch between UPPER, lower, Title, camel, snake, kebab cases." },
      { href: "/services/lorem-ipsum", icon: "fa-solid fa-align-left", color: "bg-amber-100 text-amber-600", title: "Lorem Ipsum", desc: "Generate placeholder text by paragraph, sentence, or word." },
      { href: "/services/markdown-preview", icon: "fa-brands fa-markdown", color: "bg-slate-100 text-slate-700", title: "Markdown Preview", desc: "Live Markdown editor with tables, images, and inline HTML." },
      { href: "/services/markdown-to-html", icon: "fa-solid fa-code", color: "bg-rose-100 text-rose-600", title: "Markdown to HTML", desc: "Convert Markdown to clean HTML source you can paste anywhere." },
      { href: "/services/html-to-markdown", icon: "fa-solid fa-arrow-right-arrow-left", color: "bg-emerald-100 text-emerald-600", title: "HTML to Markdown", desc: "Turn HTML back into clean GitHub-flavored Markdown." },
      { href: "/services/markdown-to-whatsapp", icon: "fa-brands fa-whatsapp", color: "bg-green-100 text-green-600", title: "MD to WhatsApp", desc: "Format Markdown for WhatsApp - bold, italics, lists, and code." },
    ],
  },
  {
    slug: "generators",
    name: "Generators",
    icon: "fa-solid fa-wand-magic-sparkles",
    description:
      "Create secure secrets, codes, manifests, and more.",
    seoDescription:
      "Free online generators: strong password generator, secret key generator, QR code generator, PWA asset generator, and SEO meta tag generator.",
    tools: [
      { href: "/services/password-generator", icon: "fa-solid fa-key", color: "bg-indigo-100 text-indigo-600", title: "Password Generator", desc: "Create strong, random passwords with custom rules." },
      { href: "/services/secret-generator", icon: "fa-solid fa-user-secret", color: "bg-purple-100 text-purple-600", title: "Secret Generator", desc: "Generate secure random secrets for apps and APIs." },
      { href: "/services/qr-generator", icon: "fa-solid fa-qrcode", color: "bg-blue-100 text-blue-600", title: "QR Generator", desc: "Generate customizable QR codes for any URL or text." },
      { href: "/services/pwa-generator", icon: "fa-solid fa-mobile-screen", color: "bg-yellow-100 text-yellow-600", title: "PWA Generator", desc: "Generate icons and manifest for Progressive Web Apps." },
      { href: "/services/seo-generator", icon: "fa-solid fa-magnifying-glass-chart", color: "bg-pink-100 text-pink-600", title: "SEO Generator", desc: "Build optimized meta tags and Open Graph data." },
    ],
  },
  {
    slug: "files",
    name: "Files & Media",
    icon: "fa-solid fa-photo-film",
    description:
      "Convert images, split PDFs, and pick colors.",
    seoDescription:
      "Free file and media tools: image format converter (JPG, PNG, WebP, AVIF), PDF splitter, and color picker / converter (HEX, RGB, HSL).",
    tools: [
      { href: "/services/image-converter", icon: "fa-solid fa-image", color: "bg-pink-100 text-pink-600", title: "Image Converter", desc: "Convert images between PNG, JPG, WebP with quality control." },
      { href: "/services/pdf-splitter", icon: "fa-solid fa-file-pdf", color: "bg-red-100 text-red-600", title: "PDF Splitter", desc: "Split PDFs by page ranges and download custom selections." },
      { href: "/services/color-converter", icon: "fa-solid fa-palette", color: "bg-fuchsia-100 text-fuchsia-600", title: "Color Converter", desc: "Pick colors and convert HEX, RGB, RGBA, HSL formats." },
    ],
  },
  {
    slug: "daily",
    name: "Daily Life",
    icon: "fa-solid fa-calendar-check",
    description:
      "Helpful calculators and reference tools for everyday use.",
    seoDescription:
      "Daily-life calculators and references: age calculator, BMI calculator, tip calculator, unit converter, loan / EMI calculator, discount calculator, currency converter, and world info.",
    tools: [
      { href: "/services/age-calculator", icon: "fa-solid fa-cake-candles", color: "bg-blue-100 text-blue-600", title: "Age Calculator", desc: "Calculate exact age in years, months, weeks, and days." },
      { href: "/services/duration-calculator", icon: "fa-solid fa-stopwatch", color: "bg-indigo-100 text-indigo-600", title: "Duration Calculator", desc: "Find the exact time between two dates or two times." },
      { href: "/services/bmi-calculator", icon: "fa-solid fa-weight-scale", color: "bg-pink-100 text-pink-600", title: "BMI Calculator", desc: "Compute Body Mass Index in metric or imperial units." },
      { href: "/services/tip-calculator", icon: "fa-solid fa-hand-holding-dollar", color: "bg-emerald-100 text-emerald-600", title: "Tip Calculator", desc: "Calculate tips and split bills evenly between people." },
      { href: "/services/unit-converter", icon: "fa-solid fa-ruler-combined", color: "bg-blue-100 text-blue-600", title: "Unit Converter", desc: "Convert length, weight, temperature, volume, and more." },
      { href: "/services/loan-calculator", icon: "fa-solid fa-sack-dollar", color: "bg-yellow-100 text-yellow-700", title: "Loan / EMI Calculator", desc: "Estimate monthly payments, interest, and amortization." },
      { href: "/services/discount-calculator", icon: "fa-solid fa-tags", color: "bg-red-100 text-red-600", title: "Discount Calculator", desc: "Find sale prices, savings, and tax-inclusive totals." },
      { href: "/services/currency-converter", icon: "fa-solid fa-money-bill-transfer", color: "bg-green-100 text-green-600", title: "Currency Converter", desc: "Convert currencies with up-to-date exchange rates." },
      { href: "/services/world-info", icon: "fa-solid fa-earth-americas", color: "bg-indigo-100 text-indigo-600", title: "World Info", desc: "Browse countries, states, and cities with rich data." },
    ],
  },
];

export const findCategory = (slug) => categories.find((c) => c.slug === slug);

export const totalToolCount = categories.reduce((n, c) => n + c.tools.length, 0);

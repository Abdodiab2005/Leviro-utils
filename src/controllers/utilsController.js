import en from "../locales/en.js";
import ar from "../locales/ar.js";

const SITE_URL = process.env.SITE_URL || "https://utils.leviro.net";
const translations = { en, ar };

function slugToKey(slug) {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function getToolMeta(locale, slug, fallback) {
  const key = slugToKey(slug);
  const t = translations[locale]?.tools?.[key] ?? translations.en?.tools?.[key] ?? {};
  return {
    title:       t.title       ?? fallback.title,
    description: t.description ?? fallback.description,
    keywords:    t.keywords    ?? fallback.keywords ?? "",
  };
}

const buildSchema = (name, slug, description, canonicalUrl) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: canonicalUrl ?? `${SITE_URL}/services/${slug}`,
    description,
    applicationCategory: "Utility",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  });

const renderTool =
  (view, defaults) =>
  (req, res) => {
    const locale = res.locals.locale ?? "en";
    const { title, description, keywords } = getToolMeta(locale, defaults.slug, defaults);
    res.render(view, {
      title,
      description,
      keywords,
      schemaData: buildSchema(title, defaults.slug, description, res.locals.canonicalUrl),
    });
  };

export const getBase64Tool = renderTool("services/base64", {
  slug: "base64",
  title: "Base64 Encoder & Decoder",
  description: "Encode text or files to Base64 and decode Base64 strings back to plain text instantly. Free, fast, 100% client-side.",
  keywords: "base64 encoder, base64 decoder, online base64 tool, encode base64, decode base64, base64 converter free",
});

export const getUrlEncoder = renderTool("services/url-encoder", {
  slug: "url-encoder",
  title: "URL Encoder & Decoder",
  description: "Encode URLs and decode percent-encoded strings online. Convert special characters to safe URL formats with one click.",
  keywords: "url encoder, url decoder, percent encoding, encode url online, decode url, uri encode, query string encoder",
});

export const getHashGenerator = renderTool("services/hash-generator", {
  slug: "hash-generator",
  title: "Hash Generator (SHA-1, SHA-256, SHA-512, MD5)",
  description: "Generate SHA-1, SHA-256, SHA-384, SHA-512 and MD5 hashes from any text. Built-in checksum tool that runs locally in your browser.",
  keywords: "hash generator, sha256 generator, sha512, sha1, md5 hash, checksum calculator, online hash tool",
});

export const getColorConverter = renderTool("services/color-converter", {
  slug: "color-converter",
  title: "Color Converter & Picker (HEX, RGB, HSL)",
  description: "Pick colors and convert between HEX, RGB, RGBA, and HSL formats. Live preview with copy-to-clipboard support.",
  keywords: "color converter, hex to rgb, rgb to hex, hex to hsl, color picker online, color code generator",
});

export const getLoremIpsum = renderTool("services/lorem-ipsum", {
  slug: "lorem-ipsum",
  title: "Lorem Ipsum Generator",
  description: "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. Customizable length for designers and developers.",
  keywords: "lorem ipsum generator, placeholder text, dummy text, filler text generator, lipsum",
});

export const getUuidGenerator = renderTool("services/uuid-generator", {
  slug: "uuid-generator",
  title: "UUID & GUID Generator",
  description: "Generate random UUID v4 / GUID values in bulk. Cryptographically secure identifiers for your apps and databases.",
  keywords: "uuid generator, guid generator, uuid v4, random uuid, unique id generator online",
});

export const getMarkdownPreview = renderTool("services/markdown-preview", {
  slug: "markdown-preview",
  title: "Markdown Previewer & Editor",
  description: "Live Markdown preview with side-by-side editor. Supports headings, lists, code blocks, links, and tables.",
  keywords: "markdown previewer, markdown editor online, md to html, live markdown, markdown viewer",
});

export const getCaseConverter = renderTool("services/case-converter", {
  slug: "case-converter",
  title: "Text Case Converter",
  description: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, and more.",
  keywords: "case converter, uppercase lowercase converter, title case, camelcase, snake case, kebab case",
});

export const getTimestampConverter = renderTool("services/timestamp-converter", {
  slug: "timestamp-converter",
  title: "Unix Timestamp Converter",
  description: "Convert Unix epoch timestamps to human-readable dates and back. Supports seconds, milliseconds, ISO 8601, and timezones.",
  keywords: "unix timestamp converter, epoch converter, timestamp to date, date to timestamp, iso 8601 converter",
});

export const getJwtDecoder = renderTool("services/jwt-decoder", {
  slug: "jwt-decoder",
  title: "JWT Decoder & Inspector",
  description: "Decode JSON Web Tokens to inspect their header, payload, and signature. Runs entirely in your browser - tokens never leave your device.",
  keywords: "jwt decoder, json web token decoder, jwt inspector, decode jwt online, jwt parser",
});

export const getRegexTester = renderTool("services/regex-tester", {
  slug: "regex-tester",
  title: "Regex Tester & Debugger",
  description: "Test regular expressions against sample text with real-time match highlighting, capture groups, and flag support.",
  keywords: "regex tester, regular expression tester, regex debugger, regex online, regexp tester",
});

export const getCssMinifier = renderTool("services/css-minifier", {
  slug: "css-minifier",
  title: "CSS Minifier & Beautifier",
  description: "Minify CSS to shrink file size, or beautify minified CSS to make it readable. Instant, browser-side, no upload.",
  keywords: "css minifier, css beautifier, css formatter, minify css online, compress css, beautify css",
});

export const getHtmlViewer = renderTool("services/html-viewer", {
  slug: "html-viewer",
  title: "HTML Viewer & Live Preview",
  description: "Paste HTML and see it rendered live in a sandboxed iframe. Toggle scripts on/off, edit, and preview emails or components instantly.",
  keywords: "html viewer, html preview, render html online, html sandbox, live html editor",
});

export const getHtmlToMarkdown = renderTool("services/html-to-markdown", {
  slug: "html-to-markdown",
  title: "HTML to Markdown Converter",
  description: "Convert HTML into clean Markdown with full GitHub-flavored support: tables, code blocks, lists, and inline formatting.",
  keywords: "html to markdown, html to md, convert html to markdown online, html2md, gfm converter",
});

export const getMarkdownToHtml = renderTool("services/markdown-to-html", {
  slug: "markdown-to-html",
  title: "Markdown to HTML Converter",
  description: "Turn Markdown into clean, ready-to-paste HTML. Live preview with optional pretty-printing of the output source.",
  keywords: "markdown to html, md to html, convert markdown online, markdown converter, gfm to html",
});

export const getMarkdownToWhatsapp = renderTool("services/markdown-to-whatsapp", {
  slug: "markdown-to-whatsapp",
  title: "Markdown to WhatsApp Formatter",
  description: "Paste Markdown and get text formatted for WhatsApp: **bold** becomes *bold*, *italic* becomes _italic_, headings flatten, links collapse to bare URLs.",
  keywords: "markdown to whatsapp, whatsapp formatter, convert markdown for whatsapp, whatsapp bold italic, md to whatsapp",
});

export const getBmiCalculator = renderTool("services/bmi-calculator", {
  slug: "bmi-calculator",
  title: "BMI Calculator",
  description: "Calculate Body Mass Index (BMI) in metric or imperial units and see your WHO category instantly. Free and runs entirely in your browser.",
  keywords: "bmi calculator, body mass index, calculate bmi, bmi metric imperial, healthy weight calculator",
});

export const getTipCalculator = renderTool("services/tip-calculator", {
  slug: "tip-calculator",
  title: "Tip Calculator & Bill Splitter",
  description: "Quickly compute the tip on any bill and split it across multiple people. Choose preset percentages or set a custom rate.",
  keywords: "tip calculator, bill splitter, restaurant tip calculator, split bill, gratuity calculator",
});

export const getUnitConverter = renderTool("services/unit-converter", {
  slug: "unit-converter",
  title: "Unit Converter (Length, Weight, Temperature & More)",
  description: "Convert length, weight, temperature, volume, area, speed, and time between metric and imperial units with live two-way conversion.",
  keywords: "unit converter, length converter, weight converter, temperature converter, metric imperial, volume converter",
});

export const getLoanCalculator = renderTool("services/loan-calculator", {
  slug: "loan-calculator",
  title: "Loan & EMI Calculator",
  description: "Estimate monthly payments, total interest, and amortization schedule for any loan or mortgage. Adjust amount, rate, and term live.",
  keywords: "loan calculator, emi calculator, mortgage calculator, monthly payment calculator, amortization, interest calculator",
});

export const getDiscountCalculator = renderTool("services/discount-calculator", {
  slug: "discount-calculator",
  title: "Discount & Sale Price Calculator",
  description: "Find the final price after a discount, calculate savings, and optionally add sales tax. Quick presets for 10/15/20/25/50% off.",
  keywords: "discount calculator, sale price calculator, percent off calculator, savings calculator, tax calculator",
});

export const getDurationCalculator = renderTool("services/duration-calculator", {
  slug: "duration-calculator",
  title: "Date & Time Duration Calculator",
  description: "Calculate the time between two dates or two times: years, months, days, hours, and minutes. Type values directly or pick from a calendar.",
  keywords: "duration calculator, time between dates, hours between two times, date difference, time difference calculator, days between dates",
});

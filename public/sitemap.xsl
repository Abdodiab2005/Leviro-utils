<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="robots" content="noindex,follow"/>
        <title>Sitemap — Leviro Utils</title>
        <style>
          *{box-sizing:border-box;margin:0;padding:0}
          body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f9fafb;color:#111827;padding:40px 16px}
          .wrap{max-width:960px;margin:0 auto}
          header{display:flex;align-items:center;gap:12px;margin-bottom:8px}
          header svg{width:28px;height:28px;flex-shrink:0}
          h1{font-size:1.5rem;font-weight:800;color:#4f46e5}
          .meta{color:#6b7280;font-size:.875rem;margin-bottom:28px}
          table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}
          thead{background:#f3f4f6}
          th{text-align:left;padding:10px 16px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#374151;border-bottom:2px solid #e5e7eb}
          td{padding:9px 16px;font-size:.82rem;border-bottom:1px solid #f3f4f6;word-break:break-all}
          tr:last-child td{border-bottom:none}
          tr:hover td{background:#fafafa}
          a{color:#4f46e5;text-decoration:none}
          a:hover{text-decoration:underline}
          .badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:.72rem;font-weight:600;white-space:nowrap}
          .high{background:#d1fae5;color:#065f46}
          .med{background:#fef3c7;color:#92400e}
          .low{background:#f3f4f6;color:#374151}
          .lang-ar{background:#ede9fe;color:#5b21b6}
          .lang-en{background:#dbeafe;color:#1e40af}
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/>
              <path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <h1>Leviro Utils — Sitemap</h1>
          </header>
          <p class="meta">
            <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs ·
            English &amp; Arabic · auto-generated
          </p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Lang</th>
                <th>Freq</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <xsl:sort select="sm:loc"/>
                <tr>
                  <td>
                    <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="contains(sm:loc,'/ar/')">
                        <span class="badge lang-ar">AR</span>
                      </xsl:when>
                      <xsl:when test="substring(sm:loc,string-length(sm:loc)-2)='/ar'">
                        <span class="badge lang-ar">AR</span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge lang-en">EN</span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td><xsl:value-of select="sm:changefreq"/></td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sm:priority &gt;= 0.9">
                        <span class="badge high"><xsl:value-of select="sm:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sm:priority &gt;= 0.8">
                        <span class="badge med"><xsl:value-of select="sm:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge low"><xsl:value-of select="sm:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

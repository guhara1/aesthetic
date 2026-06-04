<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Sitemap — The Valley Beauty Medical Spa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          :root {
            --ink: #2a2420;
            --ink-soft: #524540;
            --taupe: #8a786a;
            --sand: #d8c6ac;
            --cream: #f4ecdc;
            --ivory: #fbf5e8;
            --gold: #b08d57;
            --gold-deep: #8a6d3f;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--ivory);
            color: var(--ink-soft);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
          }
          .wrap { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }
          .eyebrow {
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--gold);
            margin: 0 0 8px;
          }
          h1 {
            font-family: "Cormorant Garamond", "Times New Roman", serif;
            font-weight: 500;
            font-size: 36px;
            color: var(--ink);
            margin: 0 0 12px;
          }
          .lead {
            max-width: 60ch;
            color: var(--taupe);
            margin: 0 0 32px;
          }
          .meta {
            display: inline-flex;
            gap: 8px;
            padding: 6px 14px;
            border: 1px solid var(--sand);
            border-radius: 999px;
            background: #fff;
            color: var(--ink-soft);
            font-size: 12px;
            margin-bottom: 24px;
          }
          .meta strong { color: var(--gold-deep); }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid var(--sand);
            border-radius: 4px;
            overflow: hidden;
          }
          thead th {
            background: var(--cream);
            color: var(--ink);
            text-align: left;
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 14px 18px;
            border-bottom: 1px solid var(--sand);
          }
          tbody td {
            padding: 14px 18px;
            border-bottom: 1px solid rgba(216,198,172,0.4);
            vertical-align: top;
          }
          tbody tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: var(--cream); }
          a {
            color: var(--gold-deep);
            text-decoration: none;
            border-bottom: 1px solid rgba(176,141,87,0.3);
          }
          a:hover { color: var(--gold); border-bottom-color: var(--gold); }
          .nowrap { white-space: nowrap; color: var(--taupe); font-size: 12px; }
          .pri {
            display: inline-block;
            min-width: 32px;
            text-align: center;
            padding: 2px 8px;
            border-radius: 999px;
            background: var(--cream);
            color: var(--gold-deep);
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <p class="eyebrow">XML Sitemap</p>
          <h1>The Valley Beauty Medical Spa</h1>
          <p class="lead">
            This sitemap lists every page on
            <strong>thevalley-beauty.com</strong> across English, 中文, 한국어 and 日本語.
            It is submitted to Google Search Console, Naver Search Advisor, Bing Webmaster Tools and other major search engines.
          </p>
          <div class="meta">
            <span>Total URLs: <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong></span>
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last modified</th>
                <th>Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td class="nowrap"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
                  <td class="nowrap"><xsl:value-of select="s:changefreq"/></td>
                  <td><span class="pri"><xsl:value-of select="s:priority"/></span></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

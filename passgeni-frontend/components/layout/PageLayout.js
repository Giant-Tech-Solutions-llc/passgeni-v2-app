// =============================================================
// PASSGENI — PAGE LAYOUT WRAPPER
// =============================================================
// Used by every tools page, guide page, and blog page.
// Keeps header, footer, and meta consistent across all pages.
// =============================================================

import Head from "next/head";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default function PageLayout({
  title,
  description,
  canonical,
  schema,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots"      content="index, follow" />
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image"       content="https://passgeni.ai/og-image.png" />
        {canonical && <meta property="og:url" content={canonical} />}

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />

        {/* Schema.org */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>

      <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
        <Header />
        <div style={{ paddingTop: 64 }}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

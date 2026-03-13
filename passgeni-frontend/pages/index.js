// =============================================================
// PASSGENI — HOMEPAGE
// =============================================================
// This is the main page at passgeni.ai
// All text content comes from content/copy.js
// All sections are separate components for easy editing
// =============================================================

import Head from "next/head";
import Header            from "../components/layout/Header.js";
import Footer            from "../components/layout/Footer.js";
import Ticker            from "../components/layout/Ticker.js";
import HeroSection       from "../components/sections/Hero.js";
import StatsBar          from "../components/sections/StatsBar.js";
import GeneratorSection  from "../components/sections/GeneratorSection.js";
import HowItWorks        from "../components/sections/HowItWorks.js";
import FeaturesSection   from "../components/sections/Features.js";
import ToolsPreview      from "../components/sections/ToolsPreview.js";
import PricingSection    from "../components/sections/Pricing.js";
import TestimonialsSection from "../components/sections/Testimonials.js";
import FAQSection        from "../components/sections/FAQ.js";
import WaitlistSection   from "../components/sections/Waitlist.js";
import { getSiteSchema, getFAQSchema, getHowToSchema } from "../seo/schema.js";
import { FAQ }           from "../content/copy.js";

export default function HomePage() {
  return (
    <>
      {/* ── SEO Head ── */}
      <Head>
        <title>PassGeni — AI Password Generator | Zero Storage, Zero Knowledge</title>
        <meta name="description" content="PassGeni is a free AI-powered password generator. Creates strong, memorable passwords based on your profession. Zero data storage. Client-side only. No account needed. NIST SP 800-63B compliant." />
        <meta name="robots"      content="index, follow" />
        <link rel="canonical"    href="https://passgeni.ai" />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://passgeni.ai" />
        <meta property="og:title"       content="PassGeni — AI Password Generator | Zero Storage, Zero Knowledge" />
        <meta property="og:description" content="Generate fortress-grade passwords tailored to your profession. Zero storage. Client-side only. Free forever." />
        <meta property="og:image"       content="https://passgeni.ai/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="PassGeni — AI Password Generator" />
        <meta name="twitter:description" content="Strong, memorable passwords built around your profession. Zero storage. NIST-compliant. Free." />
        <meta name="twitter:image"       content="https://passgeni.ai/og-image.png" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(FAQ.items)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getHowToSchema()) }}
        />
      </Head>

      {/* ── Page Layout ── */}
      <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>

        <Header />

        {/* Ticker sits right below the fixed header */}
        <div style={{ paddingTop: 64 }}>
          <Ticker />
        </div>

        <main>
          <HeroSection />
          <StatsBar />
          <GeneratorSection />
          <HowItWorks />
          <FeaturesSection />
          <ToolsPreview />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <WaitlistSection />
        </main>

        <Footer />
      </div>
    </>
  );
}

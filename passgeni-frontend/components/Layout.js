import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

/* ─── PassGeni SVG Logo ─── */
function PassGeniLogo({ height = '32px' }) {
  return (
    <svg height={height} viewBox="0 0 10000 2200" xmlns="http://www.w3.org/2000/svg" aria-label="PassGeni">
      <path fill="#C8FF00" fillRule="nonzero" d="M539.5 163.5c194.9,0 326.2,134.6 326.2,347.4 0,212.8-131.3,349.9-326.2,349.9l-289.6 0 0 389.7 -249.9 0 0 -1087 539.5 0zm-14.7 449.8c56,0 88.5,-42.1 88.5,-102.4 0,-60.2-32.5,-100.6-88.5,-100.6l-274.9 0 0 203 274.9 0z"/>
      <path fill="#C8FF00" fillRule="nonzero" d="M1268.9 1268.8c-230.4,0 -416.2,-179.4-416.2,-411.3 0,-231.9 185.8,-411.3 416.2,-411.3 230.4,0 416.1,179.4 416.1,411.3 0,231.9-185.7,411.3-416.1,411.3zm0,-208.2c93.6,0 166.3,-84.5 166.3,-203.1 0,-118.6-72.7,-203.1-166.3,-203.1 -93.6,0-166.3,84.5-166.3,203.1 0,118.6 72.7,203.1 166.3,203.1z"/>
      <path fill="#C8FF00" fillRule="nonzero" d="M2301.4 632.5l-1.8 618.9 -231.7 0 0 -82.4c-45.6,62.1-120.4,99.8-213.9,99.8 -194.9,0 -346.1,-179.4-346.1,-411.3 0,-231.9 151.2,-411.3 346.1,-411.3 93.5,0 168.3,37.7 213.9,99.8l0 -113.5 233.5 0zm-394.9 430.7c93.6,0 166.3,-84.5 166.3,-203.1 0,-118.6-72.7,-203.1-166.3,-203.1 -93.6,0-166.3,84.5-166.3,203.1 0,118.6 72.7,203.1 166.3,203.1z"/>
      <path fill="#C8FF00" fillRule="nonzero" d="M2637.6 1268.8c-151.2,0 -278,-68.9-333.9,-196.8l189.5 -109.8c24.4,68.9 78.6,105.5 153.4,105.5 50.1,0 84.3,-18.3 84.3,-53.2 0,-88.8-406.1,-34.2-406.1,-323.6 0,-170.7 145,-268.8 322.6,-268.8 136.9,0 253.7,61.8 316.2,177.6l-185.7 103.7c-23.2,-54.1-70.6,-84.5-134.9,-84.5 -43.8,0 -73,18.3-73,48.7 0,91.3 406.1,29.7 406.1,326.1 0,178.2-151.2,274.9-338.5,274.9z"/>
      <path fill="#C8FF00" fillRule="nonzero" d="M3164.3 1268.8c-151.2,0-278,-68.9-333.9,-196.8l189.5-109.8c24.4,68.9 78.6,105.5 153.4,105.5 50.1,0 84.3,-18.3 84.3,-53.2 0,-88.8-406.1,-34.2-406.1,-323.6 0,-170.7 145,-268.8 322.6,-268.8 136.9,0 253.7,61.8 316.2,177.6l-185.7 103.7c-23.2,-54.1-70.6,-84.5-134.9,-84.5 -43.8,0-73,18.3-73,48.7 0,91.3 406.1,29.7 406.1,326.1 0,178.2-151.2,274.9-338.5,274.9z"/>
      <path fill="#C8FF00" fillRule="nonzero" d="M4137.7 857.5c0,231.9-185.7,411.3-441.6,411.3-255.9,0-441.6,-179.4-441.6,-411.3 0,-231.9 185.7,-411.3 441.6,-411.3 255.9,0 441.6,179.4 441.6,411.3zm-249.9,0c0,-118.6-81.9,-203.1-191.7,-203.1-109.8,0-191.7,84.5-191.7,203.1 0,118.6 81.9,203.1 191.7,203.1 109.8,0 191.7,-84.5 191.7,-203.1z"/>
    </svg>
  );
}

/* ─── Trust Chip ─── */
function TrustChip({ label, type }) {
  const icon = type === 'dot'
    ? <span className="live-dot" aria-hidden="true"/>
    : type === 'check'
      ? <span aria-hidden="true" style={{ color: '#C8FF0088', fontSize: 8 }}>✓</span>
      : <span aria-hidden="true" style={{ color: '#C8FF0088', fontSize: 8 }}>🔒</span>;
  return (
    <div className="trust-chip">
      {icon}
      <span>{label}</span>
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #141416',
      padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,60px)',
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
        <div style={{ maxWidth: 280 }}>
          <PassGeniLogo height="28px" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#666', marginTop: 16, lineHeight: 1.75 }}>
            AI-powered password generation. Zero storage. Client-side only. NIST SP 800-63B compliant.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {[
            { label: 'Product', links: [['Features', '/#features'], ['Generator', '/#generator'], ['Pricing', '/#pricing'], ['API', '/api-docs']] },
            { label: 'Learn', links: [['Blog', '/blog'], ['Guides', '/guides'], ['API Docs', '/api-docs']] },
            { label: 'Company', links: [['Contact', '/contact'], ['Privacy', '/privacy'], ['Terms', '/terms']] },
          ].map(({ label, links }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#555', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([text, href]) => (
                  <Link key={text} href={href} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#777', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.target.style.color = '#C8FF00'}
                    onMouseLeave={e => e.target.style.color = '#777'}
                  >{text}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #111', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#444', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} PassGeni. Zero knowledge by design.
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#444', letterSpacing: '0.06em' }}>
          Built client-side. No data ever leaves your browser.
        </span>
      </div>
    </footer>
  );
}

/* ─── Main Layout ─── */
export default function Layout({ children }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Determine active link: pathname-based
  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    if (href.startsWith('#')) return router.pathname === '/' && router.asPath.includes(href);
    return router.pathname.startsWith(href);
  };

  const NAV_LINKS = [
    { label: 'Features', href: '/#features' },
    { label: 'Tools',    href: '/tools' },
    { label: 'Guides',   href: '/guides' },
    { label: 'Pricing',  href: '/#pricing' },
    { label: 'API',      href: '/api-docs' },
    { label: 'Blog',     href: '/blog' },
  ];

  return (
    <>
      {/* ── NAVBAR ── */}
      <header>
        <nav
          aria-label="Main navigation"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 clamp(20px,5vw,60px)', height: 64,
            background: 'rgba(6,6,8,0.95)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            borderBottom: `1px solid ${scrolled ? '#1e1e1e' : 'transparent'}`,
            transition: 'border-color 0.3s',
          }}
        >
          {/* Left: logo + trust chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <PassGeniLogo height="32px" />
            </Link>
            <div className="nav-trust-row">
              <TrustChip label="Zero storage" type="dot" />
              <TrustChip label="NIST compliant" type="check" />
              <TrustChip label="Client-side only" type="shield" />
            </div>
          </div>

          {/* Center/Right: desktop links */}
          <div className="nav-desktop-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`nav-link${isActive(href) ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
            <Link href="/#pricing" className="cta-primary" style={{ padding: '10px 22px', fontSize: 13 }}>
              Get Pro — free trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Navigation menu">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`nav-link${isActive(href) ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/#pricing" className="cta-primary" style={{ marginTop: 20, justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
            Get Pro — free trial
          </Link>
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      <main style={{ paddingTop: 64 }}>
        {children}
      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </>
  );
}

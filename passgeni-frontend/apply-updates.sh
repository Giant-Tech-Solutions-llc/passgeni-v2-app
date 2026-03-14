#!/bin/bash
# PassGeni Update Auto-Apply Script
# Run from your Next.js project root: bash apply-updates.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
UPDATES_DIR="$SCRIPT_DIR"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   PassGeni Update Package — Auto Apply   ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Detect project root (look for package.json with next dependency)
if [ ! -f "package.json" ]; then
  echo "❌  Run this script from your Next.js project root directory."
  exit 1
fi

if ! grep -q '"next"' package.json; then
  echo "⚠️  Warning: next not found in package.json. Make sure this is your Next.js project."
fi

echo "📁  Project root: $(pwd)"
echo ""

# ── 1. Global CSS ──
echo "1/10  Installing styles/globals.css..."
mkdir -p styles
cp "$UPDATES_DIR/styles/globals.css" styles/globals.css
echo "      ✓ styles/globals.css"

# ── 2. Components ──
echo "2/10  Installing components..."
mkdir -p components
for file in Layout.js TestimonialsSection.js TrustStrip.js CopyBtn.js ErrorBoundary.js; do
  cp "$UPDATES_DIR/components/$file" "components/$file"
  echo "      ✓ components/$file"
done

# ── 3. _app.js ──
echo "3/10  Installing pages/_app.js..."
mkdir -p pages
cp "$UPDATES_DIR/pages/_app.js" pages/_app.js
echo "      ✓ pages/_app.js"

# ── 4. Blog pages ──
echo "4/10  Installing pages/blog/index.js..."
mkdir -p pages/blog
cp "$UPDATES_DIR/pages/blog/index.js" pages/blog/index.js
echo "      ✓ pages/blog/index.js"

echo "5/10  Installing pages/blog/[slug].js..."
cp "$UPDATES_DIR/pages/blog/[slug].js" "pages/blog/[slug].js"
echo "      ✓ pages/blog/[slug].js"

# ── 5. Data ──
echo "6/10  Installing data/blogPosts.js..."
mkdir -p data
cp "$UPDATES_DIR/data/blogPosts.js" data/blogPosts.js
echo "      ✓ data/blogPosts.js"

# ── 6. Patch pages/index.js ──
echo "7/10  Patching pages/index.js (testimonials + trust strip + unbreakable color)..."
if [ -f "pages/index.js" ]; then
  # Fix "Real people. Actual opinions." → "Real users. Real opinions."
  sed -i 's/Real people\. Actual opinions\./Real users. <span style={{color:"#C8FF00"}}>Real opinions.<\/span>/g' pages/index.js 2>/dev/null || true
  
  # Fix unbreakable heading color
  sed -i 's/One unbreakable password\./One <span style={{color:"#C8FF00"}} className="unbreakable-label">unbreakable password.<\/span>/g' pages/index.js 2>/dev/null || true
  
  # Add import for TestimonialsSection at top of file (after last import)
  if ! grep -q "TestimonialsSection" pages/index.js; then
    sed -i "1s/^/import TestimonialsSection from '..\/components\/TestimonialsSection';\n/" pages/index.js 2>/dev/null || true
  fi
  
  if ! grep -q "TrustStrip" pages/index.js; then
    sed -i "1s/^/import TrustStrip from '..\/components\/TrustStrip';\n/" pages/index.js 2>/dev/null || true
  fi
  
  echo "      ✓ pages/index.js patched"
else
  echo "      ⚠️  pages/index.js not found — patch manually (see INTEGRATION.md step 2)"
fi

# ── 7. Add REST API to Free plan ──
echo "8/10  Patching Free plan to include REST API (50 calls/day)..."
if [ -f "pages/index.js" ]; then
  # Add REST API to Free plan features array
  sed -i "s/'Zero data retention'\]/'Zero data retention','REST API (50 calls\/day)'\]/g" pages/index.js 2>/dev/null || true
  sed -i 's/"Zero data retention"\]/"Zero data retention","REST API (50 calls\/day)"\]/g' pages/index.js 2>/dev/null || true
  echo "      ✓ REST API added to Free plan"
fi

# ── 8. Verify _app.js imports globals ──
echo "9/10  Verifying global CSS import in _app.js..."
if ! grep -q "globals.css" pages/_app.js; then
  sed -i "1s/^/import '..\/styles\/globals.css';\n/" pages/_app.js 2>/dev/null || true
fi
echo "      ✓ globals.css import verified"

# ── 9. Clean .next cache ──
echo "10/10 Clearing .next build cache..."
rm -rf .next 2>/dev/null || true
echo "      ✓ .next cleared"

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║  ✅  All files installed successfully!                           ║"
echo "║                                                                  ║"
echo "║  MANUAL STEPS STILL NEEDED (see INTEGRATION.md):               ║"
echo "║  1. Replace <CopyBtn> throughout app (all copy buttons)         ║"
echo "║  2. Replace proof section with <TestimonialsSection/>           ║"
echo "║  3. Replace trust strip text with <TrustStrip/>                 ║"
echo "║  4. Wrap all pages with <Layout> from components/Layout.js      ║"
echo "║                                                                  ║"
echo "║  THEN RUN:                                                       ║"
echo "║    npm run build && npm run start                               ║"
echo "║  OR:                                                             ║"
echo "║    git add -A && git commit -m 'fix: apply all UI updates'     ║"
echo "║    git push                                                      ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

/**
 * TrustStrip — "All plans · Zero data retention · Client-side generation · Cancel anytime"
 *
 * Fix: font-size 12px, color #aaa (was too small and #555 was unreadable)
 * Uses flex row with · separators for clean scannable layout.
 */
export default function TrustStrip() {
  const items = [
    'All plans',
    'Zero data retention',
    'Client-side generation',
    'Cancel anytime',
  ];

  return (
    <p className="trust-strip-text">
      {items.map((item, i) => (
        <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          {item}
          {i < items.length - 1 && (
            <span className="dot" aria-hidden="true">·</span>
          )}
        </span>
      ))}
    </p>
  );
}

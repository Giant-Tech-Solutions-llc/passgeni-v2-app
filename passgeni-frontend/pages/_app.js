// =============================================================
// PASSGENI — APP WRAPPER
// =============================================================
// Phase 4: wrapped in SessionProvider for NextAuth.
// =============================================================

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

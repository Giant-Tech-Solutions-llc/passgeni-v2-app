import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </SessionProvider>
  );
}

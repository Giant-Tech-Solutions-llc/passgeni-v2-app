import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import ErrorBoundary from '../components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {getLayout(<Component {...pageProps} />)}
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    </SessionProvider>
  );
}

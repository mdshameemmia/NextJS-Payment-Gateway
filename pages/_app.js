import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps:{session,...pageProps} }) {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}

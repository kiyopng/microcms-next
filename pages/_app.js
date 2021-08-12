import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_TRACKING_ID, pageview } from '../libs/gtag';
import Header from "../components/Header";
import NextNprogress from "nextjs-progressbar";
import CommonMeta from "../components/CommonMeta";
import CssBaseline from '@material-ui/core/CssBaseline';
import "@material-tailwind/react/tailwind.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (!GA_TRACKING_ID) return;
    const handleRouteChange = (url) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <React.Fragment>
      <CommonMeta />
      <NextNprogress
        color="#FFF"
        startPosition={0.1}
        stopDelayMs={100}
        height={2}
      />
      <Header />
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_TRACKING_ID, pageview } from '../libs/gtag';
import Header from "../components/Header";
import CommonMeta from "../components/CommonMeta";
import CssBaseline from '@material-ui/core/CssBaseline';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import "@material-tailwind/react/tailwind.css";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

function MyApp({ Component, pageProps }) {
  if (process.browser) nprogress.start();
  const router = useRouter();
  useEffect(() => {
    nprogress.done();
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
      <Header />
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp

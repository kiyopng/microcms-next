import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { GA_TRACKING_ID, pageview } from '../libs/gtag';
import Header from "../components/Header";
import Footer from "../components/Footer";
import NextNprogress from "nextjs-progressbar";
import CommonMeta from "../components/CommonMeta";
import CssBaseline from '@material-ui/core/CssBaseline';
import "@material-tailwind/react/tailwind.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    marginBottom: theme.spacing(2),
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const classes = useStyles();

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
      />
      <Header />
      <CssBaseline />
      <div className={classes.root}>
        <Component {...pageProps} className={classes.main} />
      </div>
      <Footer className={classes.footer} />
    </React.Fragment>
  );
}

export default MyApp

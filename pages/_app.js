import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { GA_TRACKING_ID, pageview } from '../libs/gtag';
import Header from "../components/Header";
import Container from '@material-ui/core/container';
import Typography from '@material-ui/core/Typography';
import NextNprogress from "nextjs-progressbar";
import CommonMeta from "../components/CommonMeta";
import CssBaseline from '@material-ui/core/CssBaseline';
import "@material-tailwind/react/tailwind.css";

function Copyright() {
  return (
    <Typography variant="body2">
      {'MIZUAOI.NET'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    color: "#fff",
    backgroundColor: "rgba(33, 150, 243)",
    padding: theme.spacing(1, 2),
    marginTop: "auto",
    textAlign: "center"
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
      <div className={classes.root}>
        <Header />
        <CssBaseline />
        <Component {...pageProps} className={classes.main} />
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default MyApp

import React from 'react';
import Header from "../components/Header";
import CommonMeta from "../components/CommonMeta";
import CssBaseline from '@material-ui/core/CssBaseline';
import "@material-tailwind/react/tailwind.css";

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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

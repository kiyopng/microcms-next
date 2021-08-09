import "@material-tailwind/react/tailwind.css";
import Header from "./components/Header";
import CommonMeta from "./components/CommonMeta";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CommonMeta />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp

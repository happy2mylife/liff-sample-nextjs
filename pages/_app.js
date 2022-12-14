import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Layout from "../components/Layout";

export const LiffContext = createContext();

function MyApp({ Component, pageProps }) {
  console.log("My App");
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log("MyApp useEffect");
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
          console.log("liff.init() after");
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;

  return (
    <LiffContext.Provider value={liffObject}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LiffContext.Provider>
  );
}

export default MyApp;

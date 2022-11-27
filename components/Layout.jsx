import Head from "next/head";
import { Alert } from "react-bootstrap";
import Link from "next/link";
import styles from "./Layout.module.css";
import { LiffContext } from "../pages/_app";
import { useContext } from "react";

const Layout = ({ children }) => {
  const liff = useContext(LiffContext);

  return (
    <div>
      <Head>
        <title>LIFF in Layout</title>
      </Head>
      <Alert variant="primary">
        LINE　{liff?.isLoggedIn() ? "ログイン済み" : "ログインしてください"}
      </Alert>
      {children}
      <footer className={styles.footer}>
        <Link href="/">
          <a>トップへ</a>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;

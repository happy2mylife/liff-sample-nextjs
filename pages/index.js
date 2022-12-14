import Head from "next/head";
import packageJson from "../package.json";
import { Button, Alert } from "react-bootstrap";
import LineProfile from "../components/LineProfile";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  const { liff, liffError } = props;
  const [profile, setProfile] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const login = () => {
    if (liff.isLoggedIn()) {
      liff.logout();
      setProfile(null);
      return;
    }

    liff.login().then(() => {
      setErrorMsg(null);
    });
  };

  const getProfile = () => {
    if (!liff.isLoggedIn()) {
      console.log("not login.");
      setErrorMsg("ログインしてください");
      return;
    }

    liff.getProfile().then((profile) => {
      setProfile({
        displayName: `${profile.displayName}`,
        pictureUrl: `${profile.pictureUrl}`,
        statusMessage: `${profile.statusMessage}`,
      });
    });
  };

  return (
    <div>
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="home">
        {errorMsg && <Alert variant="warning">{errorMsg}</Alert>}
        <div className={styles.line_container}>
          <Button variant="outline-primary" onClick={login}>
            {liff && liff.isLoggedIn() ? "ログアウト" : "ログイン"}
          </Button>
          <Button variant="outline-secondary" onClick={getProfile}>
            プロフィール取得
          </Button>
        </div>
        <div>
          <Link href="/lineToken">
            <a>Token取得</a>
          </Link>
          <Link href="/qr">
            <a>QR読み取り画面へ</a>
          </Link>
          <Link href="/message">
            <a>メッセージ送信画面へ</a>
          </Link>
          <Link href="/pushMessage">
            <a>Botプッシュメッセージ</a>
          </Link>
        </div>
        <LineProfile profile={profile} />
        <h1 className="home__title">
          Welcome to <br />
          <a
            className="home__title__link"
            href="https://developers.line.biz/en/docs/liff/overview/"
          >
            LIFF Starter!
          </a>
        </h1>
        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            LIFF Starter
          </span>
          <span className="home__badges__badge badge--secondary">nextjs</span>
          <span className="home__badges__badge badge--primary">
            {packageJson.version}
          </span>
          <a
            href="https://github.com/line/line-liff-v2-starter"
            target="_blank"
            rel="noreferrer"
            className="home__badges__badge badge--secondary"
          >
            GitHub
          </a>
        </div>
        <div className="home__buttons">
          <a
            href="https://developers.line.biz/en/docs/liff/developing-liff-apps/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--primary"
          >
            LIFF Documentation
          </a>
          <a
            href="https://liff-playground.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--tertiary"
          >
            LIFF Playground
          </a>
          <a
            href="https://developers.line.biz/console/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--secondary"
          >
            LINE Developers Console
          </a>
        </div>
      </div>
    </div>
  );
}

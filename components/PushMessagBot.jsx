import Head from "next/head";
import Link from "next/link";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
// import { Client } from "@line/bot-sdk";

const PushMessagBot = (props) => {
  const { liff } = props;
  const [errorMsg, setErrorMsg] = useState();
  const [completeMsg, setCompleteMsg] = useState();
  const inputMessage = useRef(null);

  const pushMessageBot = async () => {
    if (!liff) {
      console.log("liff is null");
      return;
    }

    if (!liff.isLoggedIn()) {
      setErrorMsg("ログインしてください");
      return;
    }

    liff.getProfile().then(async (profile) => {
      await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage.current?.value,
          targetUserId: profile.userId,
        }),
      })
        .then(() => {
          console.log("送信成功");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div>
      <Head>
        <title>LIFF Send Message</title>
      </Head>
      <div className="home">
        {errorMsg && <Alert variant="warning">{errorMsg}</Alert>}
        {completeMsg && <Alert variant="primary">{completeMsg}</Alert>}
        <div>
          <Form.Label htmlFor="inputMessage">メッセージ</Form.Label>
          <Form.Control
            type="text"
            id="inputMessage"
            ref={inputMessage}
          ></Form.Control>
          <Form.Text id="inputMessage">
            トークルームにBotからメッセージをプッシュ通知します。
          </Form.Text>
        </div>
        <div>
          <Button onClick={pushMessageBot}>送信</Button>
        </div>
        <div>
          <Link href="/">
            <a>戻る</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

PushMessagBot.displayName = "PushMessagBot";
export default PushMessagBot;

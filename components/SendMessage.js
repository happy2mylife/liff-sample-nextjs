import Head from "next/head";
import Link from "next/link";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

const SendMessage = (props) => {
  const { liff } = props;
  const [errorMsg, setErrorMsg] = useState();
  const [completeMsg, setCompleteMsg] = useState();
  const inputMessage = useRef(null);

  const sendMessage = () => {
    if (!liff) {
      console.log("liff is null");
      return;
    }

    if (!liff.isLoggedIn()) {
      setErrorMsg("ログインしてください");
      return;
    }

    liff
      .sendMessages([
        {
          type: "text",
          text: `${inputMessage.current?.value}`,
        },
      ])
      .then(() => {
        completeMsg("送信しました。");
        setErrorMsg(null);
      })
      .catch((err) => {
        setErrorMsg(err);
        completeMsg(null);
      })
      .finally(() => {});
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
          <Form.Control type="text" id="inputMessage"></Form.Control>
          <Form.Text id="inputMessage">
            トークルームにメッセージを送信します。
          </Form.Text>
          <input type="text" ref={inputMessage}></input>
        </div>
        <div>
          <Button onClick={sendMessage}>送信</Button>
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

SendMessage.displayName = "SendMessage";
export default SendMessage;

import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { Alert, Button } from "react-bootstrap";

const LineQR = (props) => {
  const { liff } = props;
  const [qrResult, setQrResult] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const onReadQR = () => {
    if (!liff) {
      console.log("liff is null");
      return;
    }

    if (!liff.isLoggedIn()) {
      setErrorMsg("ログインしてください");
      return;
    }

    liff
      .scanCodeV2()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head>
        <title>LIFF QR Reader</title>
      </Head>
      <div className="home">
        {errorMsg && <Alert variant="warning">{errorMsg}</Alert>}
        <Alert variant="success">
          <Alert.Heading>QRリーダー</Alert.Heading>
          <hr />
          <p>{qrResult ? qrResult : "読み取られていません"}</p>
        </Alert>
        <Button onClick={onReadQR}>読み取り</Button>
        <Link href="/">
          <a>戻る</a>
        </Link>
      </div>
    </div>
  );
};

export default LineQR;

import { Button } from "react-bootstrap";
import { useState } from "react";
import React from "react";

const LineToken = React.memo((props) => {
  const { liff } = props;
  const [errorMsg, setErrorMsg] = useState();
  const [idToken, setIdToken] = useState();
  const [decodedIDToken, setDecodedIDToken] = useState();
  const [profile, setProfile] = useState({ name: null, email: null });

  const handleGetIdToken = () => {
    console.log("handleGetIdToken");
    if (!liff.isLoggedIn()) {
      setErrorMsg("ログインしてください");
      return;
    }

    setIdToken(liff.getIDToken());
  };

  const getDecodedIDToken = () => {
    if (!liff.isLoggedIn()) {
      setErrorMsg("ログインしてください");
      return;
    }

    setDecodedIDToken(liff.getDecodedIDToken());
  };

  const handleVerifyToken = async () => {
    const params = new URLSearchParams();
    params.append("id_token", idToken);
    params.append("client_id", process.env.CHANNEL_ID);

    await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then(async (response) => {
        const user = await response.json();

        setProfile({
          name: user.name,
          email: user.email,
        });
      })
      .catch((err) => {
        setProfile({
          name: "error",
          email: "error",
        });
      });
  };

  return (
    <>
      {errorMsg}
      <div>
        <Button onClick={() => handleGetIdToken()}>IDトークン取得</Button>
      </div>
      <div>トークン：{idToken}</div>
      <div>
        <Button onClick={() => getDecodedIDToken()}>
          デコードIDトークン取得
        </Button>
      </div>
      <div>トークン：{decodedIDToken}</div>
      <div>
        <Button onClick={() => handleVerifyToken()}>検証</Button>
      </div>
      <div>
        <div>名前：{profile.name}</div>
        <div>メール：{profile.email}</div>
      </div>
    </>
  );
});

LineToken.displayName = "LineToken";
export default LineToken;

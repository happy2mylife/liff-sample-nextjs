import * as line from "@line/bot-sdk";

export default function handler(req, res) {
  const config = {
    channelAccessToken: process.env.BOT_ACCESS_TOKEN,
    channelSecret: process.env.BOT_SECRET_TOKEN,
  };

  const client = new line.Client(config);
  const messae = {
    type: "text",
    text: req.body.message,
  };
  client
    .pushMessage(req.body.targetUserId, messae)
    .then((data) => {
      res.status(200).json({ name: "OK" });
    })
    .catch();
}

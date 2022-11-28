import PushMessageBot from "../components/PushMessagBot";

const pushMessage = (props) => {
  const { liff } = props;
  return (
    <div>
      <PushMessageBot liff={liff} />
    </div>
  );
};

export default pushMessage;

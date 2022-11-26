import SendMessage from "../components/SendMessage";

const message = (props) => {
  const { liff } = props;
  return (
    <div>
      <SendMessage liff={liff} />
    </div>
  );
};

export default message;

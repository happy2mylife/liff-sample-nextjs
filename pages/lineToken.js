import LineToken from "../components/LineToken";

const lineToken = (props) => {
  const { liff } = props;
  return (
    <div>
      <LineToken liff={liff} />
    </div>
  );
};

export default lineToken;

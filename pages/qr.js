import LineQR from "../components/LineQR";

const qr = (props) => {
  const { liff } = props;
  return (
    <div>
      <LineQR liff={liff} />
    </div>
  );
};

export default qr;

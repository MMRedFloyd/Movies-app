import Header from "./Header";

function Rootlayout(props) {
  return (
    <>
      <Header />
      <div>{props.children}</div>
    </>
  );
}

export default Rootlayout;

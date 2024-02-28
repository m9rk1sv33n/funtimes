import CountButton from "./CountButton";

export default function ButtonContainer({ locked, setCount }) {
  return (
    <div className="button-container">
      <CountButton locked={locked} type="minus" setCount={setCount} />
      <CountButton locked={locked} type="plus" setCount={setCount} />
    </div>
  );
}

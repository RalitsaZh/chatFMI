export default function Input(props) {
  return (
    <>
      <input
        className={props.className}
        value={props.value}
        placeholder={props.placeholder}
        onInput={props.onInput}
        type={props.type}
        required
      />
      {props.text ? <span>{props.text}</span> : <></>}
    </>
  );
}

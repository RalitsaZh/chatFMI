import React, { useState } from "react";
import "./PasswordField.css";

function PasswordField(props) {
  const [typeOfField, setType] = useState("password");

  let viewPass = () => {
    if (typeOfField === "password") {
      setType("text");
      return;
    }
    setType("password");
  };
  return (
    <>
      <input onInput={props.onInput} type={typeOfField} required />
      <span>Password</span>
      <span
        id="controlPass"
        className="fa fa-fw fa-eye field-icon"
        onClick={() => viewPass()}
      />
    </>
  );
}

export default PasswordField;

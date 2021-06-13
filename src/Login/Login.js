import React, { useState } from "react";
import Input from "./Input/Input.js";
import "./Login.css";
import PasswordField from "./PasswordField/PasswordField.js";
import { auth, db } from "../AppService/firebase.js";

import Button from "@material-ui/core/Button";


export default function Login() {
  const [isShowingReg, setIsShowingReg] = useState(false);

  const email = useFormInput("");
  const password = useFormInput("");
  const fullName = useFormInput("");
  const [isPassValid, setIsPassValid]  = useState(false);

  const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  let registerUser = (ev) => {
    ev.preventDefault();
    if (fullName.value !== "" && isPassValid) {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          db.collection("users")
            .doc(userCredential.user.uid)
            .set({
              uid: userCredential.user.uid,
              displayName: fullName.value,
              photoUrl:
                userCredential.user.photoUrl || "/static/images/avatar/1.jpg",
              email: email.value,
            });

          setIsShowingReg(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      if(isPassValid){
        
        alert("Failed Fullname field is required");
      } else {
        alert("Password must contain at least one number , one uppercase and lowercase letter, and at least 8 characters");

      }
    }
  };

  let logUser = (ev) => {
    ev.preventDefault();
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => { 

      })
      .catch((error) => {
        alert(error.message);
      });
  };


  let changeView = (ev) => {
    ev.preventDefault();
    if (isShowingReg) {
      setIsShowingReg(false);
      return;
    }
    setIsShowingReg(true);
  };

  

  const checkPassword = (ev) => {
    password.onchange(ev);
    setIsPassValid(passwordCheck.test(password.value))
}
  return (
    <>
      <main className="mainContainer">
        <section id="boxes">
          <div>

            <form>
              <div>
                <Input
                  required
                  type={"email"}
                  text="Email"
                  onInput={email.onchange}
                  value={email.value}
                />
              </div>

              {isShowingReg && (
                <div>
                  <Input
                    required
                    onInput={fullName.onchange}
                    value={fullName.value}
                    type={"text"}
                    text="Full name"
                  />
                </div>
              )}

              <div>
                <PasswordField
                  onInput={checkPassword}
                  value={password.value}
                  
                />
              </div>

              {!isShowingReg ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(ev) => {
                    logUser(ev);
                  }}

                disabled = {!email.value || !password.value}
                >
                  Log in
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(ev) => {
                    registerUser(ev);
                  }}
                  disabled = {!email.value || !fullName.value || !password.value}
                >
                 Sign up
                </Button>
              )}

              <div className="or-container">
                <div className="line"></div>
                <div className="or-text">or</div>
                <div className="line"></div>
              </div>

              <div className="text-container">
                {!isShowingReg ? (
                  <div className="account-text">Don't have an account?</div>
                ) : (
                  <div className="or-text">Have an account?</div>
                )}
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={(ev) => {
                  changeView(ev);
                }}
              >
                {isShowingReg ? "Log in" : "Sign up"}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(ev) {
    setValue(ev.target.value);
  }

  return {
    value,
    onchange: handleChange,
  };
}

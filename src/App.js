import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth, db } from "./AppService/firebase";
import Login from "./Login/Login.js";
import ChatRoom from "./ChatRoom/ChatRoom";
import { getCurrentUser } from "./AppService/CurrentUser.actions";

function App() {
  const dispatch = useDispatch(); 
  //This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.

  const currentUser = useSelector((state) => state.currentUser); // hook that takes a selector function

  const [isLoggedIn, setIsLoggedIn] = useState(false); // should be false

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);

    auth.onAuthStateChanged((user) => {  //adds nabludatel? da sledi za promeni
      if (user) {
        dispatch(getCurrentUser(user));
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        <Redirect to="/login" />;
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  } else {
    return (
      <Router id="router">
        <div>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <ChatRoom /> : <Login />}
            </Route>
            <Route path="/inbox">
              <ChatRoom />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

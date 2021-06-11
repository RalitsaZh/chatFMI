import React, { useState, useEffect, useRef } from "react";
import stylesB from "./MessageForm.module.scss";
import stylesC from "../../TextInput/TextInput.module.scss";
import MessageText from "../../Message/MessageText/MessageText";
import { db } from "../../AppService/firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import TextInput from "../../TextInput/TextInput";
import { useSelector } from "react-redux";

export default function MessageForm({ convoId, buttonText }) {
  const [messages, setMessages] = useState([]);

  const currentUser = useSelector((state) => state.currentUser.user);
  const messagesEndRef = useRef(null);
  // During initial rendering React still determines what is the output of the component, so there’s no DOM structure created yet. 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); //scrolls the element's parent container currentUser is visible to the user
  };

  const sendMessage = (str) => {

    if (str.length && convoId) { 
      db.collection("messages").add({
        forConvo: convoId,
        fromUser: {
          username: currentUser.displayName,
          uid: currentUser.uid,
        },
        text: str,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

  };

  useEffect(() => {
    if (convoId) {
      db.collection("messages")
        .where("forConvo", "==", convoId)
        .orderBy("timestamp", "asc") // timestamp values in ascending order 
        .onSnapshot((snapshot) => { //creates a document snapshot immediately with the current contents of the single document
          let messagesArr = [];
          snapshot.forEach((doc) => {
            messagesArr.push(doc.data());
          });
          setMessages(messagesArr);
          scrollToBottom();
        });
    }
  }, [convoId]);

  return (
    <React.Fragment>
      {messages.length ? (
        <div className={stylesB.messageWrapper}>
          {messages.map((message) => (
            <MessageText
              key={uuidv4()}
              comment={message.text}
              username={message.fromUser.username}
              userPhoto={message.fromUser.userPhoto}
              time={message.timestamp}
              uid={message.fromUser.uid}
            />
          ))}

          <div ref={messagesEndRef}></div>
        </div>
      ) : (
        <div className={stylesB.message}>
          <span>You don't have any messages.</span>
          <span>~ Send your first message to a friend of yours ~</span>
        </div>
      )}
      

      <TextInput
        placeholder={"Write message ..."}
        buttonText={buttonText}
        send={sendMessage}
        styles={stylesC}
      />
    </React.Fragment>
  );
}

import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { db } from "../AppService/firebase";
import stylesB from "./ChatRoom.module.scss";
import MessageForm from "./MessageForm/MessageForm";
import MessageText from "../Message/MessageText/MessageText";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import { useSelector } from "react-redux";

export default function ChatRoom() { // хукове 
  const currentUser = useSelector((state) => state.currentUser.user);
  const [conversations, setConversations] = useState([]);
  const [convoId, setConvoId] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    db.collection("chatRooms")
      .where("users", "array-contains", currentUser.uid)
      .onSnapshot((snap) => { // creates a document snapshot immediately with the current contents of the single document
        let conversations = [];
        snap.forEach((conversation) => conversations.push(conversation.data()));
        setConversations(conversations);
        if (conversations.length) {
          setConvoId(conversations[0].convoId);
        }
      });
  }, [currentUser]);

  useEffect(() => {
    db.collection("users")
      .get() // get content of a single document
      .then((querySnapshot) => { 
        let fetchedUsers = [];
        querySnapshot.forEach((doc) => { // get users for this date
          fetchedUsers.push(doc.data());
          setUsers(fetchedUsers);
        });
      });
  }, []);

  const handleInput = (ev) => {
    ev.preventDefault(); //when submmit prevent browser refresh
    setFilteredUsers([]);

    let text = ev.target.value;
    setSearchInput(text);
    if (text) {
      let filteredUsers = users.filter((user) => //filter users
        user.displayName //names which contains the letter
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(text.toLowerCase().trim()) 
      );
      setFilteredUsers(filteredUsers);
    }
  };

  const createNewChatRoom = (receiver) => { 
    let convoQuerry = conversations.filter((convo) => // querry filter 
      convo.users.includes(receiver.uid) // check whether an array includes a certain value among its entries
    );
    let isCreated = Boolean(convoQuerry.length); 

    if (isCreated) {
      setConvoId(convoQuerry[0].convoId);
      setSearchInput("");
      setFilteredUsers([]);
    } else {
      let id = v4(); //random 
      db.collection("chatRooms")
        .doc(id) // add new document in the collection with id
        .set({
          convoName: `${currentUser.displayName.split(" ")[0]} & ${
            receiver.displayName.split(" ")[0]
          }`, // name of the chatRoom
          convoId: id, //id of the connversation
          users: [currentUser.uid, receiver.uid], // new user + me 
        });
      setSearchInput(""); //clear all from chatRoom To
      setFilteredUsers([]);
    }
  };

  return (
    <section className={stylesB.chatRoom}>
      <div className={stylesB.convoBox}>
        <form>
          <TextField
            className={stylesB.searchInput}
            id="outlined-basic"
            label="To: "
            variant="outlined"
            autoComplete= "off"
            value={searchInput}
            onInput={(ev) => {
              handleInput(ev);
            }}
          />

          <div className={stylesB.suggestions}>
            {filteredUsers.map((user) => ( //прелистваме юсерите
              <div
                key={v4()}
                onClick={() => { 
                  createNewChatRoom(user);
                }}
              >
                <div style={{ pointerEvents: "none" }}>
                  <MessageText
                    username={user.displayName}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>

        <div className={stylesB.convoBoxBottom}>
          {conversations.map((convo) => (
            <div key={v4()} className={stylesB.singleConvo} onClick={() => {
                  setConvoId(convo.convoId);
                }}>
              <QuestionAnswerOutlinedIcon />
              <h3
                className={stylesB.convoName}
              >
                {convo.convoName}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <main className={stylesB.contentBox}>
        <MessageForm
          convoId={convoId}
          uid={currentUser.uid}
          buttonText={"Send"}
        />
      </main>
    </section>
  );
}

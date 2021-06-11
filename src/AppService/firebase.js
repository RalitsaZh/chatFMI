import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAMm8UF9tS3EoJ8jrOsVN0QLg-QL_THY_g",
    authDomain: "fmi-chat.firebaseapp.com",
    projectId: "fmi-chat",
    storageBucket: "fmi-chat.appspot.com",
    messagingSenderId: "707592085370",
    appId: "1:707592085370:web:aa18c9a5619564503000c3",
    measurementId: "G-D04VW4YHVQ"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    return firebase.auth().createUserWithEmailAndPassword;
  });

export {db, auth, storage}
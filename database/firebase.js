import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAdOmExZgRK5Ck0QTNQByc94Ix5ZZVngDY",
    authDomain: "tenedores-60c0a.firebaseapp.com",
    projectId: "tenedores-60c0a",
    storageBucket: "tenedores-60c0a.appspot.com",
    messagingSenderId: "67722823245",
    appId: "1:67722823245:web:d9d5d2759f61fd13bafe04"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default{
    firebase,
    db,
  };
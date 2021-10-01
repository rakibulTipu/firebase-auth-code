import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqGkskSrsoyZGFuFLUdoMaXlwcjzoXZ8Q",
  authDomain: "ema-john-simple-59c07.firebaseapp.com",
  projectId: "ema-john-simple-59c07",
  storageBucket: "ema-john-simple-59c07.appspot.com",
  messagingSenderId: "447070079177",
  appId: "1:447070079177:web:ae9ee2c4ea6a52cfd76518",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

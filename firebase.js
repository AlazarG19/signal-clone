
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyB39luidKCnPBC3e5KNUGHF2pR7NLBR9ZA',
  authDomain: 'signal-clone-91018.firebaseapp.com',
  projectId: 'signal-clone-91018',
  storageBucket: 'signal-clone-91018.appspot.com',
  messagingSenderId: '247078704743',
  appId: '1:247078704743:web:d4752aea8a99d60d8e26c2',
}
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
  }
// let app;
// console.log(firebase)
// if (!firebase.apps) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app()
// }
const db = app.firestore()
const auth = firebase.auth()
export { db, auth }

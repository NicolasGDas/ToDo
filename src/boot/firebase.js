import { firebase } from '@firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyChKsSZmMHEebpBJfTzKPp-KRd5O4NyiO0",
    authDomain: "todo-app-6e9ef.firebaseapp.com",
    projectId: "todo-app-6e9ef",
    storageBucket: "todo-app-6e9ef.appspot.com",
    messagingSenderId: "794133635890",
    appId: "1:794133635890:web:5cec2b1e211b28d6812d2b",
    measurementId: "G-3731MXGN8K", 

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export{db,firebase};

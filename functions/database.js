// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCscgE7uP99gJr9Y5fdz74CKu2PrTYdci4",
  authDomain: "projeto-acolher.firebaseapp.com",
  databaseURL: "https://projeto-acolher-default-rtdb.firebaseio.com",
  projectId: "projeto-acolher",
  storageBucket: "projeto-acolher.appspot.com",
  messagingSenderId: "979253442540",
  appId: "1:979253442540:web:776518cbb08f5807e0b2c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


export {database, auth} 
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhBkDoi8RJ4q0UgbbhAQuCJw20YGbaWDI",
    authDomain: "nwitter-605c4.firebaseapp.com",
    projectId: "nwitter-605c4",
    storageBucket: "nwitter-605c4.appspot.com",  
    messagingSenderId: "404305985173",
    appId: "1:404305985173:web:d8ac5210b8a4d0a4e7a59c"
};

export default firebase.initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js" 

import {getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js" //para CRUD


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzT5a5FuEc7n969Aw-QqV0qmP3wvPVK8M",
  authDomain: "trabajo-c2e41.firebaseapp.com",
  projectId: "trabajo-c2e41",
  storageBucket: "trabajo-c2e41.appspot.com",
  messagingSenderId: "191207937719",
  appId: "1:191207937719:web:d62087904063b512039f32",
  measurementId: "G-9HGYJY5QXX"
};
 // Initialize Firebase
export const app = initializeApp(firebaseConfig); //recordar export es para poder importar app en otros archivos
//console.log(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

//CRUD
export const db = getFirestore();
export const saveTask = (title, description, userMail) =>{
  addDoc(collection(db, "tasks"), { title, description, userMail})
}
export const getTasks = () => getDocs(collection(db, 'tasks')) //sirvio para recolectar todos los datos

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

//export const deleteTask = (id) => console.log(id);
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);






// autentificacion con google


const provider = new GoogleAuthProvider();
const goo = document.querySelector("#google");

goo.addEventListener("click", async (e) => {
  e.preventDefault();
  
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  

});

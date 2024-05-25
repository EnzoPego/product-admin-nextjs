// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF2XWMLGzHYidt-ngSM_eI-_30T9ZEg1A",
  authDomain: "product-admin-nextjs-27439.firebaseapp.com",
  projectId: "product-admin-nextjs-27439",
  storageBucket: "product-admin-nextjs-27439.appspot.com",
  messagingSenderId: "992657742724",
  appId: "1:992657742724:web:a67e194653681b795a5bd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
export const auth = getAuth(app)


// Auth functions


// Sing In whit email and password 

export const signIn = async (user:{ email:string,password:string }) => {
    return await signInWithEmailAndPassword(auth, user.email,user.password)


}


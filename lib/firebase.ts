// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
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
export const db = getFirestore(app)


// Auth functions

// Create user whit email and password 
export const createUser = async (user:{ email:string,password:string}) => {
  return await createUserWithEmailAndPassword(auth, user.email,user.password)
}


// Sing In whit email and password 
export const signIn = async (user:{ email:string,password:string }) => {
  return await signInWithEmailAndPassword(auth, user.email,user.password)
}

// Update user's displayName and photoUrl
export const updateUser = async (user:{displayName?: string | null | undefined;photoURL?: string | null | undefined;}) => {
  if (auth.currentUser) return updateProfile(auth.currentUser,user )
}


// Database functions

// Set a document in a collection
export const setDocument = (path:string, data:any) => {
  data.createdAt = serverTimestamp()
  return setDoc(doc(db,path),data)
}

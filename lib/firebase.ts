// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, uploadString,getDownloadURL, ref} from "firebase/storage";
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
export const storage = getStorage(app)


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

// sing out
export const signOutAcount = () => {
  localStorage.removeItem('user')
  return auth.signOut()
}


// send email to reset user's password
export const sendResetEmail = (email:string) => {
  return sendPasswordResetEmail(auth,email)
}


// Database functions

// Get a document from a collection
export const getDocument = async(path:string) => {
  return ((await getDoc(doc(db,path))).data())
}


// Set a document in a collection
export const setDocument = (path:string, data:any) => {
  data.createdAt = serverTimestamp()
  return setDoc(doc(db,path),data)
}

// Update a document in a collection
export const updateDocument = (path:string, data:any) => {
  return updateDoc(doc(db,path),data)
}


// Storage Functions


// Upload a file whit base64 format and get the url
export const uploadBase64 = async(paht:string, base64:string)=> {
  return uploadString(ref(storage,paht),base64,'data_url').then(()=>{
    return getDownloadURL(ref(storage,paht))
  })
}

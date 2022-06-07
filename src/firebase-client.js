import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// }
const firebaseConfig = {
  apiKey: "AIzaSyApF9590KybCLP-uzuROO_iJfKyN8nIpQA",
  authDomain: "team-project-4f86d.firebaseapp.com",
  projectId: "team-project-4f86d",
  storageBucket: "team-project-4f86d.appspot.com",
  messagingSenderId: "426664838822",
  appId: "1:426664838822:web:484e212ca0c7d3fe729667"
};


const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

export const membersCollection = collection(db, "members");

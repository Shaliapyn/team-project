import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}
// const firebaseConfig = {
//   apiKey: "AIzaSyDKMQlK_6eHy4qWdltJDws6VLvJVZaOKQs",
//   authDomain: "test-project-70323.firebaseapp.com",
//   projectId: "test-project-70323",
//   storageBucket: "test-project-70323.appspot.com",
//   messagingSenderId: "621427126959",
//   appId: "1:621427126959:web:3ea19ade640e7ccc4e9a5a"
// };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

export const membersCollection = collection(db, "members");

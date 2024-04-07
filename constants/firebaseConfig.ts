import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

interface firebaseConfig {
  apiKey: string
}

const firebaseConfig = {
  apiKey: "AIzaSyCreVwpJfQEJLQSAZcChdSY0cwa88UW40Q",
  authDomain: "moom-c0cb0.firebaseapp.com",
  databaseURL: "https://moom-c0cb0-default-rtdb.firebaseio.com",
  projectId: "moom-c0cb0",
  storageBucket: "moom-c0cb0.appspot.com",
  messagingSenderId: "575770100482",
  appId: "1:575770100482:web:bbc51713a949cda7c5781b",
  measurementId: "G-LYK0KJSZ53"
};

// gs://chatapp-f846a.appspot.com
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)
const firstoreDB = getFirestore(app)
const storage = getStorage(app)

export { auth, database, firstoreDB, storage }

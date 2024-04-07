import { useEffect } from 'react'
import { auth, database, storage } from '../constants/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, set, onValue } from 'firebase/database'
import { ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { useUser } from './index'

function storageImage(uuid: string, pathImage: string) {
  const urlImage = `profiles/${uuid}.jpeg`
  if(pathImage){
    const muntainsRef = refStorage(storage, urlImage)
    uploadBytes(muntainsRef, pathImage)
      .then(snapshot => {
        // console.log("Fichier upload: ", snapshot)
      })
      .catch(error => {
        // console.log("ERROR Upload Image: ", error)
      })
  }
  
}

function getStorageImageProfil(uid: string) {
  return(
    new Promise((resolve, reject) => {
      getDownloadURL(refStorage(storage, `profiles/${uid}.jpeg`))
        .then(url => {
          resolve(url)
        })
        .catch(error => {
          console.log(error)
          resolve("")
        })
    })
  )
}

function addUserInDatabase(userData) {
  storageImage(userData?.uid, userData?.photoURL)
  set(ref(database, "users/" + userData?.uid), {
    firstname: userData.firstname,
    lastname: userData.lastname,
    phonenumber: userData?.phonenumber,
    photoURL: !userData?.photoURL? "" : userData?.photoURL,
  })
}

async function getUsername(username: string) {
  let objectUsername;
  const usernameToLowerCase = username.toLowerCase()
  return new Promise((resolve, reject) => {
    const startCountRef = ref(database, `uids/${usernameToLowerCase}/`)
    onValue(startCountRef, snapshot => {
      objectUsername = snapshot.val()
      resolve(objectUsername)
    }, error => {
      reject(error)
    })
  })
}

async function getUserData(uid: string) {
  const urlImage = await getStorageImageProfil(uid)
  return new Promise((resolve, reject) => {
    const startCountRef = ref(database, `users/${uid}`)
    onValue(startCountRef, snapshot => {
      const datas = snapshot.val()
      resolve({...datas, photoURL: urlImage})
    }, error => {
      reject(error)
    })
  })
}


function setUsername(uid: string, userData: {[key: string]: string}) {
  const usernameToLowerCase = userData?.username?.toLowerCase()
  set(ref(database, `uids/${userData.username}/`), {
    uid: uid,
  })
}

function createUserEmailPassword(userData) {
  // const { updateUser, userData } = useUser()
  const USERDATA = userData
  return(
    new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(
        auth, 
        USERDATA.username + "@moon.com", 
        USERDATA.password, 
        displayName = USERDATA.firstname,
        photoURL = USERDATA.photoURL,
        emailVerified=true,
        )
        .then(userCredential => {
          const user = userCredential.user
          const uid = user.uid
          addUserInDatabase({...userData, uid: uid})
          setUsername(uid, userData)  
          resolve({uid: uid}) 
        })
        .catch(error => console.log("error: ", error))

        })
  )
}

async function connectUserWithEmailPassword(
  username: string, 
  password: string, 
  ) {
  const email = username.toLowerCase() + "@moon.com"
  try{
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user

  }catch(error){
    throw new Error('Utilisateur non existant')
  }
}



export { 
  createUserEmailPassword, 
  connectUserWithEmailPassword,
  storageImage,
  addUserInDatabase,
  getUsername,
  getUserData,
  setUsername
}

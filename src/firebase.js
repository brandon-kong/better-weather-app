import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyBi7hiHKKLEnisccdpVQ2nPsHIgv8DxR0s',
    authDomain: 'weather-app-6e278.firebaseapp.com',
    projectId: 'weather-app-6e278',
    storageBucket: 'weather-app-6e278.appspot.com',
    messagingSenderId: '24353071789',
    appId: '1:24353071789:web:0c8e064a02185fe5b29c24',
    measurementId: 'G-J6EKR1GKY5'
}

export const firebaseApp = initializeApp(firebaseConfig)
const database = getFirestore(firebaseApp)

export const addUser = async (id, data) => {
    await setDoc(doc(database, 'users', id), {
        ...data
    })
}

export const addLocationToUser = async (id, location) => {
    console.log('hi')
    await updateDoc(doc(database, 'users', id), {
        savedLocations: arrayUnion(location)
    })
        .then(() => {
            console.log('Document successfully updated!')
        })
}

export const getUser = async id => {
    const user = await getDoc(doc(database, 'users', id))
    console.log(user.exists())
    return user
}

export const getLocations = async id => {
    console.log('hi')
    getUser(id).then((userCred) => {
        console.log(userCred)
        if (userCred.exists()) {
            console.log('yipee')
            return userCred.data().savedLocations
        } else {
            return []
        }
    })
}

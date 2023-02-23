import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

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

export const getUser = async id => {
    await getDoc(doc(database, 'users', id))
}

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteField } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { GetLocationFromCoords, DeserializeName, SerializeName } from '@/geocoder'

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
    const { lat, lon } = DeserializeName(location)
    const data = await GetLocationFromCoords({ lat: lat, lon: lon })

    await updateDoc(doc(database, 'users', id), {
        [`savedLocations.${SerializeName({ lat: lat, lon: lon })}`]: {
            id: location,
            data: data.data.features[0].properties
        }
    })
}

export const userSavedLocation = async (id, location) => {
    const { lat, lon } = DeserializeName(location)
    const userB = await getDoc(doc(database, 'users', id))
    const key = SerializeName({ lat: lat, lon: lon })
    if (userB.exists()) {
        return userB.data().savedLocations[key] !== undefined
    } else {
        return false
    }
}

export const removeLocationFromUser = async (id, location) => {
    const { lat, lon } = DeserializeName(location)
    await updateDoc(doc(database, 'users', id), {
        [`savedLocations.${SerializeName({ lat: lat, lon: lon })}`]: deleteField()
    })
}

export const getUser = async id => {
    const user = await getDoc(doc(database, 'users', id))
    return user
}

export const getLocations = async (id, cb) => {
    getAuth(firebaseApp)
    getUser(id).then((userCred) => {
        if (userCred.exists()) {
            cb(userCred.data().savedLocations)
        } else {
            return []
        }
    })
}

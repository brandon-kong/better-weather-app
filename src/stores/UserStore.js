import { defineStore } from 'pinia'
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { firebaseApp, addUser, getUser } from '@/firebase'

export const useUserStore = defineStore('UserStore', {
    // state
    state: () => {
        return {
            user: {
                name: 'John Doe',
                email: '',
                data: {}
            }
        }
    },

    getters: {
        getUser (state) {
            return state.user
        }
    },

    actions: {
        async register ({ email, password }) {
            console.log(email, password)
            createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = addUser(userCredential.user.uid, {
                        email: this.email,
                        savedLocations: []
                    })
                    console.log(user)
                    this.$router.push('/')
                })
        },

        async login (context, { email, password }) {
            signInWithEmailAndPassword(getAuth(firebaseApp), this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    // const user = userCredential.user
                    // ...
                    console.log(getUser(userCredential.user.uid))
                })
                .catch((error) => {
                    // const errorCode = error.code
                    switch (error.code) {
                    case 'auth/invalid-email':
                        this.error = 'Invalid email'
                        break
                    case 'auth/user-not-found':
                        this.error = 'No account with that email'
                        break
                    case 'auth/wrong-password':
                        this.error = 'Incorrect password'
                        break
                    default:
                        this.error = 'Something went wrong'
                    }
                    // ..
                })
        },

        async loginWithGoogle () {
            const provider = new GoogleAuthProvider()
            signInWithPopup(getAuth(firebaseApp), provider)
                .then((result) => {
                    this.$router.push('/')
                })
                .catch((error) => {
                    switch (error.code) {
                    case 'auth/account-exists-with-different-credential':
                        this.error = 'Account already exists with different credentials'
                        break
                    case 'auth/popup-closed-by-user':
                        this.error = 'Sign in was cancelled'
                        break
                    default:
                        this.error = 'Something went wrong'
                    }
                })
        }
    }
})

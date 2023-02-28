import { defineStore } from 'pinia'
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { firebaseApp, addUser, getUser, addLocationToUser } from '@/firebase'

export const useUserStore = defineStore('UserStore', {
    // state
    state: () => {
        return {
            user: {
                name: 'John Doe',
                email: '',
                uid: '',
                data: {
                    savedLocations: {}
                },
                error: ''
            }
        }
    },

    actions: {

        createDbUser ({ userCredential, email }) {
            return addUser(userCredential.user.uid, {
                email: email,
                savedLocations: {}
            })
        },

        async register ({ email, password }, callb) {
            createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = this.createDbUser({ userCredential, email })
                    this.user = userCredential
                    this.uid = userCredential.user.uid
                    callb({ user: user })
                    this.$router.push('/')
                })
                .catch((error) => {
                    // const errorCode = error.code
                    const errorMessage = error.message
                    switch (error.code) {
                    case 'auth/invalid-email':
                        this.error = 'Invalid email'
                        break
                    case 'auth/email-already-in-use':
                        this.error = 'Email already in use'
                        break
                    case 'auth/weak-password':
                        this.error = 'Password is too weak'
                        break
                    default:
                        this.error = errorMessage
                    }
                    callb({ error: this.error })
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
                    const user = getUser(result.user.uid)
                    user.then((user) => {
                        if (user.exists()) {
                            this.user = user
                            this.uid = result.user.uid
                            // do something
                        } else {
                            console.log('why')
                            user = this.createDbUser({ userCredential: result, email: result.user.email })
                            this.user = result
                            this.uid = result.user.uid
                        }
                    })
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
        },

        addLocation (location) {
            const auth = getAuth(firebaseApp)
            const user = auth.currentUser
            if (user) {
                addLocationToUser(user.uid, location)

                this.user.data.savedLocations = {
                    ...this.user.data.savedLocations,
                    [location]: {}
                }
                console.log(this.user)
            } else {
                console.log('no user')
            }
        }
    }
})

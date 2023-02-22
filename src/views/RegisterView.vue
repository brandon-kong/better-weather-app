<template>
    <div class="container">
        <Navbar />
        <div class="register-container">
            <h1>Register</h1>
            <form class="form-container">
                <input class="form-element" type="text" placeholder="Email" v-model="email" />
                <input class="form-element" type="password" placeholder="Password" v-model="password" />
                <input class="form-element" type="submit" @click="register" value="Register" />
                <button @click="signInWithGoogle" class="form-element">Sign in with Google</button>
                <router-link class="form-element" to="/login">Already have an account?</router-link>
                <p v-if="error">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .register-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-width: 20rem;
        max-width: 40rem;
        margin: auto;
        gap: 1.5rem;

        padding: 2rem 0;

        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 20rem;
        margin: auto;
        gap: 1.5rem;
    }
    .form-element {
        display: block;
    }
</style>

<script>

// Authentication
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// Components
import Navbar from '@/components/Navbar/Main.vue'

export default {
    name: 'RegisterView',

    components: {
        Navbar
    },

    data () {
        return {
            email: '',
            password: '',
            error: ''
        }
    },

    methods: {
        register () {
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
                .then((userCredential) => {
                    console.log('HUIIIII')
                    // Signed in
                    // const user = userCredential.user
                    // ...
                    this.$router.push('/login')
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
                    // ..
                })
        },

        signInWithGoogle () {
            const provider = new GoogleAuthProvider()
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    this.$router.push('/about')
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
    }
}
</script>

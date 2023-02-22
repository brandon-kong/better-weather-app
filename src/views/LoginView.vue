<template>
    <div class="container">
        <Navbar />
        <h1>Login</h1>
        <form>
            <input type="email" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <input type="submit" @click="register" value="Login" />
            <p v-if="error">{{ error }}</p>
            <button @click="signInWithGoogle">Sign in with Google</button>
            <router-link to="/register">Don't have an account?</router-link>
        </form>
    </div>
</template>

<style scoped>

</style>

<script>

// Authentication
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

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
            signInWithEmailAndPassword(getAuth(), this.email, this.password)
                .then((userCredential) => {
                    console.log('HUIIIII')
                    // Signed in
                    // const user = userCredential.user
                    // ...
                })
                .catch((error) => {
                    // const errorCode = error.code
                    const errorMessage = error.message

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

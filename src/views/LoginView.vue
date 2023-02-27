<template>
    <div class="wrapper">
        <div class="container">
            <div class="grid-item home-left">
                <div class="mini-navbar left">
                    <IconNav />
                    <font-awesome-icon class="hamburger-icon" icon="fa-solid fa-bars"></font-awesome-icon>
                </div>
                <div class="stack-holder-center">
                    <img draggable="false" class="sign-up-img" src="@/assets/sign-up.svg" alt="logo" />
                    <h1 class="left-title">Stay connected with the world</h1>
                    <p class="left-subtitle">Get any location in this world's weather along with a plentiful amount of information!
                        The world is at your fingertips!
                    </p>
                </div>
            </div>
            <div class="grid-item home-right">
                <div class="mini-navbar right">
                    <Searchbox />
                    <IconList />
                </div>
                <div class="stack-holder-center">
                    <h1 class="right-title">Welcome back!</h1>
                    <p class="right-subtitle">Get back into action</p>
                    <div class="popup-class">
                        <button class="input-container brand-container" @click="signInWithGoogle">
                            <div class="google-icon">
                                <img draggable="false" class="brand-icon" src="@/assets/google-colored.svg" />
                            </div>
                            <div class="google-text">
                                <p>Sign in with Google</p>
                            </div>
                        </button>
                    </div>
                    <p>or</p>
                    <form class="form-container" autocomplete="off" @submit.prevent="login">
                        <input autocomplete="off" class="input-container email-input input" type="text" placeholder="Email Address" v-model="email"/>
                        <input autocomplete="off" class="input-container password-input input" type="password" placeholder="Password" readonly onfocus="this.removeAttribute('readonly');" v-model="password"/>
                        <input autocomplete="off" class="input-container submit-input" type="submit" value="Sign In" @click="login"/>
                    </form>
                    <p>Don't have an account? <router-link class="to-link" to="/register">Register here</router-link></p>
                    <p v-if="error" class="error">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 10rem;
        gap: 1rem;
        margin: 0;
    }
    .form-element {
        display: block;
    }

    .sign-up-img {
        width: 100%;
        max-width: 300px;
    }

    .container {
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: repeat(1, 1fr);

        height: 100vh;
    }

    .logo {
        cursor: pointer;
    }

    .hamburger-icon {
        display: none;
        cursor: pointer;
        font-size: var(--hamburger-icon-size);
        color: black;
    }

    .grid-item {
        padding: 2rem;
        grid-row: 1 / 1;
    }

    .mini-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 60px;
        min-height: 50px;
    }

    .mini-navbar.right {
        justify-content: flex-end;
        gap: 2rem;
    }

    .home-left {
        background-color: var(--color-primary-dark);
        color: #fff;
        border-bottom: 1px solid #f1f1f1;
    }

    .home-right {
        background-color: #fff;
        color: var(--color-primary);
        color: #aaa;

        background-size: cover;
        background-repeat: no-repeat;
    }

    .stack-holder-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70%;
        margin: auto;
        padding: 6rem 0;
        text-align: left;
        gap: 1rem;
    }

    .hero-img {
        width: 90%;
        height: 100%;
        object-fit: contain;
    }

    .stack-text {
        width: 70%;
        max-width: 500px;
        transition: all 0.5s ease;
    }

    .left-title {
        font-size: 2.5rem;
        font-weight: 700;
    }

    .left-subtitle {
        font-size: 1.2rem;
        font-weight: 100;
        line-height: 1.5;
    }

    .right-title {
        font-size: 2.5rem;
        font-weight: 900;
        color: #000;
    }

    .input-container {
        cursor: pointer;
        color: #757575;

        padding: .5rem 8rem;
        width: 30rem;
        border: 1px solid #ddd;

        font-size: 1rem;
        font-weight: 400;
        transition: all 0.1s ease;
    }

    .google-text {
        width: 10rem;
    }

    .brand-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        background-color: #fff;
    }

    .brand-container:hover {
        border: 1px solid #aaa;
        background-color: #f8f8f8;
    }

    .brand-icon {
        width: 1.5rem;
        height: 1.5rem;
    }

    .email {
        padding: .7rem;
    }

    .input {
        background-color: #eee;
        color: #555;
        border: 1px solid #dddddd00;
        padding: .7rem;
    }

    .input:focus {
        outline: none;
        background-color: #fff;
        border: 1px solid #ccc;
    }

    .submit-input {
        background-color: var(--color-primary);
        color: #fff;
        border: 1px solid var(--color-primary);
        font-weight: 700;
    }

    .submit-input:hover {
        background-color: var(--color-primary-dark);
        border: 1px solid var(--color-primary-dark);
    }

    .error {
        color: rgb(201, 65, 65);
        font-size: 1rem;
        font-weight: 400;
    }

    .to-link {
        color: var(--color-primary);
    }
</style>

<script>

// Authentication
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseApp } from '@/firebase'
// Components
import IconNav from '@/components/Home/IconNav.vue'
import Searchbox from '@/components/Searchbox/Main.vue'
import IconList from '@/components/IconList/Main.vue'
import Navbar from '@/components/Navbar/Main.vue'

export default {
    name: 'RegisterView',

    components: {
        Navbar,
        IconNav,
        Searchbox,
        IconList
    },

    data () {
        return {
            email: '',
            password: '',
            error: ''
        }
    },

    methods: {
        login () {
            signInWithEmailAndPassword(getAuth(firebaseApp), this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    // const user = userCredential.user
                    // ...
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

        signInWithGoogle () {
            const provider = new GoogleAuthProvider()
            signInWithPopup(getAuth(firebaseApp), provider)
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

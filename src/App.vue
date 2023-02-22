<template>
    <div class="container">
        <router-view v-slot="{ Component }" >
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path" />
            </transition>
        </router-view>
        <button v-if="loggedIn" @click="logout">Logout</button>
    </div>
</template>

<style>

:root {
    --color-primary: #a24ab0;
    --color-primary-dark: #9543a1;

    --font-normal: 'Mulish', sans-serif;

    --small-screens-width: 1000px;
    --hamburger-icon-size: 2rem;

}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

svg img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
}

#app {
    font-family: 'Mulish', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    background-color: #fff;
    color: #000;
    padding: 0;
    margin: 0;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

@font-face {
    font-family: 'Lato', sans-serif;
    src: url('~@/assets/fonts/Lato-Regular.ttf');
    font-weight: 300;
}

@font-face {
    font-family: 'Lato Light', sans-serif;
    src: url('~@/assets/fonts/Lato-Thin.ttf');
    font-weight: 100;
}

@font-face {
    font-family: 'Lato Bold', sans-serif;
    src: url('~@/assets/fonts/Lato-Bold.ttf');
    font-weight: 400;
}

@font-face {
    font-family: 'Mulish';
    src: url('~@/assets/fonts/Mulish/Mulish-Regular.ttf');
}

@font-face {
    font-family: 'Mulish';
    src: url('~@/assets/fonts/Mulish/Mulish-Bold.ttf');
    font-weight: 500;
}

@font-face {
    font-family: 'Mulish';
    src: url('~@/assets/fonts/Mulish/Mulish-Light.ttf');
    font-weight: 200;
}

    .fade-enter-active, .fade-leave-active {
        transition: opacity .75s ease, transform 1s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }

</style>

<script>

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
export default {
    name: 'App',
    components: {
    },

    mounted () {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.loggedIn = true
            } else {
                this.loggedIn = false
            }
        })
    },

    data () {
        return {
            loggedIn: false
        }
    },

    methods: {
        logout () {
            const auth = getAuth()
            signOut(auth).then(() => {
                this.$router.push('/login')
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

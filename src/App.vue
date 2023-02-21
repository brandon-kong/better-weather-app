<template>
    <div class="container">
        <router-view v-slot="{ Component }" >
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path" />
            </transition>
        </router-view>
    </div>
</template>

<style>

:root {
    --color-primary: #a24ab0;
    --color-primary-dark: #9543a1;

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
    font-family: 'Lato', sans-serif;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .75s ease, transform 1s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: translateY(30%);
    }

</style>

<script>

// States
// import Navbar from './components/Navbar/Main.vue'

export default {
    name: 'App',
    components: {
    }
}
</script>

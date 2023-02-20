<template>
    <router-view/>
    <footer>
        <p>
            For a guide and recipes on how to configure / customize this project,<br>
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
        </p>
    </footer>
</template>

<style>

:root {
    --color-primary: #a24ab0;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: #fff;
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
}

@font-face {
    font-family: 'Lato Light', sans-serif;
    src: url('~@/assets/fonts/Lato-Light.ttf');
}

@font-face {
    font-family: 'Lato Bold', sans-serif;
    src: url('~@/assets/fonts/Lato-Bold.ttf');
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

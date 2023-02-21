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
    --color-primary-dark: #883c94;

    --small-screens-width: 1000px;

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
    background-color: #ddd;
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

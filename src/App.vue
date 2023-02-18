<template>
    <Navbar/>
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
body, h1 {
   padding: 0;
   margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: #2c3e50;
    padding: 0;
    margin: 0;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

</style>

<script>

// States
import Navbar from './components/Navbar/Main.vue'

export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>

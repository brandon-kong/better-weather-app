<template>
    <nav class="container">
        <div class="nav-container">
            <h1 class="title">Weather</h1>
            <form @submit.stop.prevent="submit" class="search-form">
                <Searchbox v-model="search"/>
            </form>

            <IconList />
        </div>
    </nav>
</template>

<style scoped>
    .container {
        padding: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        border-bottom: 1px solid #ccc;
    }
    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        max-height: 60px;
        min-height: 50px;
    }

    .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: rgb(0, 0, 0);
    }

</style>

<script>

import Searchbox from '../Searchbox/Main.vue'
import IconList from '../IconList/Main.vue'

export default {
    name: 'NavBar',
    data () {
        return {
            search: '',
            msg: 'Welcome to Your Vue.js App'
        }
    },

    components: {
        Searchbox,
        IconList
    }
}

</script>

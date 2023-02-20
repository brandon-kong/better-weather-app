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
        padding: 0 2rem 0 2rem;
        padding-top: 20px;
        background: rgba(151, 149, 149, 0);

        position: absolute;
        top: 0px;
        width: 100%;
    }

    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 60px;
        min-height: 50px;
    }

    .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #a4a4a4;
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

<template>
    <nav class="container">
        <div class="nav-container">
            <IconNav :isWhite="isWhite" />
            <Searchbox v-show="showBar === true" class="search-box"/>

            <IconList class="icon-list"/>
            <font-awesome-icon class="hamburger-icon" icon="bars" />
        </div>
    </nav>
</template>

<style scoped>
    .container {
        padding: 0 2rem 0 2rem;
        padding-top: 20px;
        background: rgba(151, 149, 149, 0);

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

    .hamburger-icon {
        display: none;
        cursor: pointer;
        font-size: var(--hamburger-icon-size);
        color: black;
    }

    @media (max-width: 1000px) {
        .icon-list, .search-box {
            display: none;
        }

        .hamburger-icon {
            display: block;
        }
    }

</style>

<script>

import Searchbox from '@/components/Searchbox/Main.vue'
import IconList from '@/components/IconList/Main.vue'
import IconNav from '@/components/Home/IconNav.vue'

export default {
    name: 'NavBar',
    data () {
        return {
            search: '',
            msg: 'Welcome to Your Vue.js App'
        }
    },

    props: {
        isWhite: {
            type: Boolean,
            default: false
        },
        showBar: {
            type: Boolean,
            default: true
        }
    },

    components: {
        Searchbox,
        IconList,
        IconNav
    }
}

</script>

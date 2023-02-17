<template>
    <ul class="list">
        <li class="list-item" v-for="item in sites" v-bind:key="item">
            <a v-bind:href="item.url">
                <font-awesome-icon
                v-bind:icon="item.icon"
                class="icon"
            />
            </a>
        </li>
    </ul>
</template>

<style scoped>
    .list {
        list-style: none;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        gap: 1rem;
    }

    .icon {
        font-size: 1.8rem;
        color: #303030;
    }
</style>

<script>

export default {
    name: 'IconList',
    data () {
        return {
            sites: [
                {
                    id: 1,
                    icon: 'fa-brands fa-github',
                    url: 'https://github.com/brandon-kong/better-weather-app'
                },
                {
                    id: 2,
                    icon: 'fa-brands fa-twitter',
                    url: 'https://google.com'
                }
            ],
            msg: 'Welcome to Your Vue.js App'
        }
    },

    created () {
    }
}

</script>

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
        font-size: 1.3rem;
        color: #a4a4a4;
        opacity: 0.3;
        transition: all 0.3s ease;
    }

    .icon:hover {
        opacity: 0.7;
    }
</style>

<script>

export default {
    name: 'IconList',
    data () {
        return {
            sites: [
                {
                    icon: 'fa-brands fa-github',
                    url: 'https://github.com/brandon-kong/better-weather-app'
                },
                {
                    icon: 'fa-brands fa-twitter',
                    url: 'https://google.com'
                }
            ]
        }
    },

    created () {
    }
}

</script>

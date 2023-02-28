<template>
    <section class="saved-locations">
        <h1 class="content-title">Saved Locations ({{ getDictLength(locations) }})</h1>

        <ul v-if="getDictLength(locations) > 0" class="location-list">
            <li v-for="location in locations" :key="location.id">
                <div class="saved-locations-container">
                    <div class="saved-location">
                        <div class="location-name">
                            <h2 class="location-n">{{ location.name }}</h2>
                            <p class="location-ct">{{ location.city }}, {{ location.country }}</p>
                        </div>
                        <div class="location-weather">
                            <div class="location-weather-current">
                                <h3>Current Temp</h3>
                            </div>
                            <div class="location-weather-apparent">
                                <h3>Feels Like</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else >
            <div class="no-saved-locations-widget">
                <img draggable="false" src="@/assets/noresults.svg" alt="No Saved Locations" width="200">
                <p class="no-locations-text">No Saved Locations</p>
                <RouterButton to="/search">Search Locations</RouterButton>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .saved-locations {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 2rem;
        padding: 50px 0;
        background-color: #fff;
    }

    .content-title {
        font-size: 2rem;
        color: #333;
    }

    .no-saved-locations-widget {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .no-locations-text {
        font-size: 1rem;
        padding: 1rem 0;
        text-align: center;
        color: #333;
    }

    .location-list {
        list-style: none;
    }
    .saved-location {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        text-align: center;

        background-color: #eee;
        min-height: 300px;
        padding: 2rem;
        border-radius: 10px;
    }

    .location-n {
        font-size: 1.5rem;
        color: #333;
        padding-bottom: 1rem;
    }
</style>

<script>

import RouterButton from '@/components/Home/RouterButton.vue'

export default {
    name: 'SavedLocations',

    data () {
        return {
            savedWeather: []
        }
    },

    components: {
        RouterButton
    },

    props: {
        locations: {
            type: Array,
            required: true
        }
    },

    methods: {
        getDictLength (dict) {
            return Object.keys(dict).length
        }
    }
}

</script>

<template>
    <section class="saved-locations">
        <h1 class="content-title">Saved Locations ({{ getDictLength(locations) }})</h1>

        <ul v-if="getDictLength(locations) > 0" class="location-list">
            <li v-for="(location, index) in getSlicedEntries(locations)" :key="index">
                <div class="saved-locations-container">
                    <div class="saved-location" @click="getWeather(location)">
                        <div class="location-name">
                            <h2 class="location-n">{{ location.data.address_line1 }}</h2>
                            <p class="location-ct">{{ location.data.city || location.data.county }}, {{ location.data.country }}</p>
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
        <RouterButton to="/search">Find more locations</RouterButton>
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
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
    .saved-location {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        text-align: center;

        background-color: #eee;
        min-height: 300px;
        padding: 2rem;
        border-radius: 10px;

        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .saved-location:hover {
        background-color: #dedede;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
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
            type: Object,
            required: true
        }
    },

    methods: {
        getDictLength (dict) {
            return Object.keys(dict).length
        },

        getSlicedEntries (dict) {
            const sliced = Object.fromEntries(
                Object.entries(this.locations).slice(0, 5)
            )

            return sliced
        },

        getWeather (location) {
            this.$router.push({
                path: '/weather',
                query: {
                    lat: location.data.lat,
                    lon: location.data.lon,
                    location: 'hi'
                }
            })
        }
    }
}

</script>

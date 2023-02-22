<template>
    <section class="saved-locations">
        <h1 class="content-title">Saved Locations ({{ getWeatherLength() }})</h1>

        <ul v-if="savedWeather.length > 0">
            <li v-for="location in savedWeather" :key="location.id">
                <div class="saved-locations-container">
                    <div class="saved-location">
                        <div class="location-name">
                            <h2>Location Name</h2>
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

    methods: {
        getSavedWeather () {
            this.savedWeather = this.$store.getters.getSavedWeather
        },

        getWeatherLength () {
            return Object.keys(this.savedWeather).length
        }
    }
}

</script>

<template>
    <div class="home">
        <div v-if="location === null && loading === false">
            <p>Get the weather?</p>
            <Button v-on:click="getWeather">Get Weather</Button>
        </div>
        <div v-else-if="location === null && loading === true">
            <p>Loading...</p>
        </div>
        <div v-else>
            <p>Weather for {{ location.city }}, {{ location.region }}</p>
            <p>Current Temp: {{ location.temp }}°F</p>
            <p>Feels Like: {{ location.feelsLike }}°F</p>
            <p>Humidity: {{ location.humidity }}%</p>
            <p>Wind Speed: {{ location.windSpeed }} mph</p>
            <p>Wind Direction: {{ location.windDirection }}</p>
            <p>Weather: {{ location.weather }}</p>
            <p>Weather Description: {{ location.weatherDescription }}</p>
            <p>Weather Icon: {{ location.weatherIcon }}</p>
            <p>Weather Icon URL: {{ location.weatherIconUrl }}</p>
        </div>
    </div>
</template>

<script>

import { useLocationStore } from '@/stores/LocationStore'

// Components
import Button from '@/components/Home/Button.vue'

export default {
    name: 'HomeView',
    data () {
        return {
            loading: false,
            location: null
        }
    },

    components: {
        Button
    },

    created () {
    },

    methods: {
        getWeather () {
            if (this.loading) return
            this.loading = true
            const locationStore = useLocationStore()
            locationStore.getLocation.then((location) => {
                this.location = location
                this.loading = false
            })
        }
    }
}

</script>

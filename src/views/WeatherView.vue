<template>
    <div>
        <h1>{{ location }}</h1>
        <p> {{ weather }}</p>

        <router-link to="/search">Back</router-link>
    </div>
</template>

<script>

import { GetWeatherQuery } from '@/weather';

export default {
    name: 'WeatherView',

    data () {
        return {
            weather: {},
            location: null
        }
    },

    created () {
        this.location = this.$route.query.location
        this.getWeather(this.$route.query.lat, this.$route.query.lon)
    },

    methods: {
        getWeather (lat, lon) {
            const query = GetWeatherQuery({ lat, lon }, this.weatherCallback);
        },

        weatherCallback (weather) {
            this.weather = weather
            console.log(weather)
        }
    }
}

</script>

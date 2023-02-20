<template>
    <div class="container">
        <div class="grid-item home-left">
            <div class="mini-navbar left">
                <img src="@/assets/logo.png" alt="logo" width="80" />
            </div>
            <StackText />
        </div>
        <div class="grid-item home-right">
            <div class="mini-navbar right">
                <Searchbox />
                <IconList />
            </div>
        </div>
    </div>
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
            <p>Current Temp: {{ clientWeather.currentTemp }}°F</p>
            <p>Feels Like: {{ clientWeather.apparentTemp }}°F</p>
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

<style>

    body {
        background-color: #000;
        color: #fff;
    }

    .container {
        display: grid;
        grid-template-columns: 5fr 6fr;
    }

    .grid-item {
        padding: 2rem;
    }

    .mini-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 60px;
        min-height: 50px;
    }

    .mini-navbar.left {
        padding-bottom: 10rem;
    }

    .mini-navbar.right {
        justify-content: flex-end;
        gap: 2rem;
    }

    .home-left {
        grid-column-start: 1;
        grid-column-end: 1;
        background-color: #fff;
        color: #000;

        height: 50vh;
    }

    .home-right {
        grid-column-start: 2;
        grid-column-end: 2;
        background-color: #000;
        color: #fff;

        height: 50vh;
    }
</style>
<script>

import { useLocationStore } from '@/stores/LocationStore'

// Components
import Button from '@/components/Home/Button.vue'
import Searchbox from '@/components/Searchbox/Main.vue'
import IconList from '@/components/IconList/Main.vue'
import StackText from '@/components/StackText/Main.vue'

export default {
    name: 'HomeView',
    data () {
        return {
            loading: false,
            location: null,
            clientWeather: {}
        }
    },

    components: {
        Button,
        Searchbox,
        IconList,
        StackText
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

                // console.log(location.coords)
                const b = locationStore.getWeather(location.coords.latitude, location.coords.longitude)
                b.then((weather) => {
                    console.log(weather)
                    this.clientWeather.currentTemp = weather.hourly.temperature_2m[0]
                    this.clientWeather.apparentTemp = weather.hourly.apparent_temperature[0]
                })
            })
        }
    }
}

</script>

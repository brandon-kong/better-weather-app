<template>
    <div class="wrapper">
        <Navbar />
        <Button to="/">Go back!</Button>
    </div>
</template>

<style scoped>
</style>
<script>

import { useLocationStore } from '@/stores/LocationStore'

// Components
import Navbar from '@/components/Navbar/Main.vue'
import Button from '@/components/Home/RouterButton.vue'

export default {
    name: 'AboutView',
    data () {
        return {
            loading: false,
            location: null,
            clientWeather: {}
        }
    },

    components: {
        Navbar,
        Button
    },

    watch: {
        $route: {
            immediate: true,
            handler (to, from) {
                document.title = to.meta.title || 'Weather App'
            }
        }
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

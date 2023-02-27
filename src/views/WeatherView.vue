<template>
    <div class="weather-wea">
        <Navbar />
        <div class="weather-container">
            <div class="weather-top">
            <div class="weather-top-left">
                <h1 id="location">{{ location }}</h1>
                <p id="chanceOfRain">Chance of rain: {{ weather.currentConditions.precip }}%</p>

                <h1 id="temp"> {{ weather.currentConditions.temp }} °F</h1>
            </div>
            <div class="weather-top-right">
                <img draggable="false" class="weather-icon" v-bind:src="getImgUrl(weather.currentConditions.icon)" alt="weather icon">
            </div>
        </div>
        <div class="weather-content">
            <div class="hourly-weather">
                <p class="forecast-title">Hourly forecast</p>
                <div class="hourly-weather-item">
                    <ul class="hour-list">
                        <li class="hour-item" v-for="hour in weather.days[0].hours" :key="hour.datetime">
                            <p class="hourly-hour">{{ getFormattedHour(hour.datetime) == getFormattedHour(weather.currentConditions.datetime) && 'Now' || getHour(hour.datetime) }}</p>
                            <img draggable="false" class="weather-icon-hourly" v-bind:src="getImgUrl(hour.icon)" alt="weather icon">
                            <p class="hourly-temp">{{ hour.temp }}°F</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="daily-forecast">
            </div>
        </div>
        <router-link to="/search">Back</router-link>
        </div>
    </div>
</template>

<style scoped>
.weather-container {
    padding: 2rem 4rem;
    padding-top: 0;
}

#location {
    max-width: 75%;
}

.weather-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
}

.weather-top-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .4rem;
}

#chanceOfRain {
    font-size: 1.2rem;
    color: #aaa;
}

#temp {
    padding-top: 3rem;
    font-size: 3.5rem;
    font-weight: 800;
}

.weather-icon {
    width: 100%;
    aspect-ratio: 1/1;
}
.weather-content {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}

.hourly-weather {
    padding: 1rem;
    background-color: #eee;
    border-radius: 10px;
}

.daily-forecast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background-color: #eee;
    border-radius: 10px;
}

.forecast-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #555;
    padding-bottom: .5rem;
}

.hour-list {
    list-style: none;
    display: flex;

    overflow: auto;
    white-space: nowrap;
}

.hour-item {
    padding: 1rem 1rem;
    display: inline-block;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

}

.weather-icon-hourly {
    max-width: 3rem;
    aspect-ratio: 1/1;
}

.hourly-hour {
    font-size: 1.4rem;
    color: #555;
}
.hourly-temp {
    font-size: 1.2rem;
}

</style>

<script>

import { GetWeatherQuery } from '@/weather'

import Navbar from '@/components/Navbar/Main.vue'

export default {
    name: 'WeatherView',

    data () {
        return {
            weather: {},
            location: null
        }
    },

    components: {
        Navbar
    },

    created () {
        this.location = this.$route.query.location
        this.getWeather(this.$route.query.lat, this.$route.query.lon)
    },

    methods: {
        getWeather (lat, lon) {
            GetWeatherQuery({ lat, lon }, this.weatherCallback)
        },

        weatherCallback (weather) {
            this.weather = weather
        },

        getImgUrl (pic) {
            return require('@/assets/weather/' + pic + '.svg')
        },

        getHour (datetime) {
            const hour = datetime.split(':')[0]
            let hourInt = parseInt(hour)
            let ampm = 'AM'
            if (hourInt > 12) {
                hourInt -= 12
                ampm = 'PM'
            }
            if (hourInt === 12) {
                ampm = 'PM'
            }
            if (hourInt === 0) {
                hourInt = 12
            }
            return hourInt + ampm
        },

        getFormattedHour (datetime) {
            return datetime.split(':')[0]
        }
    }
}

</script>

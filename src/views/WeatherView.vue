<template>
    <div class="weather" v-if="weather !== null">
        <Navbar />
        <div class="weather-container">
            <div class="weather-top">
            <div class="weather-top-left">
                <h1 id="location">{{ location || weather.resolvedAddress }}</h1>
                <p id="chanceOfRain">Chance of rain: {{ weather.currentConditions.precip }}%</p>

                <h1 id="temp"> {{ weather.currentConditions.temp }} °F</h1>
                <Button v-if="isSavedLocation == false" @click="addToList(weather.latitude+','+weather.longitude)">Add to list</Button>
                <Button v-else @click="removeFromList(weather.latitude+','+weather.longitude)">Remove from list</Button>
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
        </div>
        <router-link to="/search">Back</router-link>
    </div>

    <div v-else>
        {{ error }}
        <router-link to="/search">Back</router-link>
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
    font-size: 3.5rem;
    font-weight: 800;
    padding: 3rem 0;
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
import { useUserStore } from '@/stores/UserStore'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/firebase'

import Button from '@/components/Home/Button.vue'

const userStore = useUserStore()

export default {
    name: 'WeatherView',

    data () {
        return {
            weather: null,
            location: null,
            error: null,
            isSavedLocation: false
        }
    },

    components: {
        Navbar,
        Button
    },

    created () {
        this.queryWeather()
    },

    mounted () {
        this.isSaved().then(isSaved => {
            const auth = getAuth(firebaseApp)
            auth.onAuthStateChanged(user => {
                if (user) {
                    if (this.weather) {
                        this.isSaved().then(isSaved => {
                            this.isSavedLocation = isSaved
                        })
                    }
                }
            })
            this.isSavedLocation = isSaved
        })
    },

    watch: {
        '$route.query': 'queryWeather',
        weather: 'isSaved'
    },

    methods: {
        getWeather ({ lat, lon, name }) {
            if (name !== undefined) {
                GetWeatherQuery({ name }, this.weatherCallback)
                return
            }
            GetWeatherQuery({ lat, lon }, this.weatherCallback)
        },

        weatherCallback (_, { data, error }) {
            if (error) {
                switch (error.code) {
                case 'ECONNREFUSED':
                    this.error = 'Could not connect to weather server'
                    break
                case 'ERR_BAD_REQUEST':
                    this.error = 'Invalid location'
                    break
                default:
                    this.error = error.message
                }
            } else {
                this.weather = data
                // this.isSavedLocation = userStore.savedLocations.some(location => location.name === this.weather.location.name)
            }
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
        },

        queryWeather () {
            this.location = this.$route.query.location
            if (this.$route.query.name !== undefined) {
                this.getWeather({ name: this.$route.query.name })
            } else {
                this.getWeather({ lat: this.$route.query.lat, lon: this.$route.query.lon })
            }
        },

        addToList (id) {
            const auth = getAuth(firebaseApp)
            const user = auth.currentUser
            if (user) {
                userStore.addLocation(id)
                this.isSavedLocation = true
            } else {
                alert('You must be logged in to add to your list')
            }
        },

        removeFromList (id) {
            const auth = getAuth(firebaseApp)
            const user = auth.currentUser
            if (user) {
                userStore.removeLocation(id)
                this.isSavedLocation = false
            } else {
                alert('You must be logged in to remove from your list')
            }
        },

        async isSaved () {
            console.log('bnyeasdf')
            const auth = getAuth(firebaseApp)
            const user = auth.currentUser
            if (user) {
                const b = await userStore.isSaved(this.weather.latitude + ',' + this.weather.longitude)
                console.log(b)
                return b
            }
            return false
        }
    }
}

</script>

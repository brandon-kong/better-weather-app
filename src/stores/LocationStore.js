import { defineStore } from 'pinia'
import axios from 'axios'

export const useLocationStore = defineStore('LocationStore', {

    // state
    state: () => {
        return {
            location: {
                city: 'London',
                country: 'UK',
                longitude: 0,
                latitude: 0
            }
        }
    },

    // actions
    actions: {
        async getWeather (lat, lon) {
            return axios({
                method: 'get',
                url: 'https://api.open-meteo.com/v1/forecast',
                params: {
                    latitude: lat,
                    longitude: lon,
                    hourly: 'temperature_2m,apparent_temperature',
                    temperature_unit: 'fahrenheit'
                }
            })
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
            /* axios.get('https://api.open-meteo.com/v1/forecast', {
                latitude: lat,
                longitude: lon
                // hourly: 'temperature_2m'
            })
                .then(function (response) {
                    console.log(response)
                    return response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
            */
        }
    },

    // getters
    getters: {
        getLocation (state) {
            return new Promise((resolve, reject) => {
                return navigator.geolocation.getCurrentPosition(function (location) {
                    resolve(location)
                }, reject)
            })
        }
    }
})

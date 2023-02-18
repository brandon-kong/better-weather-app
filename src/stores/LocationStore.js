import { defineStore } from 'pinia'

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
    actions: {},

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

<template>
    <div class="wrapper">
        <div class="block">
            <div class="container">
                <div class="grid-item home-left">
                    <div class="mini-navbar left">
                        <IconNav />
                        <font-awesome-icon class="hamburger-icon" icon="fa-solid fa-bars"></font-awesome-icon>
                    </div>
                    <div class="stack-holder-center">
                        <StackText class="stack-text"
                            status="Home"
                            title="Weather App Made With Vue.js"
                            subtitle="Easy and extensive"
                            text="This is a simple weather app that uses the OpenWeatherMap API to get the weather for your location. It also uses the IP Geolocation API to get your location. This app was made using Vue.js and Tailwind CSS."
                            to="/register"
                            />
                    </div>
                </div>
                <div class="grid-item home-right">
                    <div class="mini-navbar right">
                        <Searchbox />
                        <IconList />
                    </div>
                    <div class="stack-holder-center">
                        <img draggable="false" class="hero-img" src="@/assets/cloud.svg" alt="hero" />
                    </div>
                </div>
            </div>
        </div>
        <div class="home">
            <SavedLocations :locations="savedLocations" />
        </div>
    </div>
</template>

<style scoped>

    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(1, 1fr);

        min-height: 100vh;
        transition: all 0.5s ease;
    }

    .logo {
        cursor: pointer;
    }

    .hamburger-icon {
        display: none;
        cursor: pointer;
        font-size: var(--hamburger-icon-size);
        color: black;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            display: block;
            grid-template-columns: 1fr;
            grid-template-rows: 600px 600px;
        }

        .grid-item {
            grid-column-start: 1 !important;
            grid-column-end: 3 !important;
        }

        .home-left {
            grid-row-start: 1 !important;
            grid-row-end: 2 !important;
        }

        .home-right {
            grid-row-start: 2 !important;
            grid-row-end: 3 !important;
        }

        .stack-text {
            width: 20rem;
            align-items: center;
            text-align: center;
        }

        .mini-navbar.right {
            display: none;
        }

        .hamburger-icon {
            display: block;
        }
    }

    @media (max-width: 768px) {
        .container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
        }

        .home-right {
            grid-column-start: 1;
            grid-row-start: 2;
            grid-row-end: 2;
        }
    }

    .grid-item {
        padding: 2rem;
        grid-row-start: 1;
        grid-row-end: 2;
    }

    .mini-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 60px;
        min-height: 50px;
    }

    .mini-navbar.right {
        justify-content: flex-end;
        gap: 2rem;
    }

    .home-left {
        background-color: #fff;
        color: #000;
        border-bottom: 1px solid #f1f1f1;
    }

    .home-right {
        background-color: #f1f1f1;
        color: #fff;

        background-size: cover;
        background-repeat: no-repeat;
    }

    .stack-holder-center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 60px);

        padding: 6rem 0;
    }

    .hero-img {
        width: 90%;
        height: 100%;
        object-fit: contain;
    }

    .stack-text {
        width: 70%;
        max-width: 500px;
        transition: all 0.5s ease;
    }

</style>
<script>

import { useLocationStore } from '@/stores/LocationStore'

// Components
import IconNav from '@/components/Home/IconNav.vue'
import Button from '@/components/Home/Button.vue'
import Searchbox from '@/components/Searchbox/Main.vue'
import IconList from '@/components/IconList/Main.vue'
import StackText from '@/components/StackText/Main.vue'
import SavedLocations from '@/components/Home/SavedLocations/Main.vue'

import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { firebaseApp, getLocations } from '@/firebase'

export default {
    name: 'HomeView',
    data () {
        return {
            loading: false,
            location: null,
            savedLocations: [],
            num: 0
        }
    },

    components: {
        Button,
        Searchbox,
        IconList,
        StackText,
        IconNav,
        SavedLocations
    },

    watch: {
        $route: {
            immediate: true,
            handler (to, from) {
                document.title = to.meta.title || 'Weather App'
            }
        }
    },

    mounted () {
        const auth = getAuth(firebaseApp)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.getSavedLocations(user)
            }
        })
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
                    this.clientWeather.currentTemp = weather.hourly.temperature_2m[0]
                    this.clientWeather.apparentTemp = weather.hourly.apparent_temperature[0]
                })
            })
        },

        async getSavedLocations (user) {
            if (user) {
                getLocations(user.uid, this.savedLocationCb)
            }
        },

        savedLocationCb (location) {
            this.savedLocations = location
        }
    }
}

</script>

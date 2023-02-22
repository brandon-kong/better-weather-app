import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// Importing icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Specific icons
import { faGithub, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

// Firebase
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

// State management
import { createPinia } from 'pinia'
const pinia = createPinia()

// Creating the app
const app = createApp(App)

// Adding icons to the library
library.add(faGithub, faTwitter, faBars, faGoogle)

// Initialize Firebase

const firebaseConfig = {
    apiKey: 'AIzaSyBi7hiHKKLEnisccdpVQ2nPsHIgv8DxR0s',
    authDomain: 'weather-app-6e278.firebaseapp.com',
    projectId: 'weather-app-6e278',
    storageBucket: 'weather-app-6e278.appspot.com',
    messagingSenderId: '24353071789',
    appId: '1:24353071789:web:0c8e064a02185fe5b29c24',
    measurementId: 'G-J6EKR1GKY5'
}

initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)

// Mounting the app
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

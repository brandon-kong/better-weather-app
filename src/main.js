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

// State management
import { createPinia } from 'pinia'
const pinia = createPinia()

// Creating the app
const app = createApp(App)

// Adding icons to the library
library.add(faGithub, faTwitter, faBars, faGoogle)

// Mounting the app
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

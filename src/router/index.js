import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/firebase'

import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: false }
    },

    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/AboutView.vue'),
        meta: { requiresAuth: true }
    },

    {
        path: '/search',
        name: 'search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/SearchView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/register',
        name: 'register',

        component: () => import('@/views/RegisterView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/login',
        name: 'login',

        component: () => import('@/views/LoginView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/weather/:place',
        name: 'weather',

        component: () => import('@/views/WeatherView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/PageNotFound.vue'),
        meta: { requiresAuth: false }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const testing = false

router.beforeEach((to, from) => {
    const auth = getAuth(firebaseApp)
    if (to.meta.requiresAuth) {
        if (auth.currentUser) {
            return true
        } else {
            return { name: 'register' }
        }
    } else {
        if (auth.currentUser) {
            if (to.name === 'login' || to.name === 'register') {
                if (testing) {
                    return true
                } else return { name: 'home' }
            }
        }
    }
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true }
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

router.beforeEach((to, from) => {
    const auth = getAuth()
    if (to.meta.requiresAuth) {
        if (auth.currentUser) {
            return true
        } else {
            return false
        }
    } else {
        if (auth.currentUser) {
            if (to.name === 'login' || to.name === 'register') {
                return { name: 'home' }
            }
        }
    }
})

export default router

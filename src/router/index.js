import Vue from 'vue'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/Dashboard'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
]

export default new Router({
    mode: 'history',
    routes
})
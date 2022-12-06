// app.js

import * as bootstrap from './bootstrap'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from './Pages/Home.vue'
import Login from './Pages/Login.vue'
import Register from './Pages/Register.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp({})
    .use(router)
    .mount("#app")

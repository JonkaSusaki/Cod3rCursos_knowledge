import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../components/home/Home.vue'
import AdminPage from '../components/admin/AdminPage.vue'
import ArticlePage from '../components/article/ArticlePage.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import Auth from '../components/auth/Auth.vue'
import {userKey} from '@/global.js'

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    }, {
        name: 'admin',
        path: '/admin',
        component: AdminPage,
        meta: {requireAdmin: true}

    }, {
        name: 'articlePage',
        path: '/articles/:id',
        component: ArticlePage
    }, {
        name: 'articlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    }, {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requireAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({path: '/'})

    } else {
        next()
    }
})

export default router
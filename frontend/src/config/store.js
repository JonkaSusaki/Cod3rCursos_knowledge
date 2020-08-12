import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        MenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state) {
            state.MenuVisible = !state.MenuVisible
            console.log(`MenuVisible = ${state.MenuVisible}`)
        },
        setUser(state, user) {
            state.user = user

            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        }
    }
})

export default store
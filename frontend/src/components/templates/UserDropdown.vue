<template>
    <div class="dropdown">
        <div class="dropdownButton">
            <span>{{user.name}}</span>
            <Gravatar class="gravatar" :email="user.email"/>
            <span>
                <i class="fa fa-angle-down"></i>
            </span>
        </div>

        <div class="dropdownInfo">
            <router-link class="link" to="/">
                <i class="fa fa-home"></i>
                Pagina Inicial
            </router-link>
            <router-link class="link" to="/admin">
                <i class="fa fa-cogs"></i>
                Administração
            </router-link>
            <div class="out link" @click="signOut">
                <i class="fa fa-sign-out"></i>
                Sair
            </div>
        </div>
    </div>
</template>

<script>
import Gravatar from 'vue-gravatar'
import {mapState} from 'vuex'
import {userKey} from '@/global.js'

export default {
    name: 'UserDropdown',
    components: {Gravatar},
    computed: mapState(['user']),
    methods: {
        signOut() {
            this.$store.commit('setUser', null)
            localStorage.removeItem(userKey)
            this.$router.push({name: 'auth'})
        }
    }
}
</script>

<style>
.dropdown {
    display: flex;
    flex-direction: column;
    position: relative;
}

.dropdownInfo {
    position: absolute;
    margin-top: 80px;
    right: 0;
    font-size: 1.1rem;

    display: flex;
    flex-direction: column;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0.5s, opacity 0.5s linear;
}

.dropdownInfo .link {
    margin-top: 10px;
    background: #b2bec3;
    padding: 5px;
    border-radius: 8px;
}


.dropdownButton {
    display: flex;
    align-items: center;

    padding-right: 10px;
    margin: 0;
    height: 80px;
}

.dropdownButton:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

.dropdown:hover .dropdownInfo {
    visibility: visible;
    opacity: 1;
}

.dropdownButton span {
    margin: 0 5px;
}

.gravatar {
    margin: 0 5px;
    max-height: 60px;
    border-radius: 5px;
}

.link:hover {
    text-decoration: none;
}

.out {
    cursor: pointer;
    color: #487eb0;
}

.out:hover {
    color: #40739e;
}
</style>
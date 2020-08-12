<template>
    <div class="header">
        <div class="oi" v-if="!showUserDropdown"></div>

        <div class="toggle" @click="toggleMenu" v-if="showUserDropdown">
            <i :class="icon"></i>
        </div>

        <span>Projeto1 - VueJs</span>

        <div class="oi" v-if="!showUserDropdown"></div>
        <UserDropdown v-if="showUserDropdown"/>
        
    </div>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    props: {
        showUserDropdown: Boolean
    },
    components: {
        UserDropdown
    },
    computed: {
        icon() {
            return this.$store.state.MenuVisible ? "fa fa-angle-left" : "fa fa-angle-down"
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
.header {
    grid-area: header;
    background: linear-gradient(to right, #8360c3, #2ebf91);

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.toggle {
    height: 80px;
    width: 80px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle:hover {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
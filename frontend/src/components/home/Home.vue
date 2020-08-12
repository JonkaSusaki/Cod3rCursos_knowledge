<template>
    <div class="home">
        <PageTitle title="Pagina Inicial" sub="Projeto 1 - VueJs" icon="fa fa-home fa-lg"/>

        <div class="stats">
            <Stat name="Artigos" icon="fa fa-file" color="#9b59b6" :value="stats.articles"/>
            <Stat name="Categorias" icon="fa fa-folder" color="#2980b9" :value="stats.categories"/>
            <Stat name="Usuários" icon="fa fa-users" color="#1abc9c" :value="stats.users"/>
        </div>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import {baseApi} from '@/global'

export default {
    name: 'Home',
    components: {
        PageTitle,
        Stat
    },
    data() {
        return {
            stats: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApi}/stats`)
                .then(res => {
                    this.stats = res.data
                    localStorage.setItem('stat', JSON.stringify(this.stats) )
                })
                .catch(() => this.stats = JSON.parse(localStorage.getItem('stat')))
        },
        oi() {
            console.log('oi')
        }
    },
    mounted() {
        this.getStats()
        this.oi()
    }
}
</script>

<style>
.stats {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>
<template>
    <div class="articlesList">
        <PageTitle :title="category.name" 
            sub="Categoria" 
            icon="fa fa-folder-o"/>
            
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article"/>
            </li>
        </ul>

        <div class="loadMore">
            <button v-if="loadMore" 
                @click="getArticles" 
                class="btn btn-lg btn-outline-primary">

                Carregar Mais Artigos
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApi} from '@/global.js'
import ArticleItem from './ArticleItem'
import PageTitle from '../templates/PageTitle'

export default {
    name: 'ArticlesByCategory',
    components: {
        ArticleItem,
        PageTitle
    },
    data() {
        return {
            articles: [],
            category: {},
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            axios.get(`${baseApi}/categories/${this.category.id}`)
                .then(res => this.category = res.data)
        },
        getArticles() {
            axios.get(`${baseApi}/categories/${this.category.id}/articles?page=${this.page}`)
                .then(res => {
                    this.articles = this.articles.concat(res.data)
                    this.page++
                    console.log(res.data.lenght)

                    if (res.data.lenght == 0 /* || res.data.lenght == undefined */) this.loadMore = false
                })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
.loadMore {
    display: flex;
    justify-content: center;
    
    margin-top: 30px;
}
</style>
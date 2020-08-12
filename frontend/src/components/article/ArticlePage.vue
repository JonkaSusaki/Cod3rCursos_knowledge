<template>
    <div class="articlePage">
        <PageTitle icon="fa fa-file" :title="article.name" :sub="article.description"/>
        <b-card class="content" v-html="article.content">
            
        </b-card>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import axios from 'axios'
import {baseApi} from '@/global.js'

export default {
    name: 'ArticlePage',
    components: {
        PageTitle
    },
    data() {
        return {
            article: {}
        }
    },
    methods: {
        getArticle() {
            const url = `${baseApi}/articles/${this.$route.params.id}`
            axios.get(url)
                .then(res => this.article = res.data)
        }
    },
    mounted() {
        this.getArticle()
    }
}
</script>

<style>
.content {
    font-size: 1.4rem;
    border-radius: 8px;
}
</style>
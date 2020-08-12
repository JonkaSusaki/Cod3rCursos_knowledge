<template>
    <div class="articleAdmin">
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Nome:" label-for="article-name">
                        <b-form-input id="article-name" 
                            v-model="article.name" 
                            placeholder="Informe o Nome..."
                            :readonly="mode == 'remove'">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Url da imagem:" label-for="article-image">
                        <b-form-input id="article-image" 
                            v-model="article.imageUrl" 
                            placeholder="Informe a url da Imagem..."
                            :readonly="mode == 'remove'">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Descrição:" label-for="article-description">
                        <b-form-input id="article-description" 
                            v-model="article.description"
                            placeholder="Descreva o Artigo..."
                            :readonly="mode == 'remove'">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Categoria:" label-for="article-category">
                        <b-form-select id="article-category"
                            v-model="article.categoryId"
                            :options="categories">
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Autor:" label-for="article-author">
                        <b-form-select id="article-author"
                            v-model="article.userId"
                            :options="users">
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Conteúdo:" label-for="article-content">
                        <VueEditor id="article-content"
                            v-model="article.content"
                            placeholder="Digite o conteúdo do Artigo..."/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-4">
                <b-col>
                    <b-button v-if="mode == 'remove'" variant="danger" @click="remove">Excluir</b-button>
                    <b-button v-if="mode == 'save'" variant="primary" @click="save">Salvar</b-button>
                    <b-button class="ml-3" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table striped hover :items="articles" :fields="fields">
            <template v-slot:cell(actions)="data">
                <b-button class="mr-3 mb-2" variant="warning" @click="loadArticle(data.item.id)">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button class="mb-2" variant="danger" @click="loadArticle(data.item.id, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>

        <b-pagination v-model="page" :total-rows="count" :per-page="limit" />

    </div>
</template>

<script>
import axios from 'axios'
import {baseApi} from '@/global.js'
import {VueEditor} from 'vue2-editor'

export default {
    name: 'ArticleAdmin',
    components: {VueEditor},
    data() {
        return {
            mode: 'save',
            articles: [],
            page: 1,
            count: 0,
            limit: 0,
            article: {},
            categories: [],
            users: [],
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'description', label: 'Descrição', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        listArticles() {
            axios.get(`${baseApi}/articles?page=${this.page}`)
                .then(res => {
                    this.articles = res.data.data
                    this.count = res.data.count
                    this.limit = res.data.limit
                })
        },
        listCategories() {
            axios.get(`${baseApi}/categories`)
                .then(res => {
                    this.categories = res.data.map(category => {
                        return {...category, value: category.id, text: category.name}
                    })
                })
        },
        listUsers() {
            axios.get(`${baseApi}/users`)
                .then(res => {
                    this.users = res.data.map(user => {
                        return {...user, value: user.id, text: user.name + ' - ' + user.email}
                    })
                })
        },
        reset() {
            this.article = {}
            this.mode = 'save'
            this.listArticles()
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''

            axios[method](`${baseApi}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Artigo salvo com Sucesso!'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))

        },
        remove() {
            axios.delete(`${baseApi}/articles/${this.article.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Artigo excluído com Sucesso!'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))
        },
        loadArticle(id, mode ='save') {
            axios.get(`${baseApi}/articles/${id}`)
                .then(res => {
                    this.article = res.data
                    this.mode = mode
                })
        }
    },
    watch: {
        page() {
            this.listArticles()
        }
    },
    mounted() {
        this.listArticles()
        this.listCategories()
        this.listUsers()
    }
}
</script>

<style>

</style>
<template>
    <div class="categoryAdmin">
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Nome:" label-for="category-name">
                        <b-form-input id="category-name" 
                            v-model="category.name" 
                            placeholder="Informe o Nome..." 
                            :readonly="mode == 'remove'"
                            required>
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Categoria pai:" label-for="category-parent">
                        <b-form-select id="category-parent" 
                            v-model="category.parentId" 
                            placeholder="Informe o Nome..." 
                            :options="categories"
                            required>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-4">
                <b-col>
                    <b-button v-if="mode == 'remove'" class="mr-3" variant="danger" @click="remove">Excluir</b-button>
                    <b-button v-if="mode == 'save'" class="mr-3" variant="primary" @click="save">Salvar</b-button>
                    <b-button @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table striped hover :items="categories" :fields="fields">
            <template v-slot:cell(actions)="data">
                <b-button class="mr-3" variant="warning" @click="loadCategory(data.item)">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApi} from '@/global.js'

export default {
    name: 'CategoryAdmin',
    data() {
        return {
            mode: 'save',
            categories: [],
            category: {},
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'path', label: 'Caminho', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        listCategories() {
            axios.get(`${baseApi}/categories`)
                .then(res => {
                    this.categories = res.data.map(category => {
                        return {...category, value: category.id, text:category.path}
                    })
                })

        },
        loadCategory(category, mode = 'save') {
            this.category = {...category}
            this.mode = mode
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''

            axios[method](`${baseApi}/categories${id}`, this.category)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Categoria salva com Sucesso!'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))
        },
        remove() {
            axios.delete(`${baseApi}/categories/${this.category.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Categoria excluída com Sucesso!'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))
        },
        reset() {
            this.category = {}
            this.mode = 'save'
            this.listCategories()
        }
    },
    mounted() {
        this.listCategories()
    }
}
</script>

<style>

</style>
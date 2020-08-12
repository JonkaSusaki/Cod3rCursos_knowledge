<template>
    <div class="userAdmin">
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" required placeholder="Informe o Nome..." v-model="user.name" :readonly="mode == 'remove'"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" required placeholder="Informe o E-mail..." v-model="user.email" :readonly="mode == 'remove'"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox :readonly="mode == 'remove'" class="check" id="user-admin" v-model="user.admin" >Administrador?</b-form-checkbox>

            <b-row>
                <b-col>
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password" required placeholder="Informe a Senha..." v-model="user.password" :readonly="mode == 'remove'"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Confirmação de senha:" label-for="user-confirmPassword">
                        <b-form-input id="user-confirmPassword" type="password" required placeholder="Confirme a senha..." v-model="user.confirmPassword" :readonly="mode == 'remove'"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="mb-4">
                    <b-button v-if="mode == 'remove'" class="mr-3" variant="danger" @click="remove">Excluir</b-button>
                    <b-button v-if="mode == 'save'" class="mr-3" variant="primary" @click="save">Salvar</b-button>
                    <b-button @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table striped hover :items="users" :fields="fields">
            <template v-slot:cell(actions)="data">
                <b-button class="mr-3" variant="warning" @click="loadUser(data.item)">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
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
    name: "UserAdmin",
    data: function() {
        return {
            mode: 'save',
            users: [],
            user: {},
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'email', label: 'Email', sortable: true},
                {key: 'admin', label: 'Administrador', formatter: value => {
                    return value == true ? 'Sim' : 'Não'
                }},
                {key: 'id', label: 'Código', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        listUsers() {
            axios.get(`${baseApi}/users`).then(res => this.users = res.data)
        },
        reset() {
            this.user = {}
            this.mode = 'save'
            this.listUsers()
        },
        save() {
            const method = this.user.id ? 'put': 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            
            axios[method](`${baseApi}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Usuário salvo com Sucesso'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))

        },
        loadUser(user, mode = 'save') {
            this.user = {...user}
            this.mode = mode
        },
        remove() {
            axios.delete(`${baseApi}/users/${this.user.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Usuário excluído com Sucesso'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))
        }
    },
    mounted() {
        this.listUsers()
    }
}
</script>

<style>
.check {
    margin: 10px 0;
}
</style>
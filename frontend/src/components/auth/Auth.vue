<template>
    <div class="auth">
        <b-card class="authModal">
            <div class="logo">
                <img src="@/assets/logoNova.jpg" alt="Logo">
                <hr class="hr">
            </div>

            <div class="form">
                <input v-if="showSignup" type="text" placeholder="Nome" v-model="user.name">
                <input type="text" placeholder="E-mail" v-model="user.email">
                <input type="password" placeholder="Senha" v-model="user.password">
                <input v-if="showSignup" type="password" placeholder="Confirmação de Senha" v-model="user.confirmPassword">

                <div class="buttons">
                    <b-button v-if="showSignup" @click="save" variant="primary">Salvar</b-button>
                    <b-button v-if="!showSignup" @click="signin" variant="primary">Entrar</b-button>
                    <b-button @click="reset" class="ml-3">Cancelar</b-button>
                </div>
            </div>

            <div class="links">
                <a @click="showSignup = !showSignup" 
                    v-if="!showSignup">
                    Já possui cadastro? Entre agora!
                </a>
                <a @click="showSignup = !showSignup" 
                    v-if="showSignup" >
                    Não é usuário? Registre-se!
                </a>

            </div>
        </b-card>
    
    </div>
</template>

<script>
import axios from 'axios'
import {baseApi, userKey} from '@/global.js'

export default {
    name: 'Auth',
    data() {
        return {
            user: {},
            showSignup: false
        }
    },
    methods: {
        reset() {
            this.user = {}
            this.showSignup = false
        },
        save() {
            axios.post(`${baseApi}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess({msg: 'Usuário Salvo com Sucesso!'})
                    this.reset()
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))
        },
        signin() {
            axios.post(`${baseApi}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(err => this.$toasted.global.defaultError({msg: err.response.data}))
        }
    }
}
</script>

<style>
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth img {
    max-width: 300px;
    max-height: 200px;
    width: auto;
    height: auto;
}

.authModal {
    border-radius: 8px;
    margin-top: 20px;
    padding: 10px;
}

.form {
    display: flex;
    flex-direction: column;
}

.form input {
    margin-bottom: 20px;
    outline: none;
    border: none;
    border-bottom: 1px solid #353b48;
    font-size: 1.2rem;
    
}

.hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, #8360c3, #2ebf91);
    margin-bottom: 30px;
}

.buttons {
    display: flex;
    margin-bottom: 15px;
}

.links {
    cursor: pointer;
    font-size: 0.9rem;
    color: #0097e6;
}

.links a:hover {
    border-bottom: 1px solid #0097e6;

}

</style>
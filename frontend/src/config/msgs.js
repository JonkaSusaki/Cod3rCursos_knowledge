import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    duration: 3000,
    iconPack: 'fontawesome'
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso' : payload.msg,
    {type: 'success', icon: 'check'}
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ocorreu um erro inesperado' : payload.msg,
    {type: 'error', icon: 'times'}
)
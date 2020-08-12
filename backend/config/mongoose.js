const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/projeto1_vuejs', {useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.log('Não foi possivel conectar com o Mongodb')
    })
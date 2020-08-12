const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) return res.status(400).send('Informe os Dados')


        const user = await app.db('users').where({email: req.body.email}).first()

        if(!user) res.status(400).send('Usuário não encontrado')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) res.status(400).send('Email/senha invalidos')

        const now = Math.floor(Date.now() / 1000)

       const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = (req, res) => {
        const userData = req.body || null

        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if( new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {

        }

        res.send(false)
    }

    return {signin, validateToken}

}
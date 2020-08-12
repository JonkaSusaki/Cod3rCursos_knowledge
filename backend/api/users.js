const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = {...req.body}

        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha Inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userDb = await app.db('users')
                .where({email: user.email}).first()

            if(!user.id) {
                notExistsOrError(userDb, 'Usuário já cadastrado')
            }
            
        } catch (msg) {
            res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(!user.id) {
            app.db('users')
                .insert(user)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .where({id: user.id})
                .update(user)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .where({id: req.params.id})
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send('Usuário não encontrado'))
    }

    const remove = async (req, res) => {
        try {
            const rowDeleted = await app.db('users')
                .where({id: req.params.id})
                .del()
            existsOrError(rowDeleted, 'Usuário não encontrado')

            res.status(204).send('Usuário Excluido')

        } catch (msg) {
            res.status(500).send('Usuário não encontrado')
        }
        

    }

    return {save, get, getById, remove}
}
module.exports = middlewares => {
    return (req, res, next) => {
        if (req.user.admin) {
            middlewares(req, res, next)
        } else {
            res.status(400).send('Não é administrador')
        }
    }
}
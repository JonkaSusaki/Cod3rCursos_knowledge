const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const {authSecret} = require('../.env')

module.exports = app => {
    const opt = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: authSecret
    }

    const strategy = new Strategy(opt, (payload, done) => {
        app.db('users')
            .where({id: payload.id})
            .first()
            .then(user => done(null, user ? {...payload} : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {authenticate: () => passport.authenticate('jwt', {session: false})}
}
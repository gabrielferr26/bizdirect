const jwt = require('jsonwebtoken')
const config = require('../config/config')

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if (token) {

        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length)
        }

        
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token Inválido'
                })
            }
            else {
                req.decoded = decoded
                next()
            }

        })
    }
    else {
        return res.json({
            success: false,
            message: 'Toke Indisponivel' + token
        })
    }
}

module.exports = { checkToken: checkToken }
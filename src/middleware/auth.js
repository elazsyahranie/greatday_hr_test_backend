const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
    authentication: (req, res, next) => {
        let token = req.headers.authorization
        if (token) {
          token = token.split(' ')[1]
          jwt.verify(token, process.env.PRIVATE_KEY, (error, result) => {
            if (
              (error && error.name === 'JsonWebTokenError') ||
              (error && error.name === 'TokenExpiredError')
            ) {
              return helper.response(res, 403, error.message)
            } else {
              req.decodeToken = result
              next()
            }
          })
        } else {
          return helper.response(res, 403, 'Please login first !')
        }
      }, 
      isAdmin: (req, res, next) => {
        if (req.decodeToken.authority === 'admin') {
          next()
        } else {
          return helper.response(res, 403, 'Only admin can access this!')
        }
      }
}
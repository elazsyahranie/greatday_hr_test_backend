const express = require('express')
const Route = express.Router() 
const authController = require('./auth_controller')

const { register } = authController

Route.post('/register', register) 
module.exports = Route
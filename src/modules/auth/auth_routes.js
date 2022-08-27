const express = require('express')
const Route = express.Router() 
const authController = require('./auth_controller')

const { register, login } = authController

Route.post('/register', register) 
Route.post('/login', login)
module.exports = Route
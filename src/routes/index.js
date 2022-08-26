const express = require('express')
const Route = express.Router() 
const authRouter = require('../modules/auth/auth_routes') 
const menuRouter = require('../modules/menu/menu_route')
const orderRouter = require('../modules/order/order_route')

Route.use('/auth', authRouter)
Route.use('/menu', menuRouter) 
Route.use('/order', orderRouter)
module.exports = Route
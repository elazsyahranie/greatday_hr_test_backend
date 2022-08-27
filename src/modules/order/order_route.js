const express = require('express')
const Route = express.Router() 
const orderController = require('./order_controller') 
const { authentication } = require('../../middleware/auth')

const { addOrder, getAllOrder } = orderController 

Route.post('/add_order', authentication, addOrder) 
Route.get('/get_all_order', authentication, getAllOrder)

module.exports = Route
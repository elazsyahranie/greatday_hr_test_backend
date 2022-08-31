const express = require('express')
const Route = express.Router() 
const orderController = require('./order_controller') 
const { authentication } = require('../../middleware/auth')

const { addOrder, getAllOrder, getOrderWithId } = orderController 

Route.post('/add_order', authentication, addOrder) 
Route.get('/get_all_order', authentication, getAllOrder)
Route.get('/get_order_with_id', authentication, getOrderWithId)

module.exports = Route
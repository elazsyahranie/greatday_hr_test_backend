const express = require('express')
const Route = express.Router() 
const orderController = require('./order_controller') 

const { addOrder } = orderController 

Route.post('/add_order', addOrder) 

module.exports = Route
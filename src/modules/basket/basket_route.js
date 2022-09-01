const express = require('express')
const Route = express.Router() 
const basketController = require('./basket_controller') 
const { authentication } = require('../../middleware/auth')

const { addToBasket, getItemsByCustomerId } = basketController 

Route.post('/add_to_basket', authentication, addToBasket) 
Route.get('/get_items_by_customer_id', authentication, getItemsByCustomerId)

module.exports = Route
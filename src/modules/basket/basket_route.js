const express = require('express')
const Route = express.Router() 
const basketController = require('./basket_controller') 

const { addToBasket, getItemsByCustomerId } = basketController 

Route.post('/add_to_basket', addToBasket) 
Route.get('/get_items_by_customer_id/:id', getItemsByCustomerId)

module.exports = Route
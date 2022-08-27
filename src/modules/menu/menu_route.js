const express = require('express')
const Route = express.Router() 
const menuController = require('./menu_controller') 
const { authentication } = require('../../middleware/auth')

const { addMenu, getAllMenu, getMenuById } = menuController 

Route.post('/add_menu', addMenu) 
Route.get('/get_all_menu', authentication, getAllMenu)
Route.get('/get_menu/:id', authentication, getMenuById)

module.exports = Route
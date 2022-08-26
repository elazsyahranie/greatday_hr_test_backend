const express = require('express')
const Route = express.Router() 
const menuController = require('./menu_controller') 

const { addMenu } = menuController 

Route.post('/add_menu', addMenu) 

module.exports = Route
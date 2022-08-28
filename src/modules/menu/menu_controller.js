const helper = require('../../helpers/wrapper') 
require('dotenv').config() 
const menuModel = require('./menu_model')

module.exports = {
    addMenu: async (req, res) => { 
        try {
            const { menuName, menuType, withRice, menuDescription, menuAvailability, menuPrice } = req.body 
            // const priceNumber = parseInt(menuPrice)
            const setData = {
                menu_name: menuName, 
                menu_type: menuType, 
                mix_with_rice: withRice, 
                menu_description: menuDescription, 
                menu_availability: menuAvailability, 
                price: menuPrice 
            }
            const result = await menuModel.addMenu(setData)
            return helper.response(res, 200, "Menu added", result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, "Bad request", error)
        }
    }, 
    getAllMenu: async(req, res) => {
        try {
            const result = await menuModel.getAllMenu()
            return helper.response(res, 200, "All menu displayed", result)
        } catch (error) {
            return helper.response(res, 400, "Bad request", error)
        }
    }, 
    getMenuById: async(req, res) => {
        try {
            const { id } = req.params
            const result = await menuModel.getMenuById(id)
            return helper.response(res, 200, `Displaying menu with ID ${id}`, result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, "Bad request", error)
        }
    }
}
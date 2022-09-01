const helper = require('../../helpers/wrapper') 
require('dotenv').config() 
const menuModel = require('./menu_model')

module.exports = {
    addMenu: async (req, res) => { 
        try {
            await menuModel.addMenu(
                req.body.menuName, 
                req.body.menuType, 
                req.body.withRice, 
                req.body.menuDescription, 
                req.body.menuAvailability, 
                req.body.menuPrice
            )
            return helper.response(res, 200, "Menu added!")
        } catch (error) {
            return helper.response(res, 400, "Bad request", error)
        }
    }, 
    getAllMenu: async(_req, res) => {
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
            return helper.response(res, 400, "Bad request", error)
        }
    }
}
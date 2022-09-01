const helper = require('../../helpers/wrapper') 
const basketModel = require('./basket_model')
const menuModel = require('../menu/menu_model')
require('dotenv').config() 

module.exports = {
    addToBasket: async (req, res) => {
        try {
            const { menuId } = req.body
            const { id } = req.decodeToken

            const checkAvailability = await menuModel.getMenuById(menuId)
            if (checkAvailability[0].menu_availability === 0) {
                return helper.response(res, 400, 'Item currently unavailable')    
            } else {
                const checkItem = await basketModel.getItemByIdAndCustomer(id, menuId)
                if (checkItem.length > 0) {
                    const addTheNumber = checkItem[0].number_of_items + 1 
                    await basketModel.updateNumberOfItems(addTheNumber, id)
                    return helper.response(res, 200, 'Item added to basket (upgraded)')
                }
                await basketModel.addToBasket(id, menuId)
                return helper.response(res, 200, 'Item added to basket')
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    }, 
    getItemsByCustomerId: async (req, res) => {
        try {
            const { id } = req.decodeToken
            const result = await basketModel.getItemsbyCustomerId(id) 
            console.log(`Here is the ID - ${id}`)
            return helper.response(res, 200, 'Here are your orders', result)
        } catch (error) {
            return helper.response(res, 400, 'Bad Request', error)
        }
    }
}
const helper = require('../../helpers/wrapper') 
const basketModel = require('./basket_model')
require('dotenv').config() 

const orderModel = require('./basket_model')
module.exports = {
    addToBasket: async (req, res) => {
        try {
            const { customerId } = req.body
            const setData = {
                customer_id: req.decodeToken.id, 
                menu_id: parseInt(customerId)
            }

            const checkAvailability = await basketModel.checkAvailableorNot(setData.menu_id)
            console.log(checkAvailability[0].menu_availability)
            if (checkAvailability[0].menu_availability === 'available') {
                const result = await basketModel.addToBasket(setData)
                return helper.response(res, 200, 'Item added to basket', result)    
            } else if (checkAvailability[0].menu_availability === 'not_available') {
                return helper.response(res, 400, 'Item currently unavailable')
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    }, 
    getItemsByCustomerId: async (req, res) => {
        try {
            const { id } = req.decodeToken.id
            const result = await basketModel.getItemsbyCustomerId(id) 
            return helper.response(res, 200, 'Here are your orders', result)
        } catch (error) {
            return helper.response(res, 400, 'Bad Request', error)
        }
    }
}
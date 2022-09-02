const helper = require('../../helpers/wrapper') 
const orderModel = require('./order_model')
const basketModel = require('../basket/basket_model')
require('dotenv').config() 

module.exports = {
    addOrder: async (req, res) => {
        try {
            const { id } = req.decodeToken
            const getItemOnBasket = await basketModel.getItembyCustomer(id)

            const menuIdArray = getItemOnBasket.map(function (obj) {
                return obj.menu_id
            })

            const numberItemsArray = getItemOnBasket.map(function (obj) {
                return obj.number_of_items
            })

            await orderModel.deleteItem(id)

            const reCheckItem = await basketModel.getItembyCustomer(id)
            if (reCheckItem.length === 0) {
                await orderModel.addOrder(menuIdArray, id, numberItemsArray)
                return helper.response(res, 200, 'Order succesful!')
            } else {
                return helper.response(res, 400, 'Items at basket not removed')
            }
        } catch (error) {
            return helper.response(res, 400, 'Bad Request', error)
        }
    }, 
    getAllOrder: async (_req, res) => {
        try {
            const result = await orderModel.getAllOrder() 
            return helper.response(res, 200, 'Displaying all order', result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad request', error)
        }
    }, 
    getOrderWithId: async(req, res) => {
        try {
            const { id } = req.decodeToken
            const result = await orderModel.getOrderWithId(id) 
            console.log(`Here is the ID ${id}`)
            return helper.response(res, 200, `Displaying order of ID - ${id}`, result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad request', error)
        }
    }
}
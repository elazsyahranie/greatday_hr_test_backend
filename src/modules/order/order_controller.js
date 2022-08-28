const helper = require('../../helpers/wrapper') 
const orderModel = require('./order_model')
const menuModel = require('../menu/menu_model')
require('dotenv').config() 

module.exports = {
    addOrder: async (req, res) => {
        try {
            const { menuId, numberOfItems } = req.body
            const setData = {
                menu_id: menuId, 
                customer_id: req.decodeToken.id, 
                number_of_items_ordered: numberOfItems
            }
            const checkAvailability = await menuModel.getMenuById(menuId)
            if (checkAvailability[0].menu_availability === 0) {
                return helper.response(res, 400, 'Menu out of stock!')
            } else {
                const result = await orderModel.addOrder(setData)
                return helper.response(res, 200, 'Order succesful!', result) 
            }   
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    }, 
    getAllOrder: async (req, res) => {
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
            return helper.response(res, 200, `Displaying order of ID - ${id}`, result)
        } catch (error) {
            return helper.response(res, 400, 'Bad request', error)
        }
    }
}
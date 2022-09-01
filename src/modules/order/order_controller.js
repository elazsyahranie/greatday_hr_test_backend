const helper = require('../../helpers/wrapper') 
const orderModel = require('./order_model')
const menuModel = require('../menu/menu_model')
require('dotenv').config() 

module.exports = {
    addOrder: async (req, res) => {
        try {
            const { menuId, numberOfItems } = req.body
            const customerId = req.decodeToken.id

            // console.log(`This is menu ID`) 
            // console.log(menuId) 
            // console.log(`This s number of items`) 
            // console.log(numberOfItems)

            // const checkAvailiability = await menuModel.getMenuById(menuId) 
            // if (checkAvailiability[0].menu_availability === 0) {
            //     return helper.response(res, 400, 'Sorry but the menu is currently unavailable')
            // } else {
            //     await orderModel.addOrder(menuId, customerId, numberOfItems)
            //     return helper.response(res, 200, 'Order succesful!')
            // }
            await orderModel.addOrder(menuId, customerId, numberOfItems)
            return helper.response(res, 200, 'Order succesful!')
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request')
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
            console.log(`Here is the ID ${id}`)
            return helper.response(res, 200, `Displaying order of ID - ${id}`, result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad request', error)
        }
    }
}
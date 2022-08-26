const helper = require('../../helpers/wrapper') 
require('dotenv').config() 

const orderModel = require('./order_model')
module.exports = {
    addOrder: async (req, res) => {
        try {
            const {customerId, menuId} = req.body
            const setData = {
                customer_id: parseInt(customerId), 
                menu_id: parseInt(menuId)
            }

            const result = await orderModel.addOrder(setData) 
            return helper.response(res, 200, 'Order added! Now wait while we are preparing it', result)
            // console.log(setData) 
            // console.log(typeof setData.customer_id)
            // console.log(typeof setData.menu_id)
        } catch (error) {
            // console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    }
}
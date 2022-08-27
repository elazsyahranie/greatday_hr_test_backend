const helper = require('../../helpers/wrapper') 
const orderModel = require('./order_model')
require('dotenv').config() 

module.exports = {
    addOrder: async (req, res) => {
        try {
            const { menuId, customerId } = req.body 
            const setData = {
                menu_id: menuId, 
                customer_id: customerId,
            }
            const { menu_id, customer_id } = setData; 
            const result = await orderModel.addOrder(menu_id, customer_id) 
            return helper.response(res, 200, 'Order succesful!', result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    }
}
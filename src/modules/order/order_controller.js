const helper = require('../../helpers/wrapper') 
const orderModel = require('./order_model')
require('dotenv').config() 

module.exports = {
    addOrder: async (req, res) => {
        try {
            console.log("Add order succesful!")
        } catch {
            console.log("Uuups")
        }
    }
}
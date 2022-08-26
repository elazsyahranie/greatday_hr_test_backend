// const helper = require('../../helpers/wrapper') 
const authModel = require('./auth_model')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
    register: async (req, res) => {
        try {
            const { name, userName, userPassword, gender } = req.body 
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(userPassword, salt)
            const setData = {
                name: name, 
                username: userName, 
                password: encryptPassword, 
                gender: gender,
            }
            const findUsername = await authModel.getUserByUsername({ username: userName })
            
            console.log(typeof findUsername) 
            console.log(findUsername)
            // console.log(setData)
            // console.log(typeof setData.username)
        } catch (error) {
            console.log(error)
        } 
    }
}
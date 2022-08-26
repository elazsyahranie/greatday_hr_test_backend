const helper = require('../../helpers/wrapper') 
const authModel = require('./auth_model')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
    register: async (req, res) => {
        try {
            const { name, userName, userEmail, userPhone, userPassword, gender } = req.body 
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(userPassword, salt)
            const setData = {
                name: name, 
                username: userName, 
                authority: 'not_admin',
                email: userEmail, 
                phone: userPhone,
                password: encryptPassword, 
                gender: gender,
            }

            const findUsername = await authModel.getUserByUsername({ username: userName })
            
            const findEmail = await authModel.getUserByEmail({ email: userEmail })

            if (findUsername.length > 0 && findEmail.length > 0) {
                return helper.response(res, 400, 'Username and Email already taken')
            }
            if (findUsername.length > 0) {
                return helper.response(res, 400, 'Username already taken')
            } 
            if (findEmail.length > 0) {
                return helper.response(res, 400, 'Email already taken')
            }
            const result = await authModel.register(setData)
            delete setData.password
            return helper.response(res, 200, 'Registration succesful', result)
        } catch (error) {
            return helper.response(res, 400, 'Bad Request', error)
        } 
    }
}
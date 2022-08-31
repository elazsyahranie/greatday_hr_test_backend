const helper = require('../../helpers/wrapper') 
const authModel = require('./auth_model')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const dataRefreshToken = {}

module.exports = {
    register: async (req, res) => {
        try {
            const { name, userName, userEmail, userPhone, userPassword, gender } = req.body 
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(userPassword, salt)

            const findUsername = await authModel.getUserByUsername(userName)
            
            const findEmail = await authModel.getUserByEmail(userEmail)

            if (findUsername.length > 0 && findEmail.length > 0) {
                return helper.response(res, 400, 'Username and Email already taken')
            }
            if (findUsername.length > 0) {
                return helper.response(res, 400, 'Username already taken')
            } 
            if (findEmail.length > 0) {
                return helper.response(res, 400, 'Email already taken')
            }
            await authModel.register(
              name, 
              userName, 
              userEmail, 
              userPhone, 
              encryptPassword, 
              gender
            )
            return helper.response(res, 200, 'Registration succesful')
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        } 
    }, 
    login: async (req, res) => {
        try {
            const { userName, password } = req.body 
            const checkUserName = await authModel.getDataConditions(userName)
        
              // console.log(userName)    

              if (checkUserName.length > 0) {
                const checkPassword = bcrypt.compareSync(
                  password,
                  checkUserName[0].password
                )
        
                if (checkPassword) {
                  const payload = checkUserName[0]
                  delete payload.user_password
                  delete payload.user_pin
                  const token = jwt.sign({ ...payload }, process.env.PRIVATE_KEY, {
                    expiresIn: '24h'
                  })
                  const refreshToken = jwt.sign(
                    { ...payload },
                    process.env.PRIVATE_KEY,
                    {
                      expiresIn: '48h'
                    }
                  )
                  dataRefreshToken[checkUserName[0].user_id] = refreshToken
                  const result = { ...payload, token, refreshToken }
                  return helper.response(res, 200, 'Login Succesful !', result)
                } else {
                  return helper.response(res, 400, 'Incorrect password')
                }
              } else {
                return helper.response(res, 404, 'Username does not exist')
              }
            } catch (error) {
              console.log(error)
              return helper.response(res, 400, 'Bad Request', error)
            }
        }
    }

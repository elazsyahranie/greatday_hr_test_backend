const connection = require('../../config/mysql') 

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId, 
                        ...data
                    } 
                    resolve(newResult)
                } else {
                    reject (new Error(error))
                }
            })
        })
    }, 
    getUserByUsername: (condition) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT FROM user WHERE ?', condition,  (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}
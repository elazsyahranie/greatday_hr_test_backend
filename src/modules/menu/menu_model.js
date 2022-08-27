const connection = require('../../config/mysql')  

module.exports = {
    addMenu: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO menu', data, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId, 
                        ...data
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    getMenuByName: (condition) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu WHERE ?', condition, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId, 
                        ...data
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, 
    getAllMenu: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu', (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, 
    getMenuById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu WHERE ?', id, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}
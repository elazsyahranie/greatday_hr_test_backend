const connection = require('../../config/mysql')  

module.exports = {
    addOrder: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO ordered_items SET ?', data, 
                (error, result) => {
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
    getItemOnBasketWithCustomerId: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM basket WHERE customer_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }, 
    getAllOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM ordered_items', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}
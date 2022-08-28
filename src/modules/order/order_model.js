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
    getOrderWithId: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT ordered_items.customer_id, user.id, user.name, user.username, ordered_items.menu_id, menu.id, menu.menu_name, menu.price FROM ordered_items INNER JOIN menu ON ordered_items.menu_id = menu.id INNER JOIN user ON ordered_items. customer_id = user.id WHERE ordered_items.customer_id = ?', id, (error, result) => {
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
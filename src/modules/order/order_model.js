const connection = require('../../config/mysql')  
const db = require('../../config/mysql')

module.exports = {
    addOrder: (menuId, customerId) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO ordered_items (menu_id, customer_id) VALUES (?, ?)', [ menuId, customerId ], 
                (error) => {
                    !error ? resolve() : reject(new Error(error))
                })
        })
    },
    getItemOnBasketWithCustomerId: (id) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM basket WHERE customer_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }, 
    getAllOrder: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM ordered_items', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}
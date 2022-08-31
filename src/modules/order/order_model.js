const db = require('../../config/mysql')

module.exports = {
    addOrder: (menuId, customerId, numberOfItems) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO ordered_items '
            query += '(menu_id, customer_id, number_of_items_ordered) '
            query += 'VALUES (?, ?, ?)'
            db.run(query, [ menuId, customerId, numberOfItems ], 
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
    getOrderWithId: (id) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT ordered_items.customer_id, user.id, user.name, user.username, ordered_items.menu_id, menu.id, menu.menu_name, menu.price FROM ordered_items INNER JOIN menu ON ordered_items.menu_id = menu.id INNER JOIN user ON ordered_items. customer_id = user.id WHERE ordered_items.customer_id = ?', id, (error, result) => {
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
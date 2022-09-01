const db = require('../../config/mysql')

module.exports = {
    addOrder: (menuId, customerId, numberOfItems) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO ordered_items '
            query += '(menu_id, customer_id, number_of_items_ordered) '
            query += 'VALUES (?, ?, ?)'
            for (let i = 0; i < menuId.length; i++) {
                db.run(query, menuId[i], [customerId], numberOfItems[i], 
                    (error) => {
                        !error ? resolve() : reject(new Error(error))
                    })
            }
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
            let query = 'SELECT ' 
            query += 'ordered_items.customer_id, '
            query += 'user.id, user.name, user.username, ' 
            query += 'ordered_items.menu_id, ' 
            query += 'menu.id, menu.menu_name, menu.price ' 
            query += 'FROM ordered_items '
            query += 'INNER JOIN menu ON ordered_items.menu_id = menu.id '
            query += 'INNER JOIN user ON ordered_items.customer_id = user.id '
            query += 'WHERE ordered_items.customer_id = ?'  
            db.all(query, id, (error, result) => {
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
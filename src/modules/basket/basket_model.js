const db = require('../../config/mysql')

module.exports = {
    addToBasket: (customer_id, menu_id) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO basket (customer_id, menu_id) VALUES (?, ?)', 
            [customer_id, menu_id], (error) => {
                !error ? resolve() : reject (new Error(error))
            })
        })
    },
    getItembyCustomer: (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM basket WHERE customer_id = ?'
            db.all(query, [id], (error, result) => {
                !error ? resolve(result) : reject (new Error(error))
            })
        })
    },
    getItemByIdAndCustomer: (customer_id, menu_id) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM basket WHERE customer_id = ? AND menu_id = ?', 
                [customer_id, menu_id], (error, result) => {
                !error ? resolve(result) : reject (new Error(error))
            })
        })
    },
    updateNumberOfItems: (number_of_items, customer_id) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE basket SET number_of_items = ? WHERE customer_id = ?'
            db.run(query, [number_of_items, customer_id], (error) => {
                !error ? resolve() : reject (new Error(error))
            })
        })
    },
    getItemsbyCustomerId: (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT basket.customer_id, basket.menu_id, user.id, user.name, user.name, menu.id, menu.menu_name, menu.price '
            query += 'FROM basket '
            query += 'INNER JOIN user ON basket.customer_id = user.id '
            query += 'INNER JOIN menu ON basket.menu_id = menu.id '
            query += 'WHERE basket.customer_id = ?'
            db.all(
                query, id, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject (new Error(error))
                }
            })
        })
    }
}
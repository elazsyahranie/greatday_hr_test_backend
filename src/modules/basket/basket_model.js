const connection = require('../../config/mysql')  

module.exports = {
    addToBasket: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO basket SET ?', 
            data, (error, result) => {
                // console.log(data)
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
    checkAvailableorNot: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu WHERE id = ?', id, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
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
            connection.query(
                query, id, (error, result) => {
                console.log(query)
                if (!error) {
                    resolve(result)
                } else {
                    reject (new Error(error))
                }
            })
        })
    }
}
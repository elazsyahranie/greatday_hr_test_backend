const connection = require('../../config/mysql')  

module.exports = {
    addOrder: (menu_id, customer_id) => {
        return new Promise((resolve, reject) => {
            // let query = 'START TRANSACTION'
            const query = 'INSERT INTO ordered_items (menu_id, customer_id) VALUES ?'
            // [items.map(item => [item.name, item.description, item.value])]
            const values = [
                [menu_id, customer_id]
            ]
            console.log(values)
            connection.query(query, values, 
                (error, result) => {
                    if (!error) {
                        const newResult = {
                            id: result.insertId, 
                            menu_id: menu_id, 
                            customer_id: customer_id
                        }
                        resolve(newResult)
                    } else {
                        reject(new Error(error))
                    }
                })
            })
        }
}
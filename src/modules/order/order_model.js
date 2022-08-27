const connection = require('../../config/mysql')  

module.exports = {
    addOrder: (menuId, customerId) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO ordered_items SET ?', [menuId, customerId], 
            (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId, 
                        menu_id: menuId, 
                        customer_id: customerId, 
                    }
                    resolve(newResult)
                } else {
                reject(new Error(error))
                }
            })
        })
    }
}
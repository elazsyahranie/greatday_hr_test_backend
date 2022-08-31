const db = require('../../config/mysql')

module.exports = {
    addMenu: (
            menu_name, 
            menu_type,
            mix_with_rice, 
            menu_description, 
            menu_availability, 
            price
        ) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO menu '
            query += '(menu_name, menu_type, mix_with_rice, menu_description, '
            query += 'menu_availability, price) '
            query += 'VALUES (?, ?, ?, ?, ?, ?)'
            db.run(query, [
                menu_name, 
                menu_type,
                mix_with_rice, 
                menu_description, 
                menu_availability, 
                price
            ], (error) => {
                !error ? resolve() : reject(new Error(error))
            })
        })
    },
    getAllMenu: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM menu', (error, result) => {
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
            db.all('SELECT * FROM menu WHERE id = ?', [id], (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}
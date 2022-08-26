const connection = require('../../config/mysql')  

module.exports = {
    addOrder: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO ordered_items SET ?', 
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
    }
}
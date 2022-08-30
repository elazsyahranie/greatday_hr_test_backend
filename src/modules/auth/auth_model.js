const db = require('../../config/mysql')

module.exports = {
    register: (
        name, 
        userName, 
        userEmail, 
        userPhone, 
        userPassword, 
        gender
    ) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO user '
            query += '(name, username, email, phone, password, gender) '
            query += 'VALUES (?, ?, ?, ?, ?, ?)'
            db.run(query, [
                name, 
                userName, 
                userEmail, 
                userPhone, 
                userPassword, 
                gender 
            ], (error) => {
                !error ? resolve() : reject(new Error(error))
            })
        })
    }, 
    getUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM user WHERE username = ?', [username],  (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }, 
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM user WHERE email = ?', [email], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }, 
    getDataConditions: (data) => {
        return new Promise((resolve, reject) => {
          db.all(`SELECT * FROM user WHERE username = ?`, [data], (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          })
        })
      }
}
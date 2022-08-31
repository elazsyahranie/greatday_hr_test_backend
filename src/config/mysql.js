const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "../../../db/great_cafetaria.db";

const connection = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if(err) throw err;
    console.log("You're now connected")
});

module.exports = connection

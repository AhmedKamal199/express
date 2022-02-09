const mysql = require('mysql2')

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'akfrpassone.two1',
    database: 'sample',
})
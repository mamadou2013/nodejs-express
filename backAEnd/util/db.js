const dbConfig = require('../config/dbConfig');
const mysql = require('mysql');

//connection to mysql
const connection = mysql.createConnection({
    host:dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DATABASE
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('connected successfully !');
});

module.exports = connection;
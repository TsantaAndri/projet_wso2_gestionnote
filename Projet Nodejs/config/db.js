const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bdnotes'
});

connection.connect(function(error){
    if(!!error) console.log('Error database!');
    else console.log('Database connected!');
});


module.exports = connection;
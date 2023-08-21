const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DB_USER + " " + process.env.DB_NAME+ " " + process.env.DB_PASSWORD);

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool : {
        max : 10,
        min : 0,
        idleTimeoutMillis : 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};


module.exports = {
    mssql,
    sqlConfig
}
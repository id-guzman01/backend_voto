import mysql from "promise-mysql";
import config from "../config"

const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'votaciones',
    user: 'root',
    password: '1234',
    port: '3306'
});

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}
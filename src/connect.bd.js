// Dependencias
const mysql = require("mysql2")

// Variables
let connection

try {
    // Creamos la conexion
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "zepxuH-nyzfa5",
        database: "user_management",
    })

    // Nos conectamos a la base de datos
    connection.connect((err) => {
        if (err) throw err
        console.log("Connected!")
    })
} catch (error) {
    console.log(error)
}

// Exportamos la conexion
module.exports = {connection}
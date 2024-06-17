// Dependencias
const express = require("express")
const router = express.Router()
const { connection } = require("../connect.bd")

/**
 * Obtenemos todos los usuarios de la base de datos y los devolvemos
 */
router.get("/", (req, res) => {
    // Obtenemos todos los usuarios de la base de datos y los devolvemos
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) throw err

        if(result.length > 0)
            res.json(result)
        else
            res.json({ "info": "No hay usuarios en la base de datos." })
    })
})

/**
 * Obtenemos un usuario de la base de datos
 */
router.get("/:id", (req, res) => {
    // Obtenemos el id de la url
    const id = req.params.id

    // Buscamos el usuario en la base de datos
    connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) throw err

        if(result.length > 0)
            res.json(result)
        else
            res.status(404).json({ error: "User not found" })
    })
})

/** 
 * Insertamos un usuario en la base de datos
*/
router.post("/", (req, res) => {
    const { name, email, age } = req.body

    // Comprobamos si se ha pasado el name y el email
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" })
    }

    // Insertamos el usuario
    connection.query("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", [name, email, age], (err, result) => {
        if (err) throw err

        console.log(result)
        res.json({ message: "User created" })
    })
})

/**
 * Actualizamos un usuario por su id
 */
router.put("/:id", (req, res) => {
    const id = req.params.id
    const { name, email, age } = req.body

    connection.query("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?", [name, email, age, id], (err, result) => {
        if (err) throw err
        res.json({ message: "User updated" })
    })
})

/**
 * Eliminamos un usuario por su id
 */
router.delete("/:id", (req, res) => {
    const id = req.params.id

    connection.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) throw err
        
        if(result.affectedRows === 0)
            return res.status(404).json({ error: "User not found" })
        else
            res.json({ message: "User deleted" })
    })
})

// Exportamos el router
module.exports = router
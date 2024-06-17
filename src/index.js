// Librerias
const express = require("express")

// Variables
const app = express()
app.use(express.json()) // Middleware
const port = 3000

// Endpoint
app.use("/users", require("./routes/users"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
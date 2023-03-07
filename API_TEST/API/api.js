// run the api_base_file snippet
require('dotenv').config()
const cors = require("cors");
const express = require("express");
const router = require("./Server/Routes/StudentRouter")

// Documentation
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// mongoDb connection
const databaseObject = require('./Server/Database/connection')

const PORT = process.env.PORT || DefaultPortIfNotInEnv

// Instancier l'application express
// Configuer l'application avec les middlewares comme cors
// définir le type d'objet pour les communications (json)
// ajouter un Router. Router défini dans ./Server/Routes/StudentRoutr
const app = express()
app.use(cors())
app.use(express.json())
app.use('/students', router)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

databaseObject.connectToServer();

app.listen(PORT, () => {
    console.log('Server live on port:', PORT)
})
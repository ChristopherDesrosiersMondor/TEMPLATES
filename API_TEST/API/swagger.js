// run the swagger_swagger_file snippet
const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "Student test api",
        description: "A test of my api template"
    },
    host: "localhost:1312",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Student",
            "description": "Endpoints to get student information"
        }
    ],
    definitions: {
        Student: {
            // Exemples de proprietes, voir votre schema
            Name: "Christo"
        }
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./api.js')
})
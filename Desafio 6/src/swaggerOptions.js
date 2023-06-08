const swaggerOptions = {
    definition: {
        openapi:'3.0.1',
        info:{
            title : "titulo",
            description: 'descripcion de la API'
        }
    },
    apis:['src/docs/**/*.yaml']
}

module.exports = {swaggerOptions}
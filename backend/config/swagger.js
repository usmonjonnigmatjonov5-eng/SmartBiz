const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SmartBiz API",
            version: "1.0.0",
            description: "SmartBiz do'kon boshqaruv tizimi API hujjatlari"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

console.log("Swagger paths:", Object.keys(swaggerSpec.paths || {}));

module.exports = swaggerSpec;
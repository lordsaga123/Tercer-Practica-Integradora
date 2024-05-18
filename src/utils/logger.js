const winston = require("winston");
const configObject = require("../config/config.js");

const {mongo_url} = configObject;

//Ejemplo configurando nuestros propios niveles: 

const levels = {
    level: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "yellow",
        warning: "blue",
        info: "green",
        http: "magenta",
        debug: "white"
    }
}

//Logger para desarrollo: 

const loggerDevelopment = winston.createLogger({
    levels: levels.level,
    transports: [
        new winston.transports.Console({
            level: "debug"
        })
    ]
})


//Logger para producción: 

const loggerProduction = winston.createLogger({
    levels: levels.level,
    transports: [
        new winston.transports.File({
            filename: "./errors.log",
            level: "error"
        })
    ]
})

//Determinar que logger utilizar segun el entorno: 

const logger = mongo_url === "production" ? loggerProduction : loggerDevelopment;

module.exports = logger


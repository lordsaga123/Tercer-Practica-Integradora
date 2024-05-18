const logger = require("../utils/logger.js");

//Creamos un middleware: 

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next();
}

module.exports = addLogger;

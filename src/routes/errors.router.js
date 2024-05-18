const express = require("express");
const router = express.Router();
const configObject = require("../config/config.js");
const {mongo_url} = configObject;


router.get("/loggertest", (req, res) => {
    req.logger.error("Error fatal, vamos a morir");
    req.logger.debug("Mensaje de debug");
    req.logger.info("Mensaje de Info");
    req.logger.warning("Mensaje de Warning");
    console.log(mongo_url);
    res.send("Test de logs");
})

module.exports = router;
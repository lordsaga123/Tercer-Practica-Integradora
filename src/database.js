const mongoose = require("mongoose");
const configObject = require("./config/config.js");
const { mongo_url } = configObject;

mongoose.connect(mongo_url)
  .then(() => console.log("Conectado a la Base de Datos E-Commerce"))
  .catch(error => console.error("Error al conectarse a la base de Datos E-Commerce:", error));






/*const mongoose = require("mongoose");
const configObject = require("./config/config");
const {mongo_url} = configObject;

mongoose.connect(mongo_url)
  .then(() => console.log("Conectado a la Base de Datos E-Commerce"))
  .catch(error => console.error("Error al conectarse a la base de Datos E-Commerce:", error));*/
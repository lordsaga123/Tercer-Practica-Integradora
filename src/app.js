const express = require("express");
const app = express();
const exphbs = require ("express-handlebars");
const cookieParser = require("cookie-parser");
const mockingRoutes = require("./routes/mocking.router.js");
const handleError =require("./middleware/handleError.js");

const addLogger = require("./middleware/addLogger.js");
const errorsRoutes = require("./routes/errors.router.js");

//Passport: 
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");


// Variables de entorno
const configObject = require("./config/config.js")
const { mongo_url } = configObject

//Middleware
app.use(addLogger);
app.use(handleError);
app.use(express.urlencoded({extended : true}));
app.use(express.json());
//app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//PASSPORT
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/users", userRouter);
app.use("/", mockingRoutes);
app.use("/", errorsRoutes);


const httpServer = app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el Puerto ${PUERTO}`);
})

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);


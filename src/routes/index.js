const productsRouter = require('./products.router.js');
const cartsRouter = require('./carts.router.js');
const viewRouter = require('./view.router.js');
const userRouter = require('./user.router.js');
/*const sessionRouter = require('./sessions.route.js');*/


module.exports = {
    productsRouter,
    cartsRouter,
    viewRouter,
    userRouter
}
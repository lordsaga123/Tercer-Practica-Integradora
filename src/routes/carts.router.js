const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.Controller.js");
const cartController = new CartController();
const authMiddleware = require("../middleware/authmiddleware.js");

router.use(authMiddleware);

router.post("/", (req, res) => cartController.crearCarrito(req, res));

router.get("/:cid", (req, res) => cartController.obtenerCarrito(req, res));

router.post("/:cid/product/:pid", (req, res) => cartController.agregarProductoAlCarrito(req, res));

router.delete('/:cid/product/:pid', (req, res) => cartController.eliminarProductoDelCarrito(req, res));

router.put('/:cid', (req, res) => cartController.actualizarCarrito(req, res));

router.put('/:cid/product/:pid', (req, res) => cartController.actualizarCantidadDeProducto(req, res));

router.delete('/:cid', (req, res) => cartController.vaciarCarrito(req, res));

router.post('/:cid/purchase', (req, res)=> cartController.finalizarCompra(req, res));

module.exports = router;







/*const express = require("express");
const router = express.Router();

const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();
const CartModel = require("../dao/models/cart.model.js");
const ProductManager = require("../dao/db/product-manager-db.js");
const productManager = new ProductManager();
const CartController =require ("../controllers/cart.Controller.js");
const cartController = new CartController();

//Rutas
//Agregar Carrito
router.post("/", (req, res) => cartController.createCart(req, res));/*async (req, res)=>{
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({error: "Error en el servidor"});
    }
}*/;

//Obtener Carritos

/*router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await CartModel.findById(cartId)
            
        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        return res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//Agregar productos a varios carritos diferentes
router.post("/:cid/product/:pid", async (req, res)=> {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error(500).json({error: "Error en el servidor"});
    }
});

//Eliminar un producto específico de un carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartManager.eliminarProductoDelCarrito(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//Actualizar productos del carrito: 

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;
    // Debes enviar un arreglo de productos en el cuerpo de la solicitud

    try {
        const updatedCart = await cartManager.actualizarCarrito(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});


//Actualizar las cantidades de productos

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.actualizarCantidadDeProducto(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//Vaciar carrito: 

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        
        const updatedCart = await cartManager.vaciarCarrito(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

module.exports = router;*/
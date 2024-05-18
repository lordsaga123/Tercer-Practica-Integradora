const TicketModel = require("../dao/models/ticket.model.js");
const UserModel = require("../dao/models/user.model.js");
const CartServices = require("../services/cartServices.js");
const cartServices = new CartServices();
const ProductServices = require("../services/productServices.js");
const productServices = new ProductServices();
const { generateUniqueCode, calcularTotal } = require("../utils/cartutils.js");


class CartController {
    async crearCarrito(req, res) {
        try {
            const nuevoCarrito = await cartServices.crearCarrito();
            res.json(nuevoCarrito);
        } catch (error) {
            console.error("Error al crear un nuevo carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
    async obtenerCarrito(req, res) {
        try {
            const { cid } = req.params;
            const carrito = await cartServices.getCarritoById(cid);
            if (!carrito) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            res.json(carrito);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async agregarProductoAlCarrito(req, res) {
        try {
            const { cid, pid } = req.params; // Obtener los parámetros de la URL
            const { quantity } = req.body; // Obtener el cuerpo de la solicitud
            const carrito = await cartServices.agregarProductoAlCarrito(cid, pid, quantity);
            res.redirect(`/carts/${carrito._id}`);
        } catch (error) {
            console.error("Error al agregar un producto al carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
     async eliminarProductoDelCarrito(req, res) {
        try {
            const { cid, pid } = req.params;
            const carrito = await cartServices.eliminarProductoDelCarrito(cid, pid);
            res.json(carrito);
        } catch (error) {
            console.error("Error al eliminar un producto del carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async actualizarCarrito(req, res) {
        try {
            const { cid } = req.params; // Obtener los parámetros de la URL
            const updatedProducts = req.body;
            const carrito = await cartServices.actualizarCarrito(cid, updatedProducts);
            res.json(carrito);
        } catch (error) {
            console.error("Error al actualizar el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async actualizarCantidadDeProducto(req, res) {
        try {
            const { cid, pid } = req.params; // Obtener los parámetros de la URL
            const { newQuantity } = req.body; // Obtener el cuerpo de la solicitud
            const carrito = await cartServices.actualizarCantidadDeProducto(cid, pid, newQuantity);
            res.json(carrito);
        } catch (error) {
            console.error("Error al actualizar la cantidad de un producto en el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async vaciarCarrito(req, res) {
        try {
            const { cid } = req.params;
            console.log("ID del carrito recibido:", cid); // Agrega un mensaje de depuración para mostrar el ID del carrito recibido
            const carrito = await cartServices.vaciarCarrito(cid);
            console.log("Carrito vaciado exitosamente:", carrito); // Agrega un mensaje de depuración para mostrar el carrito vaciado
            res.json(carrito);
        } catch (error) {
            console.error("Error al vaciar el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    async finalizarCompra(req, res) {
        const cartId = req.params.cid;
        try {
            // Obtener el carrito y sus productos
            const cart = await cartServices.getCarritoById(cartId);
            const products = cart.products;

            // Inicializar un arreglo para almacenar los productos no disponibles
            const productosNoDisponibles = [];

            // Verificar el stock y actualizar los productos disponibles
            for (const item of products) {
                const productId = item.product;
                const product = await productServices.getProductById(productId);
                if (product.stock >= item.quantity) {
                    // Si hay suficiente stock, restar la cantidad del producto
                    product.stock -= item.quantity;
                    await product.save();
                } else {
                    // Si no hay suficiente stock, agregar el ID del producto al arreglo de no disponibles
                    productosNoDisponibles.push(productId);
                }
            }

            const userWithCart = await UserModel.findOne({ cart: cartId });

            // Crear un ticket con los datos de la compra
            const ticket = new TicketModel({
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: calcularTotal(cart.products),
                purchaser: userWithCart._id
            });
            await ticket.save();

            // Eliminar del carrito los productos que sí se compraron
            cart.products = cart.products.filter(item => productosNoDisponibles.some(productId => productId.equals(item.product)));

            // Guardar el carrito actualizado en la base de datos
            await cart.save();

            res.status(200).json({ productosNoDisponibles });
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = CartController
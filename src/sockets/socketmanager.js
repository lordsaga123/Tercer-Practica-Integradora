const socket = require("socket.io");
const ProductServices = require("../services/productServices.js");
const productServices = new ProductServices(); 
const MessageModel = require("../dao/models/message.model.js");

class SocketManager {
    constructor(httpServer) {
        this.io = socket(httpServer);
        this.initSocketEvents();
    }

    async initSocketEvents() {
        this.io.on("connection", async (socket) => {
            console.log("Un cliente se conectó");
            
            socket.emit("productos", await productServices.getProducts() );

            socket.on("eliminarProducto", async (id) => {
                await productServices.deleteProduct(id);
                this.emitUpdatedProducts(socket);
            });

            socket.on("agregarProducto", async (producto) => {
                await productServices.addProduct(producto);
                this.emitUpdatedProducts(socket);
            });

            socket.on("message", async (data) => {
                await MessageModel.create(data);
                const messages = await MessageModel.find();
                socket.emit("message", messages);
            });
        });
    }

    async emitUpdatedProducts(socket) {
        socket.emit("productos", await productServices.getProducts());
    }
}

module.exports = SocketManager;

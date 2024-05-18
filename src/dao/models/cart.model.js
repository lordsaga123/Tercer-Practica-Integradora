const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    products: [
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            require: true
        },
        quantity:{
            type: Number,
            require: true
        }
    }]
})

// Middleware pre que realiza la población automáticamente
CartSchema.pre('findOne', function (next) {
    this.populate('products.product', '_id title price');
    next();
  });

const CartModel = mongoose.model("carts", CartSchema);

module.exports = CartModel;
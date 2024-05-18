const express = require("express");
const router = express.Router();
const generateProducts = require("../utils/utils")



router.get("/mockingproducts", (req, res)=> {
    const mockingProducts = [];
        for (let i = 0; i <= 100; i++){
        mockingProducts.push(generateProducts());
        }
        res.json(mockingProducts);
    });

    module.exports = router;

const express = require("express");
const productController = require("../controllers/products-controller");

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.addProduct);

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;

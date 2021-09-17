const Product = require("../model/Product");
const mongoose = require("mongoose");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    console.log(err);
    return next();
  }
  if (!products) {
    return res.status(404).json({ message: "No product Found" });
  }
  res.status(200).json({ products: products });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return next();
  }
  if (!product) {
    res.status(404).json({ message: "Product not found by this Id" });
  }

  res.status(200).json({ product: product });
};

const addProduct = async (req, res, next) => {
  let product;
  try {
    product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();
  } catch (err) {
    console.log(err);
    return next();
  }
  res.status(201).json({
    product: product,
  });
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const { name, description, price, image, isFeatured } = req.body;
  let product;
  try {
    product = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      image,
      isFeatured,
    });
  } catch (err) {
    console.log(err);
    return next();
  }
  try {
    await product.save();
  } catch (err) {
    console.log("Saving Failed", err);
    return next();
  }

  res.status(200).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndRemove(productId);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  if (!product) {
    return res.status(400).json({ message: "Product Not Deleted" });
  }
  res.status(200).json({ message: "Product Deleted" });
};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

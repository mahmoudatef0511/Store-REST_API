const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
exports.postProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body, {
        runValidators: true
    });
    res.status(201).json({ msg: "Product created successfully!", product });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ msg: `No product with ID ${productID} !` });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Product.findByIdAndUpdate(productID, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ msg: `No product with ID ${productID} !` });
    }
    res.status(200).json({ msg: "Product updated successfully!", product });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Product.findByIdAndDelete(productID);
    if (!product) {
      return res.status(404).json({ msg: `No product with ID ${productID} !` });
    }
    res.status(200).json({ msg: "Product deleted successfully!", product });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

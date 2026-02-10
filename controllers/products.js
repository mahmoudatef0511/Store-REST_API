const Product = require("../models/product");

exports.getAllProductsStatic = async (req, res) => {
  try {
    const products = await Product.find({ price: { $gt: 50 } })
      .sort("price")
      .select("name price");
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
exports.getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`,
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: +value };
      }
    });
  }
  try {
    let query = Product.find(queryObject);
    if (sort) {
      query = query.sort(sort.split(",").join(" "));
    } else {
      query = query.sort("createdAt");
    }
    if (fields) {
      query = query.select(fields.split(",").join(" "));
    }
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;
    query = query.limit(limit).skip(offset);
    const products = await query;
    res.status(200).json({ products, count: products.length });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
exports.postProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body, {
      runValidators: true,
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
      runValidators: true,
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

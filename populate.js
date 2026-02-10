const products = require("./products.json");
const Product = require("./models/product");
const connectDB = require("./db/connect");

require("dotenv").config();

connectDB(process.env.MONGO_URI).then(async () => {
  console.log("CONNECTED TO DB ... ");
  try {
    await Product.deleteMany();
    await Product.create(products);
  } catch (error) {
    console.log(error);
  }
});

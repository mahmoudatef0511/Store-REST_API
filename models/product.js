const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [3, "Product name must be at least 3 characters"],
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },

  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not a supported company",
    },
  },

  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be more than 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);

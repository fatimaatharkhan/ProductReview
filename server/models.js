const mongoose = require("mongoose");


// Counter Schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// USER SCHEMA
const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["business", "user"], required: true },
  profilePicture: { type: String },
  category: { type: String },
  aboutBusiness: { type: String },
});

userSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc._id) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      doc._id = counter.sequence_value;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

const User = mongoose.model("User", userSchema);

// PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  id: {type: Number},
  userId: { type: Number, ref: "User", required: true }, // Add userId field
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 }, // Set default value of rating to 0
});

const Product = mongoose.model("Product", productSchema);

// REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: { type: Number, required: true },
  reviewText: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema);

// COMMENT SCHEMA
const commentSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { User, Product, Review, Comment };

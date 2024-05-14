const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

app.use(cors());
// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect(
    "mongodb+srv://fatimaatharkhan:IulvIKMp7KeVH9T6@productreview.ipm7xjq.mongodb.net/ProductReview?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// Counter Schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// USER SCHEMA
const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['business', 'user'], required: true },
  profilePicture: { type: String },
  category: { type: String },
  aboutBusiness: { type: String }
});

userSchema.pre('save', async function (next) {
  const doc = this;
  if (!doc._id) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userId' },
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

const User = mongoose.model('User', userSchema);


// PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  rating: {type: Number }
//   updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);


// REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
//   updatedAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);


// COMMENT SCHEMA
const commentSchema = new mongoose.Schema({
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
//   updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { User, Product, Review, Comment };

// SIGNUP
app.post('/api/users', urlencodedParser, async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name, userType } = req.body;

    // Validate request data
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new user instance using the Mongoose model
    const user = new User({
      name,
      email,
      password,
      userType
    });

    // Save the user to the database
    await user.save();

    // Return a success response
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


//LOGIN
app.post('/api/login', urlencodedParser, async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return a success response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Define a route to handle the creation of a product
app.post('/api/addProducts', async (req, res) => {
    // The form sends data in JSON format with fields: name, category, price, description, etc.
    const { name, category, price, description } = req.body;
  
    // To validate that all fields are filled or not
  
    if (!name || !category || !price || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Create a new product instance using the Mongoose model
      const product = new Product({
        name,
        category,
        price,
        description
      });
  
      // Save the product to the database
      await product.save();
  
      // Return a success response
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


// Add this route to fetch user information by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);
    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// UPDATE BUSINESS PROFILE
app.put('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, profilePicture, aboutBusiness, category } = req.body;

    // Find the user by ID in the database
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile fields
    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;
    if (aboutBusiness) user.aboutBusiness = aboutBusiness;
    if (category) user.category = category;

    // Save the updated user profile
    await user.save();

    // Return a success response
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// app.get("/api/insert", (req, res) => {
//     const prd = new Product({
//         id: 1001,
//         name: 'Product 1',
//         detail: 'Details for Project 1'
//     });
//     prd
//         .save()
//         .then(
//             () => console.log("One entry added"), 
//             (err) => console.log(err)
//         );
//     res.json("Inserted Successfully")

// })

app.listen(5000, () => {console.log("Server started on 5000") }) 
const express = require("express");
const router = express.Router();
const { User, Product, Review } = require("./models");
const bodyParser = require("body-parser");

// Use body-parser middleware to parse JSON bodies
router.use(bodyParser.json());


// Authentication middleware
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
      next(); // User is authenticated
    } else {
      res.status(401).json({ message: "User not authenticated" }); // User is not authenticated
    }
  };


// SIGNUP
router.post("/users/signup", async (req, res) => {
    try {
      const { name, email, password, userType } = req.body;
  
      // Validate request data
      if (!name || !email || !password || !userType) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Create a new user instance using the Mongoose model
      const user = new User({ name, email, password, userType });
      await user.save();
  
      // Return a success response
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

// LOGIN
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Store user information in the session
    req.session.user = user;
    console.log(user._id);

    // Return a success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// FETCH USER PROFILE
router.get("/users/profile", async (req, res) => {
  try {
    // Retrieve user information from the session
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE USER PROFILE
router.put("/users/profile", async (req, res) => {
  try {
    const { _id, name, profilePicture, aboutBusiness, category } = req.body;

    // Find the user by ID in the database
    let user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile fields
    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;
    if (aboutBusiness) user.aboutBusiness = aboutBusiness;
    if (category) user.category = category;

    // Save the updated user profile
    await user.save();

    // Return a success response
    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/products", async(req,res) => {

return res.status(200).json("was good");

})

// CREATE PRODUCT
router.post("/products", async (req, res) => {
    try {
      const { name, category, description, price } = req.body;
      const userId = req.get("userId");
      console.log(userId);
      console.log(!name,!category,!description,!price);
      // Validate request data
      if (!userId || !name || !category || !description || !price) {
        return res.status(400).json({
          message:
            "userId, name, category, description, and price are required fields",
        });
      }
  
    //   // Parse userId as a number
    //   const parsedUserId = parseInt(userId);
  
      // Create a new product instance using the Mongoose model
      const product = new Product({
        userId,
        name,
        category,
        description,
        price
        
      });
  
      // Save the product to the database
      await product.save();
  
      // Return a success response
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

// CREATE REVIEW
router.post("/products/:productId/reviews", async (req, res) => {
    try {
      const { rating, reviewText } = req.body;
      const productId = req.params.productId;
      console.log(req.session.user);
      const userId = req.get("userId");
      //console.log(req.session.user.);
      // Validate request data
      if (!userId || !rating) {
        return res.status(400).json({
          message: "userId and rating are required fields",
        });
      }
  
    //   // Parse productId as a number
    //   const parsedProductId = parseInt(productId);
  
      // Create a new review instance using the Mongoose model
      const review = new Review({
        userId,
        productId,
        rating,
        reviewText,
      });
  
      // Save the review to the database
      await review.save();
  
      // Return a success response
      res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

module.exports = router;

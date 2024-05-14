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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password criteria
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    // You can add more criteria for password validation if needed

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

router.get("/products", async (req, res) => {
  return res.status(200).json("was good");
});

// CREATE PRODUCT
router.post("/products", async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const userId = req.get("userId");
    console.log(userId);
    console.log(!name, !category, !description, !price);
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
      price,
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
    const userId = req.get("userId");

    // Validate request data
    if (!userId || !rating) {
      return res.status(400).json({
        message: "userId and rating are required fields",
      });
    }

    // Create a new review instance using the Mongoose model
    const review = new Review({
      userId,
      productId,
      rating,
      reviewText,
    });

    // Save the review to the database
    await review.save();

    // Calculate the new average rating for the product
    const productReviews = await Review.find({ productId });
    const totalRatings = productReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const avgRating = totalRatings / productReviews.length;

    // Update the product with the new average rating
    await Product.findByIdAndUpdate(productId, { rating: avgRating });

    // Return a success response
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET FIVE LATEST PRODUCTS
router.get("/products/latest", async (req, res) => {
  try {
    // Find the five latest products
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5) // Limit to five products
      .populate("userId", "name") // Populate userId field with name of the user
      .exec();

    // Get reviews for each product
    const productIds = products.map((product) => product._id);
    const reviews = await Review.find({ productId: { $in: productIds } });

    // Group reviews by productId
    const reviewsByProductId = {};
    reviews.forEach((review) => {
      if (!reviewsByProductId[review.productId]) {
        reviewsByProductId[review.productId] = [];
      }
      reviewsByProductId[review.productId].push(review);
    });

    // Calculate average rating for each product
    const productsWithAvgRating = products.map((product) => {
      const productReviews = reviewsByProductId[product._id] || [];
      const totalRatings = productReviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating =
        productReviews.length > 0 ? totalRatings / productReviews.length : 0;
      return {
        _id: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        user: product.userId,
        avgRating,
      };
    });

    // Return the list of products with additional information
    res.status(200).json(productsWithAvgRating);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET PRODUCT DETAILS WITH REVIEWS
router.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find all reviews for the product
    const reviews = await Review.find({ productId });

    // Return product details along with reviews
    res.status(200).json({ product, reviews });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

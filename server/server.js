const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");

const session = require('express-session');
const routes = require('./routes');

// Import models
require('./models');

app.use(cors());

app.use(session({
  secret: 'f5c81ed7b5e5d034f7aeb2e2ad2af60e4aa9bc683bea22007246c0cf07f4701a',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect(
    "mongodb+srv://fatimaatharkhan:IulvIKMp7KeVH9T6@productreview.ipm7xjq.mongodb.net/ProductReview?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


// Use routes defined in routes.js
app.use('/api', routes);

app.listen(5000, () => {console.log("Server started on 5000") })
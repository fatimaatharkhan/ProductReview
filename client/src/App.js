import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import Home from "./Components/Home";
import Navbar from './Components/Navbar'
import Home1 from "./Components/Home1";
import Login_Signup from "./Components/Login_Signup";
import Audio from './Components/Audio'
import Money from './Components/Money'
import ThreeD from './Components/ThreeD'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home1 />} />
        <Route path="/3D" element= {<ThreeD />} />
        <Route path="/audio" element= {<Audio />} />
        <Route path="/money" element= {<Money />} />
        <Route path="/login_signup" element={<Login_Signup />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

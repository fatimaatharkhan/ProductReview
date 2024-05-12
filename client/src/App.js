import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Button, Modal, Form, Input } from "antd";
import ProductDetails from "./Components/ProductDetails";
import Home from "./Components/Home";



const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/product-details">Product Details</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/" element={<ProtectedRoute />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

function ProtectedRoute() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogin = (values) => {
    // Destructure values to extract username and password
    const { username, password } = values;

    fetch("/api/getProducts").then(
      res = res.json()
    ).then(
      data =>{
        const user = data.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          setLoggedIn(true);
        }
      }
    )

    // // Perform authentication here
    // const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    
  };

  const handleSignup = (values) => {
    // Destructure values to extract username and password
    const { username, password } = values;

    // Save user data to localStorage
    const user = { username, password };
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...storedUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Clear any user data from localStorage if needed
  };

  // Redirect to login if not logged in
  if (!loggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="link" onClick={() => setShowSignupModal(true)}>
              Signup
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Signup"
          visible={showSignupModal}
          onCancel={() => setShowSignupModal(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleSignup}>
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

  // If logged in, render the home page
  return <Home handleLogout={handleLogout} />;
}

export default App;
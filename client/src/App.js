import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Button, Modal, Form, Input, Select } from "antd";
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

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;

      // Send a POST request to the login API endpoint
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (response.ok) {
        // Login successful, retrieve the user data from the response
        const userData = await response.json();
        setLoggedIn(true);
        // You can store the user data in the state or context for further use
      } else {
        // Login failed, display error message
        console.error("Error logging in:", response.statusText);
        // You can display an error message to the user or handle it as needed
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // You can display an error message to the user or handle it as needed
    }
  };

  const handleSignup = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // User created successfully
        setShowSignupModal(false);
      } else {
        // Error creating user
        console.error("Error creating user 2:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user 1:", error);
    }
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
          <Form.Item label="Email" name="email">
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
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User Type"
              name="userType"
              rules={[
                { required: true, message: "Please select your user type!" },
              ]}
            >
              <Select>
                <Select.Option value="business">Business</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
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

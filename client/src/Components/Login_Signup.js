import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input, Select } from "antd";

function Login_Signup() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate hook
  
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
          navigate('/'); // Redirect to home page after login
        } else {
          // Login failed, display error message
          console.error("Error logging in:", response.statusText);
        }
      } catch (error) {
        console.error("Error logging in:", error);
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
              <Link to='/'>
                <Button>Go Back</Button>
              </Link>
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
  
    // If logged in, redirect to home page
    return null;
}

export default Login_Signup;

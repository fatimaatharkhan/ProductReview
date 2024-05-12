import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Card,
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
const { Title } = Typography;
const { TextArea } = Input;

const Home = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    rating: "",
    content: "", // Initialize content as an empty string
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error parsing products from localStorage:", error);
    }
  }, []);

  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const clearNewProduct = () => {
    setNewProduct({ title: "", rating: "", content: "" });
  };

  const handleAddProduct = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    clearNewProduct();
  };

  const handleSave = () => {
    const updatedProducts = [...products, newProduct];
    saveProductsToLocalStorage(updatedProducts);
    setProducts(updatedProducts);
    setVisible(false);
    clearNewProduct();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const ProductList = () => (
    <Space direction="vertical" size={8}>
      {products.map((product, index) => (
        <Card
          key={index}
          title={product.title}
          extra={<span>Rating: {product.rating}</span>}
          style={{ width: "500px", backgroundColor: "#e6f7ff" }}
          actions={[
            <Button type="link" onClick={() => console.log("hello world")}>
              View Detail
            </Button>,
          ]}
        >
          <p>{product.content}</p>
        </Card>
      ))}
    </Space>
  );

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Button onClick={handleLogout}>Logout</Button>
          <Title level={2} style={{ textAlign: "center" }}>
            Product Reviews
          </Title>
          <Button
            type="primary"
            onClick={handleAddProduct}
            style={{ marginBottom: "10px" }}
          >
            Add Product
          </Button>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={8}>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            {products.length === 0 ? (
              <p>Please add a product</p>
            ) : (
              <ProductList />
            )}
          </div>
        </Col>
      </Row>
      <Modal title="Add New Product" onOk={handleSave} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              name="title"
              value={newProduct.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Rating">
            <Input
              name="rating"
              value={newProduct.rating}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea
              name="content"
              value={newProduct.content}
              onChange={handleChange}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
import React from "react";
import { Button, Form, Input, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditBusinessProfile = ({ user, setUser, showModal, setShowModal }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Update user profile
      const updatedUser = {
        ...user,
        name: values.name,
        aboutBusiness: values.aboutBusiness,
        category: values.category,
        profilePicture: values.profilePicture && values.profilePicture[0]?.response?.url,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      message.success("Profile updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Modal
      title="Edit Business Profile"
      visible={showModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: user.name,
          aboutBusiness: user.aboutBusiness,
          category: user.category,
        }}
      >
        <Form.Item
          label="Profile Picture"
          name="profilePicture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            customRequest={dummyRequest}
            listType="picture"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Business Name"
          name="name"
          rules={[{ required: true, message: "Please input your business name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Business Category"
          name="category"
          rules={[{ required: true, message: "Please select your business category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="About Business"
          name="aboutBusiness"
          rules={[{ required: true, message: "Please provide some information about your business!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBusinessProfile;

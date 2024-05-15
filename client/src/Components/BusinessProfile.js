import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import EditBusinessProfile from "./EditBusinessProfile";
import Navbar from "./Navbar";

const BusinessProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check if user is authenticated
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          // If user is not authenticated, redirect to login/signup page
          window.location.href = "/login_signup";
          return;
        }

        // If user is authenticated, set user profile data
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
      } catch (error) {
        // If user is not authenticated, redirect to login/signup page
        window.location.href = "/login_signup";
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <h1>Business Profile</h1>
      <Modal
        title="Edit Profile"
        visible={showEditModal}
        onCancel={handleEditModalClose}
        footer={null}
      >
        <EditBusinessProfile
          user={user}
          setUser={setUser}
          showModal={showEditModal} // Pass showModal instead of setShowModal
          setShowModal={setShowEditModal}
        />
      </Modal>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <img
              src="https://via.placeholder.com/200"
              alt="Profile"
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
          </div>
          <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Website: {user.website}</p>
            <p>Description: {user.aboutBusiness}</p>
            <p>Category: {user.category}</p>
          </div>
        </div>
      )}
      <Button type="primary" onClick={handleEditProfile}>
        Edit Profile
      </Button>
    </div>
  );
};

export default BusinessProfile;

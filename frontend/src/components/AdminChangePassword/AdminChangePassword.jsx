import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const AdminChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (settings.newPassword !== settings.confirmPassword) {
      setError("New Password and Confirm Password do not match");
    } else {
      try {
        const response = await axios.put(
            "http://localhost:5000/api/admin_setting/admin-change-password",
            settings,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );
          
      

        if (response.data.success) {
          navigate("/admin-dashboard");
          setError("");
          
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        } else {
          setError("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter old password"
            onChange={handleChange}
            value={settings.oldPassword}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChange}
            value={settings.newPassword}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            onChange={handleChange}
            value={settings.confirmPassword}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 mt-4 rounded-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default AdminChangePassword;

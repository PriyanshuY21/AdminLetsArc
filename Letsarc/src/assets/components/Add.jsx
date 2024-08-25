import React, { useState } from 'react';
import axios from 'axios';

const Add = ({ onBackClick }) => {
  // Manages form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    organizationRole: '',
    email: '',
    contact: '',
    password: '' 
  });

  // Manage the message to be displayed after submission
  const [message, setMessage] = useState('');

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, organizationName, organizationRole, email, contact, password } = formData;

    // Checks if all fields are filled
    if (!firstName || !lastName || !organizationName || !organizationRole || !email || !contact || !password) {
      setMessage('Please fill out all fields.');
      return; // Exits if any field is empty
    }

    try {
      // Sends POST request to add client details
      await axios.post('http://localhost:5007/api/users', formData);
      setMessage('Client details have been added.'); // Success message
      // Resets form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        organizationName: '',
        organizationRole: '',
        email: '',
        contact: '',
        password: ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add client details.'); // Error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="firstName">Name</label>
            <div className="flex space-x-4">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-grow p-2 border rounded border-gray-300"
              />
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="flex-grow p-2 border rounded border-gray-300"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="organizationName">Organization Name</label>
            <input
              type="text"
              id="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="organizationRole">Organization Role</label>
            <input
              type="text"
              id="organizationRole"
              placeholder="Organization Role"
              value={formData.organizationRole}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>

          {/* Display message based on success or failure */}
          {message && (
            <div className={`mb-4 text-center ${message.includes('added') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}

          {/* Buttons for navigating back and submitting the form */}
          <div className="flex justify-center space-x-4">
            <button type="button" onClick={onBackClick} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-opacity duration-300">
              Back
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-opacity duration-300">
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

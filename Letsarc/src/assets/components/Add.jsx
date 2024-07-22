import React, { useState } from 'react';
import axios from 'axios';

const Add = ({ onBackClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    organizationRole: '',
    email: '',
    contact: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, organizationName, organizationRole, email, contact } = formData;
    if (!firstName || !lastName || !organizationName || !organizationRole || !email || !contact) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users', formData);
      setMessage('Client details have been added.');
      setFormData({
        firstName: '',
        lastName: '',
        organizationName: '',
        organizationRole: '',
        email: '',
        contact: ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add client details.');
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
          {message && (
            <div className={`mb-4 text-center ${message.includes('added') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
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

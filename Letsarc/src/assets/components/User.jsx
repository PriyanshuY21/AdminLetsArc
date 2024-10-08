import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { FaSave, FaEdit } from 'react-icons/fa'; 

const User = () => {
  // Stores form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    organizationRole: '',
    email: '',
    contact: ''
  });

  // Toggles between editing and viewing mode
  const [editing, setEditing] = useState(true);

  // Stores current user's ID
  const [currentId, setCurrentId] = useState(null);

  // Effect to fetch user data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch user data the server
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5007/api/users'); // Fetch users from API
      if (res.data.length > 0) { // Check if there are any users
        const user = res.data[0]; // Get first user (assumes there's at least one user)
        setFormData(user); // Set form data with fetched user's details
        setCurrentId(user._id); // Sets current user ID
        setEditing(false); // Sets editing mode to false as data is being displayed
      }
    } catch (err) {
      console.error(err); // Log any errors to the console
    }
  };

  // Function to handle input changes in form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); // Updates specific field in form data
  };

  // Function to handle form submission (save or update user)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (currentId) {
      await axios.put(`http://localhost:5007/api/users/${currentId}`, formData); // Update user details
    } else {
      const res = await axios.post('http://localhost:5007/api/users', formData); // Create a new user
      setCurrentId(res.data._id); // Sets current user ID to newly created user ID
    }
    setEditing(false); // Sets editing mode to false after submission
  };

  // Function to toggle editing mode
  const handleEdit = () => {
    setEditing(true); // Sets editing mode to true
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome!!</h2>
        <form onSubmit={handleSubmit}>
          {/* Form submission is handled by handleSubmit */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="firstName">Name</label>
            <div className="flex space-x-4">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={`flex-grow p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
                readOnly={!editing}
              />
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={`flex-grow p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
                readOnly={!editing}
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
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing}
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
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing}
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
              className={`w-full p-2 border rounded ${editing ? 'border-gray-300' : 'border-white bg-gray-200 text-black'}`}
              readOnly={!editing}
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button type="button" onClick={handleEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-opacity duration-300">
              <FaEdit />
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-opacity duration-300">
              <FaSave />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;

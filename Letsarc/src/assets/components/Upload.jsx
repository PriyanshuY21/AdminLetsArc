import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upload = ({ onBackClick }) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    projectName: '',
    clientName: '',
    contactNumber: '',
    email: '',
    date: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clients, setClients] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5007/api/users');
        setClients(response.data);
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, projectName, clientName, contactNumber, email, date } = formData;

    if (!firstName || !lastName || !projectName || !clientName || !contactNumber || !email || !date) {
      setError('All fields are required');
      setShowDialog(true);
      return;
    }

    try {
      await axios.post('http://localhost:5005/api/adminprojects', formData);
      setFormData(initialFormData);
      setShowDialog(true);
      setError('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form');
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {error ? 'Error' : 'Project Assigned'}
            </h3>
            <p className="mb-4">
              {error || 'The project has been assigned successfully.'}
            </p>
            <button
              onClick={handleCloseDialog}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-4xl">
        <div className="w-1/3 pr-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Points of Contact</h2>
          <ul className="text-sm list-none">
            <li className="mb-4">
              <strong>Support</strong><br />
              <a href="mailto:support@tune.com" className="text-green-600 text-base">support@tune.com</a>
            </li>
            <li>
              <strong>Billing Enquiries</strong><br />
              <span className="text-green-600 text-base">+91-123456789</span>
            </li>
          </ul>
        </div>
        <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="Monsterrat text-2xl font-bold mb-4 text-center">Assign Project</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Please note: all fields are required</p>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
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
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="clientName">Client Name</label>
              <select
                id="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client._id} value={`${client.firstName} ${client.lastName}`}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between px-40">
              <button
                type="button"
                onClick={onBackClick}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Assign Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;

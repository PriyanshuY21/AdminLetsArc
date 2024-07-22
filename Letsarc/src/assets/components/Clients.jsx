import React, { useState, useEffect } from 'react';
import { FaSearch, FaEllipsisH } from 'react-icons/fa';

const Client = ({ onAddClientClick }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setSelectedUser(data[0]);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEditSave = () => {
    fetch(`http://localhost:5000/api/users/${editUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editUser),
    })
      .then(response => response.json())
      .then((updatedUser) => {
        setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        setEditUser(null);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organizationRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRowClassName = (user, index) => {
    if (user === selectedUser) {
      return 'bg-nn2';
    } else {
      if (index % 2 === 0) {
        return 'bg-secondary';
      } else {
        return 'bg-nn';
      }
    }
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Clients</h2>
          <button className="bg-gr text-white px-4 py-2 rounded-md" onClick={onAddClientClick} style={{ marginLeft: '60rem' }}>
            Add Client
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search Organisation or Client"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-nc rounded-md pl-10 pr-10 py-2"
          />
        </div>
      </div>
      <div className="flex" style={{ height: '50%' }}>
        <div className="flex flex-col w-full pr-2">
          <div className="overflow-auto flex-1 border border-gray-200 rounded-lg shadow-lg p-2 custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-nn">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Organisation Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Organisation Role</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Email</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Contact</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-secondary divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={getRowClassName(user, index)}
                    onClick={() => setSelectedUser(user)}
                    style={{ cursor: 'pointer' }}
                  >
                    {editUser && editUser._id === user._id ? (
                      <>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-text">
                          <input
                            type="text"
                            value={editUser.firstName}
                            onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                            className="border border-gray-300 rounded-md p-1"
                          />
                          <input
                            type="text"
                            value={editUser.lastName}
                            onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          <input
                            type="text"
                            value={editUser.organizationName}
                            onChange={(e) => setEditUser({ ...editUser, organizationName: e.target.value })}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          <input
                            type="text"
                            value={editUser.organizationRole}
                            onChange={(e) => setEditUser({ ...editUser, organizationRole: e.target.value })}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          <input
                            type="email"
                            value={editUser.email}
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          <input
                            type="text"
                            value={editUser.contact}
                            onChange={(e) => setEditUser({ ...editUser, contact: e.target.value })}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-text">
                          <button onClick={handleEditSave} className="bg-green-500 text-white px-4 py-1 rounded-md">Save</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-text">
                          {`${user.firstName} ${user.lastName}`}
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          {user.organizationName}
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          {user.organizationRole}
                        </td>
                        <td className="px-6 py-3 text-center whitespace-nowrap font-medium text-sm text-text">
                          {user.email}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-text text-center">{user.contact}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-text relative">
                          <FaEllipsisH
                            className="ml-4 cursor-pointer"
                            onClick={() => setShowActions(showActions === user._id ? null : user._id)}
                          />
                          {showActions === user._id && (
                            <div className="absolute right-0 z-40 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setEditUser(user)}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('../api/admin/users') // update with your route
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSuspend = async (userId) => {
    await axios.patch(`../api/admin/users/${userId}/suspend`);
    alert('User suspended');
  };

  const handleDelete = async (userId) => {
    await axios.delete(`../api/admin/users/${userId}`);
    alert('User deleted');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.fullName}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleSuspend(user.id)} className="px-3 py-1 bg-yellow-500 text-white rounded">Suspend</button>
                <button onClick={() => handleDelete(user.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

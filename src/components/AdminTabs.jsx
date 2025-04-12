import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ServiceManagement from './ServiceManagement';

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'services' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Service Management
        </button>
      </div>

      {activeTab === 'users' ? <UserManagement /> : <ServiceManagement />}
    </div>
  );
};

export default AdminTabs;

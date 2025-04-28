import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/users' },
    { label: 'Service Providers', path: '/service-providers' },
    { label: 'Bidding', path: '/bidding' },
    { label: 'Support Tickets', path: '/support-tickets' },
    { label: 'Live Ads', path: '/live-ads' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Task Tracking', path: '/task-tracking' },  // 👈 NEW!
    { label: 'Settings', path: '/settings' }
  ];

  return (
    <aside className="w-60 p-4 border-r border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <nav className="space-y-2">
        {navItems.map(item => (
          <Link 
            key={item.label} 
            to={item.path} 
            className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

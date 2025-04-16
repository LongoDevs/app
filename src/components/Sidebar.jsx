import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    'Dashboard', 'Users', 'Service Providers', 'Bidding',
    'Support Tickets', 'Live Ads', 'Notifications', 'Settings'
  ];

  return (
    <aside className="w-60 p-4 border-r border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <nav className="space-y-2">
        {navItems.map(item => (
          <Link key={item} to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

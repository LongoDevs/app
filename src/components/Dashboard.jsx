// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '@/services/dashboard/getDashboardData';

const Dashboard = () => {
  const [data, setData] = useState({
    users: 0,
    providers: 0,
    views: 0,
    applications: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <h4 className="text-sm font-semibold">Users</h4>
        <p className="text-2xl font-bold">{data.users}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <h4 className="text-sm font-semibold">Service Providers</h4>
        <p className="text-2xl font-bold">{data.providers}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <h4 className="text-sm font-semibold">Page Views</h4>
        <p className="text-2xl font-bold">{data.views}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
        <h4 className="text-sm font-semibold">New Applications</h4>
        <p className="text-2xl font-bold">{data.applications}</p>
      </div>
    </div>
  );
};

export default Dashboard;

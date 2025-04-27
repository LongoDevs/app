import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    users: 0,
    providers: 0,
    views: 0,
    applications: 0,
    revenue: [],
    services: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userRes,
          providerRes,
          viewsRes,
          applicationsRes,
          revenueRes,
          servicesRes,
        ] = await Promise.all([
          axios.get('/api/dashboard/users'),
          axios.get('/api/dashboard/service-providers'),
          axios.get('/api/dashboard/page-views'),
          axios.get('/api/dashboard/new-applications'),
          axios.get('/api/dashboard/revenue-graph'),
          axios.get('/api/dashboard/requested-services'),
        ]);

        setData({
          users: userRes.data.count || 0,
          providers: providerRes.data.count || 0,
          views: viewsRes.data.views || 0,
          applications: applicationsRes.data.total || 0,
          revenue: revenueRes.data.data || [],
          services: servicesRes.data.data || [],
        });
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Page Views" value={data.views} />
        <Card title="Total Users" value={data.users} />
        <Card title="Total Service Providers" value={data.providers} />
        <Card title="New Applications" value={data.applications} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.revenue}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4fd1c5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Requested Services Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Requested Services</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.services}>
              <XAxis dataKey="service" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Bar dataKey="count" fill="#68d391" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
    <h3 className="text-sm text-gray-500 dark:text-gray-300 mb-2">{title}</h3>
    <p className="text-3xl font-bold text-black dark:text-white">{value?.toLocaleString() || 0}</p>
  </div>
);

export default Dashboard;

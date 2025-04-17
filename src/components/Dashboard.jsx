import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    users: 0,
    providers: 0,
    views: 0,
    applications: 0,
    revenue: [],
    services: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const [dashboardRes, revenueRes, servicesRes] = await Promise.all([
        axios.get('/api/dashboard'),
       
      ]);

      setData({
        ...dashboardRes.data,
        revenue: revenueRes.data,
        services: servicesRes.data
      });
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Page Views" value={data.views} />
        <Card title="Total Users" value={data.users} />
        <Card title="Total Services" value={data.providers} />
        <Card title="New Applications" value={data.applications} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-white text-lg mb-2">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.revenue}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4fd1c5" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-white text-lg mb-2">Requested Services</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.services}>
              <XAxis dataKey="service" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#68d391" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-gray-800 text-white p-6 rounded-xl">
    <h3 className="text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value.toLocaleString()}</p>
  </div>
);

export default Dashboard;

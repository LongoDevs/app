// src/pages/Dashboard.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, CheckCircle } from 'lucide-react';

const stats = [
  { title: "Total Users", value: "2,430", icon: <Users className="w-6 h-6 text-blue-500" /> },
  { title: "Service Providers", value: "580", icon: <Briefcase className="w-6 h-6 text-green-500" /> },
  { title: "Revenue", value: "R72,400", icon: <DollarSign className="w-6 h-6 text-yellow-500" /> },
  { title: "Completed Tasks", value: "1,340", icon: <CheckCircle className="w-6 h-6 text-purple-500" /> }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <Card key={index} className="shadow-md dark:bg-gray-900">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <h3 className="text-xl font-bold">{item.value}</h3>
              </div>
              {item.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Overview Analytics</h2>
        {/* Replace with actual chart (e.g. Recharts/Chart.js) */}
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600 border border-dashed rounded">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

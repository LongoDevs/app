import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('../api/admin/services') // update with your route
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = async (serviceId) => {
    await axios.patch(`../api/admin/services/${serviceId}/approve`);
    alert('Service approved');
  };

  const handleReject = async (serviceId) => {
    await axios.patch(`../api/admin/services/${serviceId}/reject`);
    alert('Service rejected');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Provider</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id} className="border-b">
              <td className="p-2">{service.title}</td>
              <td className="p-2">{service.providerName}</td>
              <td className="p-2">{service.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleApprove(service.id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={() => handleReject(service.id)} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceManagement;

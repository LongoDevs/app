import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailNotificationUI = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/notifications')
      .then(res => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch notifications:', err);
        setLoading(false);
      });
  }, []);

  const handleSendEmail = (id) => {
    axios.post(`/api/notifications/email/${id}`)
      .then(() => alert('Email sent successfully!'))
      .catch(() => alert('Failed to send email.'));
  };

  if (loading) {
    return <div className="p-4 text-center">Loading notifications...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Notification Emails</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map(notification => (
            <li key={notification.id} className="border rounded p-4 flex justify-between items-center shadow-sm">
              <div>
                <h2 className="font-semibold">{notification.title}</h2>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <button
                onClick={() => handleSendEmail(notification.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Send Email
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailNotificationUI;

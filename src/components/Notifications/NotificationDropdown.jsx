import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        🔔 {unreadCount > 0 && <span>({unreadCount})</span>}
      </button>
      {showDropdown && (
        <div style={{ position: 'absolute', top: '30px', right: 0, background: 'white', border: '1px solid black' }}>
          {notifications.map(n => (
            <div key={n.id} style={{ padding: '5px' }}>
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

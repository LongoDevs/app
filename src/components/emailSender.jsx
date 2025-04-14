import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailSender = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [emailTemplate, setEmailTemplate] = useState('');
  const [sendToAll, setSendToAll] = useState(false);
  const [sendToProviders, setSendToProviders] = useState(false);
  const [users, setUsers] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Fetch all users initially
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setUsers(filteredUsers);
  };

  const handleSelectUser = (user) => {
    const isSelected = selectedUsers.includes(user);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter(u => u !== user));  // Deselect user
    } else {
      setSelectedUsers([...selectedUsers, user]);  // Select user
    }
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    const userSelection = sendToAll
      ? 'all'
      : sendToProviders
      ? 'serviceProviders'
      : selectedUsers.map(user => user._id);  // Assuming users have _id field

    try {
      // Send the email via the backend
      await axios.post('/api/email/send-email', {
        emailTemplate,
        users: userSelection,
        subject: 'Your Subject Here',
        message: 'Custom message or dynamic content here',
      });
      alert('Emails sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Send Email to Users</h2>

        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-600">Search User</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Search by name"
          />
          <button onClick={handleSearch} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Select Users</label>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => setSendToAll(!sendToAll)}
              className={`px-4 py-2 rounded-md ${sendToAll ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Send to All Users
            </button>
            <button
              onClick={() => setSendToProviders(!sendToProviders)}
              className={`px-4 py-2 rounded-md ${sendToProviders ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Send to Service Providers
            </button>
          </div>
        </div>

        {sendToAll || sendToProviders || selectedUsers.length > 0 ? (
          <div className="mb-4">
            <label htmlFor="emailTemplate" className="block text-sm font-medium text-gray-600">Select Email Template</label>
            <select
              id="emailTemplate"
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="">-- Select Template --</option>
              <option value="welcome">Welcome Email</option>
              <option value="service-update">Service Update</option>
              <option value="newsletter">Newsletter</option>
            </select>
          </div>
        ) : null}

        {selectedUsers.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Selected Users</label>
            <ul className="mt-2">
              {selectedUsers.map(user => (
                <li key={user._id} className="text-sm text-gray-600">{user.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className={`px-6 py-2 rounded-md ${isSending ? 'bg-gray-400' : 'bg-blue-500 text-white'} hover:bg-blue-700`}
          >
            {isSending ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSender;

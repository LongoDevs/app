import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailSender = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [target, setTarget] = useState('selected');
  const [templates, setTemplates] = useState([]);
  const [templateKey, setTemplateKey] = useState('');

  // Fetch users and email templates
  useEffect(() => {
    axios.get('../api/users') // Endpoint to list users
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));

    axios.get('../api/email-templates') // Endpoint to get email templates
      .then(res => setTemplates(res.data))
      .catch(err => console.error('Error fetching templates:', err));
  }, []);

  // Toggle selection of users
  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  // Handle the sending of emails
  const handleSend = async () => {
    try {
      const response = await axios.post('../api/Email-configuration/send-email', {
        target,
        userIds: selected,
        templateKey
      });
      alert('Emails sent successfully!');
    } catch (err) {
      console.error('Error sending emails:', err);
      alert('Failed to send emails');
    }
  };

  return (
    <div className="space-y-4">
      <h2>Email Broadcast</h2>

      {/* Select target recipients */}
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        <option value="selected">Send to Selected</option>
        <option value="providers">Only Service Providers</option>
        <option value="all">Send to All</option>
      </select>

      {/* Show checkboxes to select users when 'selected' target is chosen */}
      {target === 'selected' && (
        <div className="user-list space-y-2">
          {users.map(user => (
            <label key={user.id}>
              <input
                type="checkbox"
                checked={selected.includes(user.id)}
                onChange={() => toggleSelect(user.id)}
              />
              {user.name} ({user.email})
            </label>
          ))}
        </div>
      )}

      {/* Select email template */}
      <select value={templateKey} onChange={e => setTemplateKey(e.target.value)}>
        <option value="">Select Email Template</option>
        {templates.map(t => (
          <option key={t.key} value={t.key}>{t.subject}</option>
        ))}
      </select>

      {/* Send email button */}
      <button onClick={handleSend} disabled={!templateKey}>
        Send Email
      </button>
    </div>
  );
};

export default EmailSender;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailSettings = () => {
  const [config, setConfig] = useState({
    host: '',
    port: '',
    secure: false,
    user: '',
    pass: '',
  });

  useEffect(() => {
    axios.get('/api/Email-configuration/email-config')
      .then(res => setConfig(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/Email-configuration/email-config', config);
      alert('SMTP configuration saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save SMTP configuration.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md max-w-md mx-auto mt-10">
      <input name="host" value={config.host} onChange={handleChange} placeholder="SMTP Host" required className="w-full p-2 border" />
      <input name="port" type="number" value={config.port} onChange={handleChange} placeholder="SMTP Port" required className="w-full p-2 border" />
      <label className="flex items-center space-x-2">
        <span>Secure:</span>
        <input type="checkbox" name="secure" checked={config.secure} onChange={handleChange} />
      </label>
      <input name="user" value={config.user} onChange={handleChange} placeholder="Email Address" required className="w-full p-2 border" />
      <input name="pass" type="password" value={config.pass} onChange={handleChange} placeholder="Email Password" required className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Configuration</button>
    </form>
  );
};

export default EmailSettings;

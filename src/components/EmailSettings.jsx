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
    axios.get('/api/admin/email-config')
      .then(res => setConfig(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({ ...config, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/email-config', config);
      alert('SMTP config saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save config');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="host" value={config.host} onChange={handleChange} placeholder="SMTP Host" required />
      <input name="port" type="number" value={config.port} onChange={handleChange} placeholder="SMTP Port" required />
      <label>
        Secure:
        <input type="checkbox" name="secure" checked={config.secure} onChange={handleChange} />
      </label>
      <input name="user" value={config.user} onChange={handleChange} placeholder="Email Address" required />
      <input name="pass" type="password" value={config.pass} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Save Configuration</button>
    </form>
  );
};

export default EmailSettings;
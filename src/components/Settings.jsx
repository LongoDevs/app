// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = () => {
    alert('Settings saved!');
    // Add API integration here
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <label className="block text-sm font-medium">Notification Email</label>
        <Input
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Enable Notifications</label>
        <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
      </div>

      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
};

export default Settings;

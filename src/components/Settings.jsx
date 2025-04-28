import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';

const Settings = () => {
  const [tab, setTab] = useState('profile');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin' });

  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [appName, setAppName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [firebaseConfig, setFirebaseConfig] = useState('');

  useEffect(() => {
    if (tab === 'users') {
      fetchUsers();
    }
  }, [tab]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/admin/settings', {
        email,
        notificationsEnabled,
        appName,
        googleMapsApiKey,
        firebaseConfig,
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleCreateAdmin = async () => {
    try {
      await axios.post('/api/admin/create', newAdmin);
      setNewAdmin({ name: '', email: '', password: '', role: 'admin' });
      fetchUsers();
      alert('New admin created!');
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
      alert('User role updated!');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      await axios.put(`/api/admin/users/${userId}/suspend`);
      fetchUsers();
      alert('User account put on hold.');
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      fetchUsers();
      alert('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFileUpload = (setter: (file: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setter(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <Tabs value={tab} onValueChange={setTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="new-admin">Create Admin</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
          <div className="space-y-2">
            <label>Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center gap-4">
            <label>Enable Notifications</label>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <Button onClick={handleSave}>Save Preferences</Button>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <h2 className="text-xl font-semibold">Security Settings</h2>
          <Input type="password" placeholder="New Password" />
          <Input type="password" placeholder="Confirm Password" />
          <Button>Update Password</Button>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding" className="space-y-6">
          <h2 className="text-xl font-semibold">App Branding</h2>
          <div className="space-y-2">
            <label>App Name</label>
            <Input value={appName} onChange={(e) => setAppName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label>Upload Logo</label>
            <Input type="file" onChange={handleFileUpload(setLogo)} />
          </div>
          <div className="space-y-2">
            <label>Upload Favicon</label>
            <Input type="file" onChange={handleFileUpload(setFavicon)} />
          </div>
        </TabsContent>

        {/* App Configuration */}
        <TabsContent value="configuration" className="space-y-6">
          <h2 className="text-xl font-semibold">App Configuration</h2>
          <div className="space-y-2">
            <label>Google Maps API Key</label>
            <Input value={googleMapsApiKey} onChange={(e) => setGoogleMapsApiKey(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label>Firebase Configuration (JSON String)</label>
            <Input value={firebaseConfig} onChange={(e) => setFirebaseConfig(e.target.value)} />
          </div>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedUser(user)}>View</Button>
                        </DialogTrigger>
                        <DialogContent>
                          {selectedUser && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">User Profile</h3>
                              <p><b>Name:</b> {selectedUser.name}</p>
                              <p><b>Email:</b> {selectedUser.email}</p>
                              <p><b>Role:</b> {selectedUser.role}</p>
                              <p><b>Status:</b> {selectedUser.active ? 'Active' : 'Suspended'}</p>
                              <Button onClick={() => handleRoleUpdate(selectedUser.id, selectedUser.role === 'admin' ? 'user' : 'admin')}>
                                {selectedUser.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                              </Button>
                              <Button variant="destructive" onClick={() => handleSuspendUser(selectedUser.id)}>Suspend</Button>
                              <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser.id)}>Delete</Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Create New Admin */}
        <TabsContent value="new-admin" className="space-y-6">
          <h2 className="text-xl font-semibold">Create New Admin</h2>
          <Input placeholder="Name" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} />
          <Input placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
          <Input type="password" placeholder="Password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} />
          <Button onClick={handleCreateAdmin}>Create Admin</Button>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Settings;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut, Bell, Mail } from 'lucide-react';
import axios from 'axios';

const Header = ({ darkMode, setDarkMode, navigate }) => {
  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await axios.post('/api/auth/logout');
      sessionStorage.clear();
      navigate('/login');
    }
  };

  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <h2 className="text-xl font-bold tracking-wide">DASHBOARD</h2>
      <div className="flex items-center space-x-4">
        <Mail className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <Button variant="ghost" onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <span className="font-medium">Profile</span>
        <Button onClick={handleLogout} variant="destructive">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

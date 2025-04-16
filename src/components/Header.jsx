import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut } from 'lucide-react';
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
    <div className="flex justify-end gap-4 mb-4">
      <Button variant="ghost" onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
      <Button onClick={handleLogout} variant="destructive"><LogOut className="w-5 h-5" /></Button>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="flex min-h-screen dark:bg-black bg-white text-black dark:text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} navigate={navigate} />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

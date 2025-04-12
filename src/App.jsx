import React from 'react';
import AdminTabs from './components/AdminTabs';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-700 text-white p-4 text-center text-xl font-bold">Admin Panel</header>
      <AdminTabs />
    </div>
  );
}

export default App;

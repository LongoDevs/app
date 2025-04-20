import React from 'react';

export const Switch = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className="text-sm">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
          checked ? 'bg-blue-500' : 'bg-gray-400'
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </div>
    </label>
  );
};

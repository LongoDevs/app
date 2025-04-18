import React, { useState, useEffect } from 'react';

const Tasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [statusUpdate, setStatusUpdate] = useState({});

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/tasks/${userId}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const createTask = async () => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text: newTaskText, status: 'pending' }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setNewTaskText('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map(t => (t._id === taskId ? updated : t)));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tasks for User {userId}</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="New task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button onClick={createTask} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id} className="p-3 border rounded shadow">
            <div className="flex justify-between items-center">
              <span>{task.text}</span>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
                className="ml-4 p-1 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

import React, { useState, useEffect } from 'react';
import { taskAPI } from '../api';

function Complete({ onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getCompletedTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching completed tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      await taskAPI.restoreFromCompleted(id);
      fetchTasks();
      onRefresh?.();
    } catch (err) {
      alert('Error restoring task');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskAPI.deleteCompleted(id);
      fetchTasks();
      onRefresh?.();
    } catch (err) {
      alert('Error deleting task');
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all completed tasks?')) {
      try {
        await taskAPI.deleteAllCompleted();
        fetchTasks();
        onRefresh?.();
      } catch (err) {
        alert('Error deleting all tasks');
        console.error(err);
      }
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>COMPLETED TASKS</h1>
      <div className="task-container">
        {tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-title">✓ {task.title}</div>
                <div className="task-desc">{task.desc}</div>
                <div className="task-actions">
                  <button
                    className="action-restore"
                    onClick={() => handleRestore(task.id)}
                  >
                    ↶ RESTORE
                  </button>
                  <button
                    className="action-delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    ✕ DELETE
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="task-item empty-state">
            <p>No completed tasks yet. Start completing some tasks!</p>
          </div>
        )}

        <div className="bulk-actions">
          <button
            className="bulk-delete-all"
            onClick={handleDeleteAll}
            disabled={tasks.length === 0}
          >
            DELETE ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default Complete;

import React, { useState, useEffect } from 'react';
import { taskAPI } from '../api';

function Trash({ onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTrashTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching trash tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      await taskAPI.restoreFromTrash(id);
      fetchTasks();
      onRefresh?.();
    } catch (err) {
      alert('Error restoring task');
      console.error(err);
    }
  };

  const handlePermanentlyDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this task?')) {
      try {
        await taskAPI.permanentlyDeleteTask(id);
        fetchTasks();
        onRefresh?.();
      } catch (err) {
        alert('Error deleting task');
        console.error(err);
      }
    }
  };

  const handleRestoreAll = async () => {
    if (window.confirm('Are you sure you want to restore all tasks?')) {
      try {
        await taskAPI.restoreAllFromTrash();
        fetchTasks();
        onRefresh?.();
      } catch (err) {
        alert('Error restoring all tasks');
        console.error(err);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to permanently delete all tasks in trash?')) {
      try {
        await taskAPI.deleteAllTrash();
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
      <h1>TRASH - DELETED TASKS</h1>
      <div className="task-container">
        {tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-title">🗑 {task.title}</div>
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
                    onClick={() => handlePermanentlyDelete(task.id)}
                  >
                    ✕ PERMANENTLY DELETE
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="task-item empty-state">
            <p>Trash is empty!</p>
          </div>
        )}

        <div className="bulk-actions">
          <button
            className="bulk-restore-all"
            onClick={handleRestoreAll}
            disabled={tasks.length === 0}
          >
            ↶ RESTORE ALL
          </button>
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

export default Trash;

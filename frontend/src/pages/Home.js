import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../api';

function Home({ onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await taskAPI.completeTask(id);
      fetchTasks();
      onRefresh?.();
    } catch (err) {
      alert('Error completing task');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskAPI.deleteTaskToTrash(id);
      fetchTasks();
      onRefresh?.();
    } catch (err) {
      alert('Error deleting task');
      console.error(err);
    }
  };

  const handleCompleteAll = async () => {
    if (window.confirm('Are you sure you want to complete all tasks?')) {
      try {
        await taskAPI.completeAllTasks();
        fetchTasks();
        onRefresh?.();
      } catch (err) {
        alert('Error completing all tasks');
        console.error(err);
      }
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>HOME PAGE - Your Active Tasks</h1>
      <div className="task-container">
        {tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.desc}</div>
                <div className="task-actions">
                  <button
                    className="action-complete"
                    onClick={() => handleComplete(task.id)}
                  >
                    ✓ COMPLETE
                  </button>
                  <Link to={`/update/${task.id}`} className="action-update">
                    ✎ UPDATE
                  </Link>
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
            <p>No active tasks. Time to create one!</p>
          </div>
        )}

        <div className="bulk-actions">
          <button
            className="bulk-complete-all"
            onClick={handleCompleteAll}
            disabled={tasks.length === 0}
          >
            ✓ COMPLETE ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskAPI } from '../api';

function Update({ onRefresh }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTask(id);
      setFormData({
        title: response.data.title,
        desc: response.data.desc,
      });
      setError(null);
    } catch (err) {
      setError('Error fetching task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.desc.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      await taskAPI.updateTask(id, formData);
      onRefresh?.();
      navigate('/');
    } catch (err) {
      alert('Error updating task');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <div className="form-container">
        <h1>UPDATE TASK</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc">Task Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Enter task description"
              value={formData.desc}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="form-submit" disabled={submitting}>
            {submitting ? 'Updating...' : '✓ UPDATE TASK'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../api';

function Add({ onRefresh }) {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      await taskAPI.createTask(formData);
      onRefresh?.();
      navigate('/');
    } catch (err) {
      alert('Error creating task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>ADD NEW TASK</h1>
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

          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Adding...' : '+ ADD TASK'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;

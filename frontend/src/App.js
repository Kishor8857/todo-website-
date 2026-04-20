import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Complete from './pages/Complete';
import Trash from './pages/Trash';
import About from './pages/About';
import Update from './pages/Update';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo">
            <h1>TODO</h1>
          </div>
          <div className="links">
            <Link to="/">HOME</Link>
            <Link to="/add">ADD</Link>
            <Link to="/complete">COMPLETE</Link>
            <Link to="/trash">TRASH</Link>
            <Link to="/about">ABOUT</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home key={refreshKey} onRefresh={handleRefresh} />} />
          <Route path="/add" element={<Add onRefresh={handleRefresh} />} />
          <Route path="/complete" element={<Complete key={refreshKey} onRefresh={handleRefresh} />} />
          <Route path="/trash" element={<Trash key={refreshKey} onRefresh={handleRefresh} />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<Update onRefresh={handleRefresh} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//componenti
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';

//pagine
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import JobDetail from './pages/JobDetail';

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container">
        <Routes>
          {/*rotte pubbliche*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/jobs" element={<Jobs />} />
          
          {/*rotte dinamiche*/}
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          {/*rotta protetta*/}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
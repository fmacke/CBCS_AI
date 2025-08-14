import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProcessesPage from './pages/ProcessesPage';
import ProjectInfographics from './pages/ProjectInfographicsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/processes" element={<ProcessesPage />} />
            <Route path="/infographics" element={<ProjectInfographics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

const ProcessesPage = () => {
  // Get the navigation function from the hook
  const navigate = useNavigate();

  // New function to handle button clicks and navigate
  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container processes-page">
      <h2 className="page-title">Project Management Tools</h2>
      <div className="button-grid">
        <button onClick={() => handleButtonClick('/infographics')} className="process-button">
          Project Infographicss
        </button>
        <button onClick={() => handleButtonClick('/load-new-project')} className="process-button">
          Load New Project
        </button>
        <button onClick={() => handleButtonClick('/run-reports')} className="process-button">
          Run Reports
        </button>
      </div>
    </div>
  );
};

export default ProcessesPage;
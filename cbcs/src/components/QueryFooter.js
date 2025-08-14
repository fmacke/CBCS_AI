import React from 'react';
import '../App.css';

const QueryFooter = ({ query, onQueryChange, onSend, isLoading, inputRef }) => {
  const handleKeyDown = (event) => {
    // Check if the Enter key was pressed without the Shift key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents a new line from being added
      onSend();
    }
  };

  return (
    <div className="query-footer">
      <div className="query-box">
        <textarea
          className="query-input"
          value={query}
          onChange={onQueryChange}
          onKeyDown={handleKeyDown} // Attach the new key handler here
          placeholder="ask CBCS"
          disabled={isLoading}
          ref={inputRef}
        />
        <button onClick={onSend} className="query-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default QueryFooter;
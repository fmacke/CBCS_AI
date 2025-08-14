import React, { useState, useRef, useEffect } from 'react';
import QueryFooter from '../components/QueryFooter';
import '../App.css';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const queryInputRef = useRef(null); // Create a new ref for the input field

  // Scroll to the bottom and focus the input field whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!isLoading) {
      queryInputRef.current?.focus(); // Focus the input field when not loading
    }
  }, [messages, isLoading]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSend = async () => {
    if (!query) return;

    const userMessage = { query: query, answer: null };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:3001/ask-gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.answer = data.answer;
            return updatedMessages;
        });

    } catch (error) {
        console.error('Error fetching from API:', error);
        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.answer = 'Sorry, I could not get a response. Please try again.';
            return updatedMessages;
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="homepage-layout">
        <div className="discussion-panel">
            <h2 className="page-title">Your Assistant</h2>
            <p className="page-subtitle">Ask a question about a project or company procedure.</p>
            
            {messages.map((message, index) => (
                <div key={index} className="message-container">
                    <div className="question-box">
                        <h3>You:</h3>
                        <p>{message.query}</p>
                    </div>
                    {message.answer && (
                        <div className="answer-box">
                            <h3>Assistant:</h3>
                            <p>{message.answer}</p>
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
        <QueryFooter
            query={query}
            onQueryChange={handleQueryChange}
            onSend={handleSend}
            isLoading={isLoading}
            inputRef={queryInputRef} // Pass the ref to the child component
        />
    </div>
  );
};

export default HomePage;
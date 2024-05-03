import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const App = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputText.trim() === '') return;

    setLoading(true);

    try {
      // Make API request to your backend server
      const response = await axios.post('http://localhost:5000/generate', {
        input_text: inputText,
      });

      // Set the answer received from the backend
      setAnswer(response.data.generated_text);
    } catch (error) {
      console.error('Error fetching response:', error);
      setAnswer('Error fetching response');
    }

    setLoading(false);
  };

  const handleAskAnother = () => {
    setInputText('');
    setAnswer('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        {!answer ? (
          <div>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Type your question..."
              value={inputText}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button
              className="mt-2 w-full bg-blue-500 text-white rounded-md p-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">{`${inputText}`}</p>
            <p className="mt-2 text-gray-700">{answer}</p>
            <button
              className="mt-4 bg-blue-500 text-white rounded-md p-2"
              onClick={handleAskAnother}
            >
              Ask Another Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

'use client'
import { useState } from 'react';

const InputForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResponse('');

    try {
      console.log("input: ", input)
      const res = await fetch(`http://127.0.0.1:5000/api/gptresult?input=${encodeURIComponent(input)}`, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      console.log("input: ", input) // check input
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'An error occurred');
        return;
      }

      const data = await res.json();
      setResponse(data.message);  // Extract and set the message from response
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Input:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter link'
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        {response && <p>{response}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default InputForm;

'use client'
import { useState } from 'react';
import TechCards from './TechCards';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-SSgray">
        <h1 className="text-6xl font-bold mb-4 mt-8 text-center text-white">
          SkillSprint
        </h1>
        <p className="text-lg text-center mb-8 text-white max-w-2xl">
          Enter a job posting to receive a recommended crash course study guide for the dedicated job posting!
        </p>

        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your job posting here"
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Fully rounded
          />
          <button
            type="submit"
            className="ml-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none" // Fully rounded and spaced
          >
            Enter
          </button>
        </form>
      
      <br>

      </br>
      
      <div>
        <TechCards response={response}/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

    </div>
  );
};

export default InputForm;

import React, { useState } from 'react';
import openai from 'openai';

const App = () => {
  const [task, setTask] = useState('');
  const [steps, setSteps] = useState('');
  
  const generateSteps = async () => {
    try {
      // Initialize OpenAI API client
      const client = new openai.OpenAI({
        apiKey: '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',
        // Make sure to set the option for browser usage if applicable
        dangerouslyAllowBrowser: true
      });
  
      // Call the OpenAI API to generate steps for the task
      const response = await client.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Given the task: "${task}", provide steps to complete it.`,
        max_tokens: 100,
        temperature: 0.5
      });
  
      // Check if response and choices exist before accessing them
      if (response && response.choices && response.choices.length > 0) {
        // Extract and set the generated steps
        setSteps(response.choices[0].text.trim());
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error generating steps:", error);
    }
  };
  
  
  

  return (
    <div>
      <h1>Productivity App</h1>
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={generateSteps}>Generate Steps</button>
      {steps && (
        <div>
          <h2>Steps to Complete Task:</h2>
          <p>{steps}</p>
        </div>
      )}
    </div>
  );
};

export default App;

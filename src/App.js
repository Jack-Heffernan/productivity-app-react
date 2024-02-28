import React, { useState } from 'react';
import openai from 'openai';
import './index.css';

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
        max_tokens: 500,
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

  const [checkedSteps, setCheckedSteps] = useState([]);

  const toggleStep = (stepIndex) => {
    if (checkedSteps.includes(stepIndex)) {
      setCheckedSteps(checkedSteps.filter(index => index !== stepIndex));
    } else {
      setCheckedSteps([...checkedSteps, stepIndex]);
    }
  };

  const isStepChecked = (stepIndex) => {
    return checkedSteps.includes(stepIndex);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-6 rounded-lg bg-white shadow-md max-h-80 object-contain">
        <h1 className="text-2xl font-bold mb-4">How can we help?</h1>
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full border-gray-300 border-2 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        <button onClick={generateSteps} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Generate Steps
        </button>
      </div>
      {steps && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Steps to Complete Task:</h2>
          {steps.split('\n').map((step, index) => (
            step.trim() !== '' && (
              <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-md p-4 mb-4">
                <input
                  type="checkbox"
                  checked={isStepChecked(index)}
                  onChange={() => toggleStep(index)}
                  className="h-5 w-5 text-blue-500"
                />
                <p className={isStepChecked(index) ? 'line-through' : ''}>{step}</p>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

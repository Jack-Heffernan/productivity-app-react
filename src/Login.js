import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1/api/auth/login', formData);
      console.log('Login successful:', response.data);
      onClose(); 
    } catch (error) {

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-gray-300 border-2 rounded-md p-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" className="w-full border-gray-300 border-2 rounded-md p-2 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

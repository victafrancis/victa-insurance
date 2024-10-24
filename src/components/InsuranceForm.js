// src/components/InsuranceForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import thankYouImage from '../assets/andres_victa.jpg';

const InsuranceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded text-left">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Thank You!</h2>
        <p className="text-gray-600 mb-4">
          Your quote request has been sent successfully. I will send you the quote at the email address you provided within the next few days.
        </p>
        <p className="mb-4">
          I look forward to helping you find the best plan for you and your family!
        </p>
        <p className="mb-4">-Andres</p>
        <img src={thankYouImage} alt="Thank you" className="mt-4 mx-auto w-1/2" />
    </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
        Request A Free Quote
      </h2>

      {/* Age Field */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Age:</label>
        <input
          type="number"
          {...register('age', { required: 'Age is required' })}
          className={`w-full px-3 py-2 border rounded ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          } text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200`}
          min="0"
        />
        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
      </div>

      {/* Sex Field */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Sex:</label>
        <select
          {...register('sex', { required: 'Sex is required' })}
          className={`w-full px-3 py-2 border rounded ${
            errors.sex ? 'border-red-500' : 'border-gray-300'
          } text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200`}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.sex && <span className="text-red-500 text-sm">{errors.sex.message}</span>}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Email:</label>
        <input
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address'
            }
          })}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200`}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      {/* Comments/Questions Field */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Comments/Questions (Optional):</label>
        <textarea
          {...register('comments')}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
          rows="4"
          placeholder="Enter any additional comments or questions here..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded ${
          isSubmitting ? 'cursor-not-allowed opacity-50' : ''
        } transition-colors duration-200`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          'Request Quote'
        )}
      </button>
    </form>
  );
};

export default InsuranceForm;

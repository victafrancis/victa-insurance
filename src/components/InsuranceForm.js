// src/components/InsuranceForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

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
      <div className="max-w-md mx-auto p-6 bg-blue-800 shadow-md rounded text-center">
        <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
        <p>Your estimate has been sent successfully. We will be in contact with you within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-blue-800 shadow-md rounded">
      {/* Age Field */}
      <div className="mb-4">
        <label className="block mb-1">Age:</label>
        <input
          type="number"
          {...register('age', { required: 'Age is required' })}
          className={`w-full px-3 py-2 border rounded ${
            errors.age ? 'border-red-500' : 'border-blue-300'
          } text-black`}
          min="0"
        />
        {errors.age && <span className="text-red-400 text-sm">{errors.age.message}</span>}
      </div>

      {/* Sex Field */}
      <div className="mb-4">
        <label className="block mb-1">Sex:</label>
        <select
          {...register('sex', { required: 'Sex is required' })}
          className={`w-full px-3 py-2 border rounded ${
            errors.sex ? 'border-red-500' : 'border-blue-300'
          } text-black`}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.sex && <span className="text-red-400 text-sm">{errors.sex.message}</span>}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block mb-1">Email:</label>
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
            errors.email ? 'border-red-500' : 'border-blue-300'
          } text-black`}
        />
        {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
      </div>

      {/* Comments/Questions Field */}
      <div className="mb-4">
        <label className="block mb-1">Comments/Questions (Optional):</label>
        <textarea
          {...register('comments')}
          className="w-full px-3 py-2 border border-blue-300 rounded text-black resize-none"
          rows="4"
          placeholder="Enter any additional comments or questions here..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded ${
          isSubmitting ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          'Get Estimate'
        )}
      </button>
    </form>
  );
};

export default InsuranceForm;

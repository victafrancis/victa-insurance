// src/components/InsuranceForm.js
import React from 'react';
import { useForm } from 'react-hook-form';

const InsuranceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Estimate sent successfully!');
      } else {
        alert('There was an error. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('There was an error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Age:</label>
        <input
          type="number"
          {...register('age', { required: true })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.age && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Sex:</label>
        <select
          {...register('sex', { required: true })}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.sex && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Get Estimate
      </button>
    </form>
  );
};

export default InsuranceForm;

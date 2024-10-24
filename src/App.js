// src/App.js
import React from 'react';
import InsuranceForm from './components/InsuranceForm';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-gray-800 text-center py-6">
        <h1 className="text-3xl font-bold text-white">Welcome to Victa Insurance</h1>
        <p className="mt-2 text-gray-300">Your trusted partner for life insurance and retirement plans.</p>
      </header>
      <main className="py-10 px-4">
        <InsuranceForm />
      </main>
    </div>
  );
}

export default App;

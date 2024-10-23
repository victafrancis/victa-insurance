// src/App.js
import React from 'react';
import InsuranceForm from './components/InsuranceForm';

function App() {
  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <header className="bg-blue-800 text-center py-6">
        <h1 className="text-3xl font-bold">Welcome to Victa Insurance</h1>
        <p className="mt-2">Your trusted partner for life insurance and retirement plans.</p>
      </header>
      <main className="py-10">
        <InsuranceForm />
      </main>
    </div>
  );
}

export default App;

// src/App.js
import React from 'react';
import InsuranceForm from './components/InsuranceForm';
import InsuranceInfo from './components/InsuranceInfo';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-center py-6">
        <h1 className="text-3xl font-bold text-white">Welcome to Victa Insurance</h1>
        <p className="mt-2 text-gray-300">Your trusted partner for life insurance and retirement plans.</p>
      </header>

      {/* Main Content */}
      <main className="py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
          {/* Insurance Information Component */}
          <div className="lg:w-3/5">
            <InsuranceInfo />
          </div>

          {/* Insurance Form Component */}
          <div className="lg:w-2/5">
            <InsuranceForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <HomePage />
      </div>
    </div>
  );
};

export default App;

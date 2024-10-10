import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 mb-4 p-2 border border-red-500 bg-red-100 rounded">
      {message}
    </div>
  );
};

export default ErrorMessage;

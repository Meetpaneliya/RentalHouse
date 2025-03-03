import React from 'react';

function App() {
  return (
    <div className="justify-center min-h-screen bg-gray-100 flex items-center">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-900">Tailwind CSS Demo</h1>
        <p className="text-gray-600 text-center">
          If you can see this styled content, Tailwind CSS is working correctly!
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;
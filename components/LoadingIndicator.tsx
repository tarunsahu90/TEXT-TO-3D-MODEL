
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  'Initializing 3D rendering engine...',
  'Sculpting digital clay...',
  'Applying high-resolution textures...',
  'Calculating light and shadow physics...',
  'Assembling polygonal mesh...',
  'Finalizing model details...',
  'Almost ready to unveil...',
];

export const LoadingIndicator: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-gray-800/50 border border-gray-700 rounded-xl">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-gray-300 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

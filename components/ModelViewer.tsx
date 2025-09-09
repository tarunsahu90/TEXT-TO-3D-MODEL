
import React from 'react';
import { RotateIcon } from './icons/RotateIcon';
import { ZoomIcon } from './icons/ZoomIcon';

interface ModelViewerProps {
  imageUrl: string;
  title: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ imageUrl, title }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-6 animate-fade-in">
      <div className="relative group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-contain rounded-lg aspect-square bg-gray-900 shadow-2xl"
        />
        <div className="absolute top-3 right-3 flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <RotateIcon />
          <ZoomIcon />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50"></div>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-white capitalize">{title}</h2>
      </div>
    </div>
  );
};

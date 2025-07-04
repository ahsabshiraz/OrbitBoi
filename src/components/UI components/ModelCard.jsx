import React, { useState } from 'react';
import { Eye, Download, MoreVertical } from 'lucide-react';

export default function ModelCard({ model }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* 3D Model Preview Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg">3D</span>
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center space-x-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
            <Eye className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
            <Download className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{model.name}</h3>
        <p className="text-sm text-gray-500 mb-3">Updated {model.updated || '2 days ago'}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {model.type || 'OBJ'}
          </span>
          <span className="text-xs text-gray-400">
            {model.size || '2.4 MB'}
          </span>
        </div>
      </div>
    </div>
  );
}

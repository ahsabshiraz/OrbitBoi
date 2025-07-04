import React, { useState } from 'react';
import { Eye, Edit2, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ModelCard({ experience }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formattedDate = new Date(experience.createdAt).toLocaleDateString(); // e.g., "7/4/2025"
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
          <button
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            onClick={() => navigate(`/creator/${experience._id}`)}
          >
            <Edit2 className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{experience.name}</h3>
        <p className="text-sm text-gray-500 mb-3">Uploaded at {formattedDate}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {experience.size || '2.4 MB'}
          </span>
        </div>
      </div>
    </div>
  );
}

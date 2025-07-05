import React, { useState } from 'react';
import { Eye, Edit2, Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCreatorStore from '../../store/CreatorStore/useCreatorStore';

export default function ModelCard({ experience, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { deleteExperience } = useCreatorStore();

  const formattedDate = new Date(experience.createdAt).toLocaleDateString();

  const shapeIndex = parseInt(experience._id.slice(-1), 16) % 10;

  const shapes = [
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-md" />, // Circle
    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rotate-45 shadow-md" />, // Diamond
    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md" />, // Rounded Square
    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-blue-500" />, // Triangle
    <div className="w-10 h-4 rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-md" />, // Capsule
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 clip-hexagon shadow-md" />, // Hexagon
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-500 clip-octagon shadow-md" />, // Octagon
    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 skew-y-6 shadow-md" />, // Skewed Square
    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rotate-12 shadow-md" />, // Tilted Box
    <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-red-500 rounded-tl-full rounded-br-full shadow-md" />, // Blob
  ];

  const handleDelete = async (e) => {
    e.stopPropagation();
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${experience.name}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setIsDeleting(true);
    try {
      await deleteExperience(experience._id);
      // Call the onDelete callback to refresh the parent component
      if (onDelete) {
        onDelete(experience._id);
      }
    } catch (error) {
      alert(`Failed to delete experience: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="group bg-[#111111] rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-[#1F1F1F] hover:border-[#2A2A2A]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-[#1A1A1A]">
        {/* Shape Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {shapes[shapeIndex]}
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            className="p-1.5 bg-white/10 backdrop-blur-sm rounded-md hover:bg-white/20 transition-colors"
            onClick={() => navigate(`/viewer/${experience._id}`)}
          >
            <Eye className="w-4 h-4 text-white" />
          </button>
          <button
            className="p-1.5 bg-white/10 backdrop-blur-sm rounded-md hover:bg-white/20 transition-colors"
            onClick={() => navigate(`/creator/${experience._id}`)}
          >
            <Edit2 className="w-4 h-4 text-white" />
          </button>
          <button 
            className={`p-1.5 backdrop-blur-sm rounded-md transition-colors ${
              isDeleting 
                ? 'bg-red-500/20 cursor-not-allowed' 
                : 'bg-white/10 hover:bg-red-500/20'
            }`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2Icon className={`w-4 h-4 ${isDeleting ? 'text-red-400' : 'text-white'}`} />
          </button>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-white text-sm mb-1 truncate">{experience.name}</h3>
        <p className="text-xs text-zinc-400 mb-2">Uploaded on {formattedDate}</p>
      </div>
    </div>
  );
}

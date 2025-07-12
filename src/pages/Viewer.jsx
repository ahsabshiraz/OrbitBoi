import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import BackGround from './BackGround';
import ViewerModel from './ViewerModel';
import ViewerCameraSetup from './ViewerCameraSetup';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { ArrowLeft, Eye, Edit2 } from 'lucide-react';
import LoadingScreen from '../components/UI components/LoadingScreen';

const Viewer = () => {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    loadSceneData,
    exposure, 
    env,
    backgroundColor,
  } = useCreatorStore();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/experiences/${experienceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Experience not found');
        }

        const data = await response.json();
        setExperience(data);
        
        // Load scene data for this experience
        await loadSceneData(experienceId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (experienceId) {
      fetchExperience();
    }
  }, [experienceId, loadSceneData]);

  if (loading) {
    return <LoadingScreen message="Loading experience..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Experience not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <div className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-xl font-bold text-zinc-100">{experience.name}</h1>
            <p className="text-sm text-zinc-400">View Mode</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/creator/${experienceId}`)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="flex-1 relative">
        <Canvas
          shadows
          gl={{ toneMappingExposure: exposure }}
          camera={{ position: [0, 1, 10], fov: 50 }}
          style={{ backgroundColor: backgroundColor }}
        >
          <ViewerCameraSetup />
          <BackGround />
          <Suspense fallback={null}>
            {experience.models && experience.models.map((model) => (
              <ViewerModel 
                url={model.cloudinaryUrl} 
                modelId={model._id || model.cloudinaryUrl} 
                key={model._id || model.cloudinaryUrl} 
              />
            ))}
            {env && <Environment preset="city" background />}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Viewer; 
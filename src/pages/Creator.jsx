import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from '../config/api';
import CreatorScene from "./CreatorScene";
import LeftPanel from "./LeftPanel";
import { Plus, Save, Check } from 'lucide-react';
import UploadModal from './UploadModel';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';

export default function Creator() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showUploadModel = useCreatorStore((state) => state.showUploadModel)
  const setShowUploadModel = useCreatorStore((state) => state.setShowUploadModel)
  const setCurrentExperienceId = useCreatorStore((state) => state.setCurrentExperienceId)
  const { saveSceneData, loadSceneData, saving, lastSaved } = useCreatorStore();

  const fetchExperience = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/experiences/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExperience(response.data);
    } catch (err) {
      setError('Failed to load experience');
      console.error('Error fetching experience:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveSceneData(id);
      // Show success feedback
      console.log('Scene saved successfully!');
    } catch (err) {
      console.error('Failed to save scene:', err);
      alert('Failed to save scene. Please try again.');
    }
  };

  useEffect(() => {
    setCurrentExperienceId(id);
    if (id) {
      fetchExperience();
      // Load scene data when component mounts
      if (id && id !== 'undefined') {
        loadSceneData(id);
      }
    }
  }, [id, setCurrentExperienceId, loadSceneData]);

  if (loading) return <div>Loading experience...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!experience) return <div>Experience not found</div>;
  
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel experience={experience} />
      <div className="flex-1 relative">
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-3">
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg transition-colors ${
              saving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
          
          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModel(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Model</span>
          </button>
        </div>

        <CreatorScene experience={experience} />
        {showUploadModel && (
          <UploadModal onUploadSuccess={fetchExperience} />
        )}
      </div>
    </div>
  );
}

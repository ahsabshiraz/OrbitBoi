import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import CreatorScene from "./CreatorScene";
import LeftPanel from "./LeftPanel";
import { Plus } from 'lucide-react';
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

  const fetchExperience = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/experiences/${id}`, {
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

  useEffect(() => {
    setCurrentExperienceId(id);
    if (id) {
      fetchExperience();
    }
  }, [id, setCurrentExperienceId]);

  if (loading) return <div>Loading experience...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!experience) return <div>Experience not found</div>;
  console.log('currewnt experience',experience)
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel experience={experience} />
      <div className="flex-1 relative">
        {/* Upload Button */}
        <button
          onClick={() => setShowUploadModel(true)}
          className="absolute top-4 right-4 z-10 flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Model</span>
        </button>

        <CreatorScene experience={experience} />
        {showUploadModel && (
          <UploadModal onUploadSuccess={fetchExperience} />
        )}
      </div>
    </div>
  );
}

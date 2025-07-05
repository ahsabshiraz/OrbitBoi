import React, { useEffect } from 'react';
import { Plus, Grid } from 'lucide-react';
import ModelCard from '../components/UI components/ModelCard';
import Header from '../components/UI components/Header';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { experiences, fetchExperiences, loading, error } = useCreatorStore();
  const handleCreateExperience = useCreatorStore((state) => state.handleCreateExperience)
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleDeleteExperience = (deletedExperienceId) => {
    // Refresh the experiences list after deletion
    fetchExperiences();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-100">
      <Header />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your Experiences
          </h2>

          <button
            onClick={() => handleCreateExperience(navigate)}
            className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-full shadow-xl transition transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-800/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">Total Experiences</p>
                <p className="text-2xl font-bold text-zinc-100">{experiences.length}</p>
              </div>
              <div className="w-12 h-12 bg-zinc-700/50 rounded-lg flex items-center justify-center">
                <Grid className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Experiences Grid - 5 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {experiences.map((exp) => (
            <ModelCard 
              key={exp._id} 
              experience={exp} 
              onDelete={handleDeleteExperience}
            />
          ))}
        </div>

        {/* Empty & Loading States */}
        {!loading && experiences.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No experiences found. Click "Create" to start one!
          </div>
        )}

        {loading && <div className="text-center py-8 text-zinc-400">Loading...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
      </main>
    </div>
  );
};

export default Dashboard;

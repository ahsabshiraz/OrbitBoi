import React, { useEffect, useState } from 'react';
import { Upload, Grid, List, Plus, Eye, Download } from 'lucide-react';
import ModelCard from '../components/UI components/ModelCard'
import Header from '../components/UI components/Header'
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import UploadModal from './UploadModel';

const Dashboard = () => {
  const { models, fetchModels, loading, error } = useCreatorStore();
  const showUploadModel = useCreatorStore((state) => state.showUploadModel)
  const setShowUploadModel = useCreatorStore((state) => state.setShowUploadModel)

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Header />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Your 3D Models
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowUploadModel(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Upload Model</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Experiences</p>
                <p className="text-2xl font-bold text-gray-900">{models.length === 0 ? '0' : models.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Grid className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <ModelCard key={model._id} model={model} />
          ))}
        </div>

        {/* Empty State (if no models) */}
        {models.length === 0 && !loading && (
          <div className="text-center py-16 text-gray-500">
            No models found. Upload your first 3D model!
          </div>
        )}

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </main>

      {/* Upload Modal */}
      {showUploadModel && (
        <UploadModal />
      )}
    </div>
  );
};

export default Dashboard;
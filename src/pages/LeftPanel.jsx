import React from 'react';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { 
  FiCamera, 
  FiTarget, 
  FiRotateCw, 
  FiZoomIn, 
  FiMove, 
  FiWind,
  FiSun,
  FiDroplet,
  FiImage,
  FiCloud,
  FiBox,
  FiMaximize2
} from 'react-icons/fi';

const LeftPanel = () => {
  const {
    // Camera controls
    cameraPosition,
    setCameraPositionX,
    setCameraPositionY,
    setCameraPositionZ,
    lookAtPosition,
    setLookAtPositionX,
    setLookAtPositionY,
    setLookAtPositionZ,
    
    // Orbit controls
    enabledDamping,
    setEnabledDamping,
    enabledPan,
    setEnabledPan,
    enabledRotate,
    setEnabledRotate,
    enabledZoom,
    setEnabledZoom,
    
    // Environment
    exposure,
    setExposure,
    env,
    setEnv,
    
    // Fog and background
    backgroundColor,
    setBackgroundColor,
    fogEnabled,
    toggleFog,
    fogMin,
    setFogMin,
    fogMax,
    setFogMax,
    
    // Model controls
    selectedModelId,
    modelPositions,
    setModelPositionX,
    setModelPositionY,
    setModelPositionZ,
    setModelRotationX,
    setModelRotationY,
    setModelRotationZ,
    setModelScale,
    setSelectedModelId
  } = useCreatorStore();

  // Get current model position data
  const currentModelPosition = selectedModelId ? (modelPositions[selectedModelId] || { 
    x: 0, y: 0, z: 0, 
    rotationX: 0, rotationY: 0, rotationZ: 0, 
    scale: 1 
  }) : null;

  return (
    <div className="left-panel bg-gray-50 p-4 rounded-lg shadow-md h-full overflow-y-auto w-[17vw] min-w-[280px]">

      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Scene Controls</h2>
      
      {/* Model Position Section */}
      {selectedModelId && currentModelPosition && (
        <div className="control-group mb-6">
          <div className="flex items-center justify-between mb-3 text-gray-700">
            <div className="flex items-center">
              <FiBox className="mr-2" />
              <h3 className="font-semibold">Model Position</h3>
            </div>
            <button
              onClick={() => setSelectedModelId(null)}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
            >
              Deselect
            </button>
          </div>
          
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-700 font-medium">Selected Model ID:</p>
            <p className="text-xs text-blue-600 truncate">{selectedModelId}</p>
          </div>
          
          {/* Position Controls */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Position</h4>
            <div className="grid grid-cols-3 gap-2">
              <VectorInput 
                label="X"
                value={currentModelPosition.x}
                onChange={(value) => setModelPositionX(selectedModelId, value)}
              />
              <VectorInput 
                label="Y"
                value={currentModelPosition.y}
                onChange={(value) => setModelPositionY(selectedModelId, value)}
              />
              <VectorInput 
                label="Z"
                value={currentModelPosition.z}
                onChange={(value) => setModelPositionZ(selectedModelId, value)}
              />
            </div>
          </div>
          
          {/* Rotation Controls */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Rotation</h4>
            <div className="grid grid-cols-3 gap-2">
              <VectorInput 
                label="X"
                value={currentModelPosition.rotationX}
                onChange={(value) => setModelRotationX(selectedModelId, value)}
              />
              <VectorInput 
                label="Y"
                value={currentModelPosition.rotationY}
                onChange={(value) => setModelRotationY(selectedModelId, value)}
              />
              <VectorInput 
                label="Z"
                value={currentModelPosition.rotationZ}
                onChange={(value) => setModelRotationZ(selectedModelId, value)}
              />
            </div>
          </div>
          
          {/* Scale Control */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Scale</h4>
            <div className="flex items-center">
              <FiMaximize2 className="mr-2 text-gray-500" />
              <input
                type="number"
                value={currentModelPosition.scale}
                onChange={(e) => setModelScale(selectedModelId, parseFloat(e.target.value) || 1)}
                step="0.1"
                min="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Camera Position Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <FiCamera className="mr-2" />
          <h3 className="font-semibold">Camera Position</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <VectorInput 
            label="X"
            value={cameraPosition.x}
            onChange={setCameraPositionX}
          />
          <VectorInput 
            label="Y"
            value={cameraPosition.y}
            onChange={setCameraPositionY}
          />
          <VectorInput 
            label="Z"
            value={cameraPosition.z}
            onChange={setCameraPositionZ}
          />
        </div>
      </div>

      {/* Look At Position Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <FiTarget className="mr-2" />
          <h3 className="font-semibold">Look At Position</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <VectorInput 
            label="X"
            value={lookAtPosition.x}
            onChange={setLookAtPositionX}
          />
          <VectorInput 
            label="Y"
            value={lookAtPosition.y}
            onChange={setLookAtPositionY}
          />
          <VectorInput 
            label="Z"
            value={lookAtPosition.z}
            onChange={setLookAtPositionZ}
          />
        </div>
      </div>

      {/* Orbit Controls Section */}
      <div className="control-group mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Orbit Controls</h3>
        <div className="grid grid-cols-2 gap-3">
          <ToggleButton 
            icon={<FiRotateCw />}
            label="Rotate"
            checked={enabledRotate}
            onChange={(e) => setEnabledRotate(e.target.checked)}
          />
          <ToggleButton 
            icon={<FiZoomIn />}
            label="Zoom"
            checked={enabledZoom}
            onChange={(e) => setEnabledZoom(e.target.checked)}
          />
          <ToggleButton 
            icon={<FiMove />}
            label="Pan"
            checked={enabledPan}
            onChange={(e) => setEnabledPan(e.target.checked)}
          />
          <ToggleButton 
            icon={<FiWind />}
            label="Damping"
            checked={enabledDamping}
            onChange={(e) => setEnabledDamping(e.target.checked)}
          />
        </div>
      </div>

      {/* Environment Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <FiSun className="mr-2" />
          <h3 className="font-semibold">Environment</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">Exposure: {exposure.toFixed(1)}</label>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={exposure}
            onChange={(e) => setExposure(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.0</span>
            <span>1.0</span>
            <span>2.0</span>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={env}
              onChange={setEnv}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Environment</span>
          </label>
        </div>
      </div>

      {/* Background Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <FiImage className="mr-2" />
          <h3 className="font-semibold">Background</h3>
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700 mr-3">Color:</label>
          <div className="relative">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
            />
            <div 
              className="absolute inset-0 rounded-md border border-gray-400 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-500">{backgroundColor}</span>
        </div>
      </div>

      {/* Fog Section */}
      <div className="control-group">
        <div className="flex items-center mb-3 text-gray-700">
          <FiCloud className="mr-2" />
          <h3 className="font-semibold">Fog</h3>
        </div>
        
        <div className="flex items-center mb-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={fogEnabled}
              onChange={toggleFog}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Enable Fog</span>
          </label>
        </div>
        
        {fogEnabled && (
          <div className="space-y-3 pl-2 border-l-2 border-gray-200 ml-2">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-500 mb-1">Near Distance</label>
              <input
                type="number"
                value={fogMin}
                onChange={(e) => setFogMin(parseFloat(e.target.value) || 0)}
                step="1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-500 mb-1">Far Distance</label>
              <input
                type="number"
                value={fogMax}
                onChange={(e) => setFogMax(parseFloat(e.target.value) || 0)}
                step="1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Vector Input Component
const VectorInput = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-500 mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      step="0.1"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable Toggle Button Component
const ToggleButton = ({ icon, label, checked, onChange }) => (
  <label className="flex items-center p-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
    <div className="text-gray-600 mr-2">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div className={`ml-auto w-5 h-5 border-2 rounded-md flex items-center justify-center ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  </label>
);

export default LeftPanel; 
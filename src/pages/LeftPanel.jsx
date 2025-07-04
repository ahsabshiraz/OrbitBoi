import React, { useState, useEffect } from 'react';
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
  FiMoon,
  FiSun as FiLightMode
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
    setFogMax
  } = useCreatorStore();

  const [darkMode, setDarkMode] = useState(() => {
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Watch for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="left-panel w-full lg:w-1/4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-md h-full overflow-y-auto border border-gray-200 dark:border-gray-700">

      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Scene Controls</h2>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FiLightMode /> : <FiMoon />}
        </button>
      </div>
      
      {/* Camera Position Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
          <FiCamera className="mr-2" />
          <h3 className="font-semibold">Camera Position</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <VectorInput 
            label="X"
            value={cameraPosition.x}
            onChange={setCameraPositionX}
            darkMode={darkMode}
          />
          <VectorInput 
            label="Y"
            value={cameraPosition.y}
            onChange={setCameraPositionY}
            darkMode={darkMode}
          />
          <VectorInput 
            label="Z"
            value={cameraPosition.z}
            onChange={setCameraPositionZ}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Look At Position Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
          <FiTarget className="mr-2" />
          <h3 className="font-semibold">Look At Position</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <VectorInput 
            label="X"
            value={lookAtPosition.x}
            onChange={setLookAtPositionX}
            darkMode={darkMode}
          />
          <VectorInput 
            label="Y"
            value={lookAtPosition.y}
            onChange={setLookAtPositionY}
            darkMode={darkMode}
          />
          <VectorInput 
            label="Z"
            value={lookAtPosition.z}
            onChange={setLookAtPositionZ}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Orbit Controls Section */}
      <div className="control-group mb-6">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Orbit Controls</h3>
        <div className="grid grid-cols-2 gap-3">
          <ToggleButton 
            icon={<FiRotateCw />}
            label="Rotate"
            checked={enabledRotate}
            onChange={(e) => setEnabledRotate(e.target.checked)}
            darkMode={darkMode}
          />
          <ToggleButton 
            icon={<FiZoomIn />}
            label="Zoom"
            checked={enabledZoom}
            onChange={(e) => setEnabledZoom(e.target.checked)}
            darkMode={darkMode}
          />
          <ToggleButton 
            icon={<FiMove />}
            label="Pan"
            checked={enabledPan}
            onChange={(e) => setEnabledPan(e.target.checked)}
            darkMode={darkMode}
          />
          <ToggleButton 
            icon={<FiWind />}
            label="Damping"
            checked={enabledDamping}
            onChange={(e) => setEnabledDamping(e.target.checked)}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Environment Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
          <FiSun className="mr-2" />
          <h3 className="font-semibold">Environment</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Exposure: {exposure.toFixed(1)}</label>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={exposure}
            onChange={(e) => setExposure(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Environment</span>
          </label>
        </div>
      </div>

      {/* Background Section */}
      <div className="control-group mb-6">
        <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
          <FiImage className="mr-2" />
          <h3 className="font-semibold">Background</h3>
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">Color:</label>
          <div className="relative">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer bg-white dark:bg-gray-800"
            />
            <div 
              className="absolute inset-0 rounded-md border border-gray-400 dark:border-gray-500 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{backgroundColor}</span>
        </div>
      </div>

      {/* Fog Section */}
      <div className="control-group">
        <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Enable Fog</span>
          </label>
        </div>
        
        {fogEnabled && (
          <div className="space-y-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Near Distance</label>
              <input
                type="number"
                value={fogMin}
                onChange={(e) => setFogMin(parseFloat(e.target.value) || 0)}
                step="1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Far Distance</label>
              <input
                type="number"
                value={fogMax}
                onChange={(e) => setFogMax(parseFloat(e.target.value) || 0)}
                step="1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Vector Input Component
const VectorInput = ({ label, value, onChange, darkMode }) => (
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      step="0.1"
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        darkMode 
          ? 'border-gray-600 bg-gray-800 text-gray-100' 
          : 'border-gray-300 bg-white text-gray-900'
      }`}
    />
  </div>
);

// Reusable Toggle Button Component
const ToggleButton = ({ icon, label, checked, onChange, darkMode }) => (
  <label className={`flex items-center p-2 border rounded-lg cursor-pointer transition-colors ${
    darkMode
      ? checked
        ? 'border-blue-500 bg-blue-900/30 hover:bg-blue-900/40'
        : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
      : checked
        ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
        : 'border-gray-300 bg-white hover:bg-gray-50'
  }`}>
    <div className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{icon}</div>
    <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div className={`ml-auto w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors ${
      checked 
        ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' 
        : darkMode 
          ? 'border-gray-500' 
          : 'border-gray-400'
    }`}>
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  </label>
);

export default LeftPanel;
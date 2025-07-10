import React, { useState, useMemo } from 'react';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import {
  FiImage, FiSun, FiRotateCw, FiBox, FiSettings, FiX, FiEye, FiMove, FiCamera
} from 'react-icons/fi';

const TABS = [
  { key: 'bg', icon: FiImage, color: 'from-purple-500 to-pink-500' },
  { key: 'orbit', icon: FiRotateCw, color: 'from-blue-500 to-cyan-500' },
  { key: 'camera', icon: FiCamera, color: 'from-green-500 to-emerald-500' },
  { key: 'model', icon: FiBox, color: 'from-orange-500 to-yellow-500' },
  { key: 'env', icon: FiSun, color: 'from-red-500 to-pink-500' },
];

const LeftPanel = () => {
  const [activeTab, setActiveTab] = useState('bg');
  const [showPanel, setShowPanel] = useState(false);
  const store = useCreatorStore();

  const currentModel = useMemo(() => {
    if (!store.selectedModelId) return null;
    return store.modelPositions[store.selectedModelId] || {
      x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1
    };
  }, [store.selectedModelId, store.modelPositions]);

  return (
    <>
      {/* Sync Camera Button - Always Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center">
        <button
          onClick={store.updateCameraFromCurrentScene}
          className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105"
          title="Sync Camera"
        >
          <FiCamera className="w-5 h-5" />
          <span className="font-medium">Sync Camera</span>
        </button>
      </div>

      {/* Settings Button - Floating Right */}
      {!showPanel && (
        <div className="fixed top-1/2 right-6 z-50 flex flex-col gap-4 items-center -translate-y-1/2">
          <button
            onClick={() => setShowPanel(true)}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
            title="Open Settings"
          >
            <FiSettings className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Panel */}
      <div className={`fixed top-0 right-0 h-full z-40 w-80 transition-all duration-500 ease-out transform
        ${showPanel ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="relative h-full">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-l-3xl blur opacity-20" />
          
          {/* Panel Content */}
          <div className="relative bg-zinc-900/95 backdrop-blur-xl h-full rounded-l-3xl border-l border-t border-b border-white/10 shadow-2xl overflow-hidden">
            
            {/* Panel Header with Close Only */}
            <div className="flex justify-end items-center p-3 bg-black/20 border-b border-white/10">
              <button
                onClick={() => setShowPanel(false)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors duration-200"
                title="Close Panel"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Pills - Horizontal at top */}
            <div className="flex gap-1 p-3 bg-black/20 border-b border-white/10">
              {TABS.map(({ key, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 relative p-2 rounded-xl transition-all duration-300 flex items-center justify-center group
                    ${activeTab === key 
                      ? 'bg-white/10 shadow-lg' 
                      : 'hover:bg-white/5'}`}
                >
                  {activeTab === key && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-xl`} />
                  )}
                  <Icon className={`w-4 h-4 transition-all duration-300 ${
                    activeTab === key ? 'text-white scale-110' : 'text-zinc-400 group-hover:text-white'
                  }`} />
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-4 h-[calc(100%-80px)] overflow-y-auto scrollbar-none">
              <div className="transition-all duration-300">
                {activeTab === 'bg' && <BackgroundControls store={store} />}
                {activeTab === 'orbit' && <OrbitControls store={store} />}
                {activeTab === 'camera' && <CameraControls store={store} />}
                {activeTab === 'model' && <ModelControls store={store} currentModel={currentModel} />}
                {activeTab === 'env' && <EnvironmentControls store={store} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// --- Control Panels (same as before, but you can make them more compact if needed) ---

const BackgroundControls = ({ store }) => (
  <div className="space-y-4">
    {/* Color & Exposure Row */}
    <div className="flex items-center gap-3">
      <div className="relative group">
        <input
          type="color"
          value={store.backgroundColor}
          onChange={e => store.setBackgroundColor(e.target.value)}
          className="w-8 h-8 rounded-lg border-2 border-white/20 cursor-pointer"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        />
        <div 
          className="absolute inset-0 w-8 h-8 rounded-lg border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-200 pointer-events-none"
          style={{ backgroundColor: store.backgroundColor }}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-zinc-400 font-medium">Exposure</span>
          <span className="text-xs text-white bg-white/10 px-2 py-0.5 rounded-full">
            {store.exposure.toFixed(1)}
          </span>
        </div>
        <Slider
          value={store.exposure}
          onChange={store.setExposure}
          min={0}
          max={2}
          step={0.1}
          color="purple"
        />
      </div>
    </div>
    {/* Fog Controls */}
    <div className="bg-white/5 rounded-lg p-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-200 font-medium">Fog</span>
        <PremiumToggle checked={store.fogEnabled} onChange={store.toggleFog} />
      </div>
      {store.fogEnabled && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <NumberInput
            label="Near"
            value={store.fogMin}
            onChange={store.setFogMin}
            compact
          />
          <NumberInput
            label="Far"
            value={store.fogMax}
            onChange={store.setFogMax}
            compact
          />
        </div>
      )}
    </div>
  </div>
);

const OrbitControls = ({ store }) => (
  <div className="grid grid-cols-2 gap-2">
    <ControlCard
      label="Rotate"
      icon={FiRotateCw}
      checked={store.enabledRotate}
      onChange={store.setEnabledRotate}
    />
    <ControlCard
      label="Zoom"
      icon={FiMove}
      checked={store.enabledZoom}
      onChange={store.setEnabledZoom}
    />
    <ControlCard
      label="Pan"
      icon={FiMove}
      checked={store.enabledPan}
      onChange={store.setEnabledPan}
    />
    <ControlCard
      label="Damping"
      icon={FiEye}
      checked={store.enabledDamping}
      onChange={store.setEnabledDamping}
    />
  </div>
);

const CameraControls = ({ store }) => (
  <div className="space-y-2">
    <div className="bg-white/5 rounded-lg p-2 border border-white/10">
      <div className="flex items-center gap-1 mb-2">
        <FiCamera className="w-3 h-3 text-zinc-400" />
        <span className="text-xs text-zinc-200 font-medium">Camera Position</span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {['x', 'y', 'z'].map((axis, i) => (
          <div key={axis} className="flex flex-col">
            <span className="text-xs text-zinc-400 mb-0.5 text-center">{axis.toUpperCase()}</span>
            <input
              type="number"
              value={store.cameraPosition[axis] ?? 0}
              onChange={e => [store.setCameraPositionX, store.setCameraPositionY, store.setCameraPositionZ][i](parseFloat(e.target.value) || 0)}
              className="bg-black/50 text-white text-xs px-1.5 py-1 rounded border border-white/10 focus:border-blue-500 focus:outline-none text-center"
              step="0.1"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white/5 rounded-lg p-2 border border-white/10">
      <div className="flex items-center gap-1 mb-2">
        <FiEye className="w-3 h-3 text-zinc-400" />
        <span className="text-xs text-zinc-200 font-medium">Look At</span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {['x', 'y', 'z'].map((axis, i) => (
          <div key={axis} className="flex flex-col">
            <span className="text-xs text-zinc-400 mb-0.5 text-center">{axis.toUpperCase()}</span>
            <input
              type="number"
              value={store.lookAtPosition[axis] ?? 0}
              onChange={e => [store.setLookAtPositionX, store.setLookAtPositionY, store.setLookAtPositionZ][i](parseFloat(e.target.value) || 0)}
              className="bg-black/50 text-white text-xs px-1.5 py-1 rounded border border-white/10 focus:border-blue-500 focus:outline-none text-center"
              step="0.1"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ModelControls = ({ store, currentModel }) => (
  <div className="space-y-2">
    {store.selectedModelId && currentModel ? (
      <>
        <div className="bg-white/5 rounded-lg p-2 border border-white/10">
          <div className="flex items-center gap-1 mb-2">
            <FiBox className="w-3 h-3 text-zinc-400" />
            <span className="text-xs text-zinc-200 font-medium">Position</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {['x', 'y', 'z'].map((axis, i) => (
              <div key={axis} className="flex flex-col">
                <span className="text-xs text-zinc-400 mb-0.5 text-center">{axis.toUpperCase()}</span>
                <input
                  type="number"
                  value={currentModel[axis] ?? 0}
                  onChange={e => [
                    val => store.setModelPositionX(store.selectedModelId, val),
                    val => store.setModelPositionY(store.selectedModelId, val),
                    val => store.setModelPositionZ(store.selectedModelId, val)
                  ][i](parseFloat(e.target.value) || 0)}
                  className="bg-black/50 text-white text-xs px-1.5 py-1 rounded border border-white/10 focus:border-blue-500 focus:outline-none text-center"
                  step="0.1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 border border-white/10">
          <div className="flex items-center gap-1 mb-2">
            <FiRotateCw className="w-3 h-3 text-zinc-400" />
            <span className="text-xs text-zinc-200 font-medium">Rotation</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {['x', 'y', 'z'].map((axis, i) => (
              <div key={axis} className="flex flex-col">
                <span className="text-xs text-zinc-400 mb-0.5 text-center">{axis.toUpperCase()}</span>
                <input
                  type="number"
                  value={currentModel[`rotation${axis.toUpperCase()}`] ?? 0}
                  onChange={e => [
                    val => store.setModelRotationX(store.selectedModelId, val),
                    val => store.setModelRotationY(store.selectedModelId, val),
                    val => store.setModelRotationZ(store.selectedModelId, val)
                  ][i](parseFloat(e.target.value) || 0)}
                  className="bg-black/50 text-white text-xs px-1.5 py-1 rounded border border-white/10 focus:border-blue-500 focus:outline-none text-center"
                  step="0.1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 border border-white/10">
          <div className="flex items-center gap-1 mb-2">
            <FiSettings className="w-3 h-3 text-zinc-400" />
            <span className="text-xs text-zinc-200 font-medium">Scale</span>
          </div>
          <input
            type="number"
            value={currentModel.scale}
            onChange={e => store.setModelScale(store.selectedModelId, parseFloat(e.target.value) || 1)}
            className="w-full bg-black/50 text-white text-xs px-2 py-1 rounded border border-white/10 focus:border-blue-500 focus:outline-none text-center"
            step="0.1"
            min={0.1}
          />
        </div>
      </>
    ) : (
      <div className="text-center py-4">
        <FiBox className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
        <p className="text-zinc-400 text-xs">No model selected</p>
        <p className="text-zinc-500 text-xs">Select a model in the scene</p>
      </div>
    )}
  </div>
);

const EnvironmentControls = ({ store }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FiSun className="w-5 h-5 text-orange-400" />
        <span className="text-sm text-zinc-200 font-medium">Environment</span>
      </div>
      <PremiumToggle checked={store.env} onChange={store.setEnv} />
    </div>
  </div>
);

// --- Utility Components (Slider, NumberInput, ControlCard, PremiumToggle) ---

const Slider = ({ value, onChange, min, max, step, color = 'blue' }) => (
  <div className="relative">
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
      style={{
        background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${((value - min) / (max - min)) * 100}%, rgb(63 63 70) ${((value - min) / (max - min)) * 100}%, rgb(63 63 70) 100%)`
      }}
    />
  </div>
);

const NumberInput = ({ label, value, onChange, compact = false, ...props }) => (
  <div className={compact ? '' : 'mb-2'}>
    <span className="text-xs text-zinc-400 font-medium mb-1 block">{label}</span>
    <input
      type="number"
      value={value ?? 0}
      onChange={e => onChange(parseFloat(e.target.value) || 0)}
      className="w-full bg-black/50 text-white text-xs px-2 py-1 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
      {...props}
    />
  </div>
);

const ControlCard = ({ label, icon: Icon, checked, onChange }) => (
  <div className={`relative overflow-hidden rounded-lg p-2 cursor-pointer transition-all duration-200 border
    ${checked 
      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30' 
      : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
    onClick={onChange}
  >
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${checked ? 'text-blue-400' : 'text-zinc-400'}`} />
      <span className={`text-xs font-medium ${checked ? 'text-white' : 'text-zinc-300'}`}>
        {label}
      </span>
    </div>
    {checked && (
      <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full" />
    )}
  </div>
);

const PremiumToggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-9 h-5 rounded-full transition-all duration-300 focus:outline-none
      ${checked 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25' 
        : 'bg-zinc-600'}`}
  >
    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300
      ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
  </button>
);

export default LeftPanel;
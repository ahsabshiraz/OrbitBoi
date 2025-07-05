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
  FiMaximize2,
  FiRefreshCw
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
    updateCameraFromCurrentScene,
    
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
    setSelectedModelId,
  } = useCreatorStore();

  // Get current model position data
  const currentModelPosition = selectedModelId ? (modelPositions[selectedModelId] || { 
    x: 0, y: 0, z: 0, 
    rotationX: 0, rotationY: 0, rotationZ: 0, 
    scale: 1 
  }) : null;

  // Handle update button click
  const handleUpdatePositions = () => {
    updateCameraFromCurrentScene();
  };

  return (
    <div className="left-panel bg-zinc-900 p-4 h-full overflow-y-auto w-[20vw] min-w-[280px] border-r border-zinc-700 shadow-lg">
      <h2 className="text-xl font-bold text-zinc-100 mb-6 pb-2 border-b border-zinc-700">Scene Controls</h2>

      {/* Update Positions Button */}
      <div className="mb-6">
        <button
          onClick={handleUpdatePositions}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-sm font-medium"
        >
          <FiRefreshCw className="w-4 h-4" />
          Update Positions
        </button>
        <p className="text-xs text-zinc-400 mt-1 text-center">
          Sync camera and model positions from scene
        </p>
      </div>

      {selectedModelId && currentModelPosition && (
        <div className="control-group mb-6">
          <div className="flex items-center justify-between mb-3 text-zinc-300">
            <div className="flex items-center">
              <FiBox className="mr-2" />
              <h3 className="font-semibold">Model Position</h3>
            </div>
            <button
              onClick={() => setSelectedModelId(null)}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-700"
            >
              Deselect
            </button>
          </div>

          <div className="mb-3 p-2 bg-zinc-800 border border-zinc-700 rounded-md">
            <p className="text-xs text-blue-400 font-medium">Selected Model ID:</p>
            <p className="text-xs text-blue-300 truncate">{selectedModelId}</p>
          </div>

          <VectorGroup
            title="Position"
            x={currentModelPosition.x}
            y={currentModelPosition.y}
            z={currentModelPosition.z}
            setX={(val) => setModelPositionX(selectedModelId, val)}
            setY={(val) => setModelPositionY(selectedModelId, val)}
            setZ={(val) => setModelPositionZ(selectedModelId, val)}
          />

          <VectorGroup
            title="Rotation"
            x={currentModelPosition.rotationX}
            y={currentModelPosition.rotationY}
            z={currentModelPosition.rotationZ}
            setX={(val) => setModelRotationX(selectedModelId, val)}
            setY={(val) => setModelRotationY(selectedModelId, val)}
            setZ={(val) => setModelRotationZ(selectedModelId, val)}
          />

          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Scale</h4>
            <div className="flex items-center">
              <FiMaximize2 className="mr-2 text-zinc-500" />
              <input
                type="number"
                value={currentModelPosition.scale}
                onChange={(e) => setModelScale(selectedModelId, parseFloat(e.target.value) || 1)}
                step="0.1"
                min="0.1"
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <ControlSection icon={<FiCamera />} title="Camera Position">
        <VectorGroup
          x={cameraPosition.x}
          y={cameraPosition.y}
          z={cameraPosition.z}
          setX={setCameraPositionX}
          setY={setCameraPositionY}
          setZ={setCameraPositionZ}
        />
      </ControlSection>

      <ControlSection icon={<FiTarget />} title="Look At Position">
        <VectorGroup
          x={lookAtPosition.x}
          y={lookAtPosition.y}
          z={lookAtPosition.z}
          setX={setLookAtPositionX}
          setY={setLookAtPositionY}
          setZ={setLookAtPositionZ}
        />
      </ControlSection>

      <ControlSection title="Orbit Controls">
        <div className="grid grid-cols-2 gap-3">
          <ToggleButton icon={<FiRotateCw />} label="Rotate" checked={enabledRotate} onChange={setEnabledRotate} />
          <ToggleButton icon={<FiZoomIn />} label="Zoom" checked={enabledZoom} onChange={setEnabledZoom} />
          <ToggleButton icon={<FiMove />} label="Pan" checked={enabledPan} onChange={setEnabledPan} />
          <ToggleButton icon={<FiWind />} label="Damping" checked={enabledDamping} onChange={setEnabledDamping} />
        </div>
      </ControlSection>

      <ControlSection icon={<FiSun />} title="Environment">
        <div className="mb-4">
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Exposure: {exposure.toFixed(1)}</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={exposure}
            onChange={(e) => setExposure(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
        <ToggleButton label="Environment" checked={env} onChange={setEnv} />
      </ControlSection>

      <ControlSection icon={<FiImage />} title="Background">
        <div className="flex items-center">
          <label className="text-sm font-medium text-zinc-400 mr-3">Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-10 h-10 rounded-md border border-zinc-600 cursor-pointer"
          />
          <span className="ml-2 text-xs text-zinc-400">{backgroundColor}</span>
        </div>
      </ControlSection>

      <ControlSection icon={<FiCloud />} title="Fog">
        <ToggleButton label="Enable Fog" checked={fogEnabled} onChange={toggleFog} />
        {fogEnabled && (
          <div className="space-y-3 mt-3 border-l border-zinc-700 pl-3">
            <VectorInput label="Near" value={fogMin} onChange={(e) => setFogMin(parseFloat(e.target.value) || 0)} />
            <VectorInput label="Far" value={fogMax} onChange={(e) => setFogMax(parseFloat(e.target.value) || 0)} />
          </div>
        )}
      </ControlSection>
    </div>
  );
};

const ControlSection = ({ icon, title, children }) => (
  <div className="mb-6">
    {title && (
      <div className="flex items-center mb-3 text-zinc-300">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="font-semibold">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

const VectorGroup = ({ title, x, y, z, setX, setY, setZ }) => (
  <div className="mb-4">
    {title && <h4 className="text-sm font-medium text-zinc-400 mb-2">{title}</h4>}
    <div className="grid grid-cols-3 gap-2">
      <VectorInput label="X" value={x} onChange={(e) => setX(parseFloat(e.target.value) || 0)} />
      <VectorInput label="Y" value={y} onChange={(e) => setY(parseFloat(e.target.value) || 0)} />
      <VectorInput label="Z" value={z} onChange={(e) => setZ(parseFloat(e.target.value) || 0)} />
    </div>
  </div>
);

const VectorInput = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-medium text-zinc-400 mb-1">{label}</label>
    <input
      type="number"
      value={value ?? 0}
      onChange={onChange}
      step="0.1"
      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const ToggleButton = ({ icon, label, checked, onChange }) => (
  <label className="flex items-center p-2 bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-700">
    {icon && <div className="text-zinc-300 mr-2">{icon}</div>}
    <span className="text-sm font-medium text-zinc-200">{label}</span>
    <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    <div
      className={`ml-auto w-5 h-5 border-2 rounded-md flex items-center justify-center ${
        checked ? 'bg-blue-600 border-blue-600' : 'border-zinc-600'
      }`}
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  </label>
);

export default LeftPanel;

import React from 'react';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';

const LeftPanel = () => {
  const {
    exposure,
    setExposure,
    env,
    setEnv,
    enabledDamping,
    setEnabledDamping,
    enabledPan,
    setEnabledPan,
    enabledRotate,
    setEnabledRotate,
    enabledZoom,
    setEnabledZoom,
    cameraPosition,
    setCameraPositionX,
    setCameraPositionY,
    setCameraPositionZ,
    lookAtPosition,
    setLookAtPositionX,
    setLookAtPositionY,
    setLookAtPositionZ
  } = useCreatorStore();

  return (
    <div className="left-panel">
      <h3>Camera Controls</h3>
      
      <div className="control-group">
        <h4>Camera Position</h4>
        <div className="input-group">
          <label>X:</label>
          <input
            type="number"
            value={cameraPosition.x}
            onChange={(e) => setCameraPositionX(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        <div className="input-group">
          <label>Y:</label>
          <input
            type="number"
            value={cameraPosition.y}
            onChange={(e) => setCameraPositionY(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        <div className="input-group">
          <label>Z:</label>
          <input
            type="number"
            value={cameraPosition.z}
            onChange={(e) => setCameraPositionZ(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
      </div>

      <div className="control-group">
        <h4>Look At Position</h4>
        <div className="input-group">
          <label>X:</label>
          <input
            type="number"
            value={lookAtPosition.x}
            onChange={(e) => setLookAtPositionX(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        <div className="input-group">
          <label>Y:</label>
          <input
            type="number"
            value={lookAtPosition.y}
            onChange={(e) => setLookAtPositionY(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        <div className="input-group">
          <label>Z:</label>
          <input
            type="number"
            value={lookAtPosition.z}
            onChange={(e) => setLookAtPositionZ(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
      </div>

      <div className="control-group">
        <h4>Orbit Controls</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={enabledRotate}
              onChange={setEnabledRotate}
            />
            Enable Rotate
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={enabledZoom}
              onChange={setEnabledZoom}
            />
            Enable Zoom
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={enabledPan}
              onChange={setEnabledPan}
            />
            Enable Pan
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={enabledDamping}
              onChange={setEnabledDamping}
            />
            Enable Damping
          </label>
        </div>
      </div>

      <div className="control-group">
        <h4>Environment</h4>
        <div className="input-group">
          <label>Exposure:</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={exposure}
            onChange={(e) => setExposure(parseFloat(e.target.value))}
          />
          <span>{exposure}</span>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={env}
              onChange={setEnv}
            />
            Environment
          </label>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel; 
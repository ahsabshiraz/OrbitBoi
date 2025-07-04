import useCreatorStore from "../store/CreatorStore/useCreatorStore";

export default function LeftPanel() {
  const {
    backgroundColor, setBackgroundColor,
    exposure, setExposure,
    fogEnabled, toggleFog,
    env, setEnv,
    fogMin, setFogMin,
    fogMax, setFogMax
  } = useCreatorStore();

  return (
    <div className="w-full md:w-64 bg-white border-r p-4 space-y-6">
      <div>
        <label className="text-sm font-semibold">Background</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-full h-10 mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Exposure</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={exposure}
          onChange={(e) => setExposure(parseFloat(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Fog</label>
        <input type="checkbox" checked={fogEnabled} onChange={toggleFog} className="ml-2" />
      </div>

      <div>
        <label className="text-sm font-semibold">Fog Min</label>
        <input
          type="number"
          value={fogMin}
          onChange={e => setFogMin(Number(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Fog Max</label>
        <input
          type="number"
          value={fogMax}
          onChange={e => setFogMax(Number(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Enviroment</label>
        <input type="checkbox" checked={env} onChange={setEnv} className="ml-2" />
      </div>
    </div>
  );
}

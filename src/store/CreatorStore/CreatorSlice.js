const CreatorSlice = (set) => ({
    backgroundColor: '#ffffff',
    exposure: 1,
    fogEnabled: false,
    modelUrl: null,
    env: false,
    fogMin: 10,
    fogMax: 100,

    setBackgroundColor: (color) => set({ backgroundColor: color }),
    setExposure: (value) => set({ exposure: value }),
    toggleFog: () => set((state) => ({ fogEnabled: !state.fogEnabled })),
    setModelUrl: (url) => set({ modelUrl: url }),
    setEnv: () => set((state) => ({ env: !state.env })),
    setFogMin: (value) => set({ fogMin: value }),
    setFogMax: (value) => set({ fogMax: value })
});

export default CreatorSlice; 
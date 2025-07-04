const CreatorSlice = (set) => ({
    backgroundColor: '#ffffff',
    exposure: 1,
    fogEnabled: false,
    modelUrl: null,
  
    setBackgroundColor: (color) => set({ backgroundColor: color }),
    setExposure: (value) => set({ exposure: value }),
    toggleFog: () => set((state) => ({ fogEnabled: !state.fogEnabled })),
    setModelUrl: (url) => set({ modelUrl: url }),
});

export default CreatorSlice; 
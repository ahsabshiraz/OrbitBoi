const CreatorSlice = (set, get) => ({
    backgroundColor: '#ffffff',
    exposure: 1,
    fogEnabled: false,
    modelUrl: null,
    env: false,
    fogMin: 10,
    fogMax: 100,
    
    // Model position controls
    selectedModelId: null,
    modelPositions: {}, // { modelId: { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 } }
    
    setSelectedModelId: (modelId) => set({ selectedModelId: modelId }),
    
    // Initialize model position if not exists
    initializeModelPosition: (modelId) => {
        const { modelPositions } = get();
        if (!modelPositions[modelId]) {
            set((state) => ({
                modelPositions: {
                    ...state.modelPositions,
                    [modelId]: { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 }
                }
            }));
        }
    },
    
    // Position setters
    setModelPositionX: (modelId, x) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], x }
            }
        }));
    },
    
    setModelPositionY: (modelId, y) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], y }
            }
        }));
    },
    
    setModelPositionZ: (modelId, z) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], z }
            }
        }));
    },
    
    // Rotation setters
    setModelRotationX: (modelId, rotationX) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], rotationX }
            }
        }));
    },
    
    setModelRotationY: (modelId, rotationY) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], rotationY }
            }
        }));
    },
    
    setModelRotationZ: (modelId, rotationZ) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], rotationZ }
            }
        }));
    },
    
    // Scale setter
    setModelScale: (modelId, scale) => {
        get().initializeModelPosition(modelId);
        set((state) => ({
            modelPositions: {
                ...state.modelPositions,
                [modelId]: { ...state.modelPositions[modelId], scale }
            }
        }));
    },

    setBackgroundColor: (color) => set({ backgroundColor: color }),
    setExposure: (value) => set({ exposure: value }),
    toggleFog: () => set((state) => ({ fogEnabled: !state.fogEnabled })),
    setModelUrl: (url) => set({ modelUrl: url }),
    setEnv: () => set((state) => ({ env: !state.env })),
    setFogMin: (value) => set({ fogMin: value }),
    setFogMax: (value) => set({ fogMax: value })
});

export default CreatorSlice; 
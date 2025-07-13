import API_BASE_URL from '../../config/api';

const CreatorSlice = (set, get) => ({
    backgroundColor: '#ffffff',
    exposure: 1,
    fogEnabled: false,
    modelUrl: null,
    env: false,
    fogMin: 10,
    fogMax: 100,
    ground: true,
    groundLength: 100,
    groundWidth: 100,
    groundType: "plane", // default
    setGroundType: (type) => set({ groundType: type }),
    // Model position controls
    selectedModelId: null,
    modelPositions: {}, // { modelId: { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 } }
    
    // Save functionality
    saving: false,
    lastSaved: null,
    
    setSelectedModelId: (modelId) => set({ selectedModelId: modelId }),
    setGround:() => set((state) => ({ ground: !state.ground })),
    // Save scene data to backend
    saveSceneData: async (experienceId) => {
        const state = get();
        set({ saving: true });
        
        try {
            const token = localStorage.getItem('token');
            const sceneData = {
                // Camera settings
                camera: {
                    position: state.cameraPosition,
                    lookAt: state.lookAtPosition,
                    controls: {
                        enabledDamping: state.enabledDamping,
                        enabledPan: state.enabledPan,
                        enabledRotate: state.enabledRotate,
                        enabledZoom: state.enabledZoom
                    }
                },
                
                // Environment settings
                environment: {
                    exposure: state.exposure,
                    backgroundColor: state.backgroundColor,
                    hdr: {
                        enabled: state.env,
                        hdrRadius: state.hdrRadius,
                        hdrHeight: state.hdrHeight,
                        hdrScale: state.hdrScale,
                        hdrType: state.hdrType || 'forest',
                        hrdUrl: state.customHdrs || [],
                        selected: state.selectedCustomHdr?._id || null, // <-- add this line
                    },
                },
                
                // Fog settings
                fog: {
                    enabled: state.fogEnabled,
                    min: state.fogMin,
                    max: state.fogMax
                },

                // ground settings
                ground: {
                    enabled: state.ground,
                    groundType: state.groundType,
                    length: state.groundLength,
                    width: state.groundWidth,
                },
                // Model positions
                modelPositions: state.modelPositions
            };
            
            const response = await fetch(`${API_BASE_URL}/api/experiences/${experienceId}/scene`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sceneData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save scene data');
            }
            
            const result = await response.json();
            set({ 
                saving: false, 
                lastSaved: new Date().toISOString() 
            });
            
            return result;
        } catch (error) {
            set({ saving: false });
            throw error;
        }
    },
    
    // Load scene data from backend
    loadSceneData: async (experienceId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/experiences/${experienceId}/scene`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                console.log('No saved scene data found, using defaults');
                return;
            }
            
            const sceneData = await response.json();
            
            // Ensure all values have proper defaults to prevent undefined
            const safeSceneData = {
                camera: {
                    position: {
                        x: sceneData.camera?.position?.x ?? 0,
                        y: sceneData.camera?.position?.y ?? 1,
                        z: sceneData.camera?.position?.z ?? 10
                    },
                    lookAt: {
                        x: sceneData.camera?.lookAt?.x ?? 0,
                        y: sceneData.camera?.lookAt?.y ?? 0,
                        z: sceneData.camera?.lookAt?.z ?? 0
                    },
                    controls: {
                        enabledDamping: sceneData.camera?.controls?.enabledDamping ?? true,
                        enabledPan: sceneData.camera?.controls?.enabledPan ?? true,
                        enabledRotate: sceneData.camera?.controls?.enabledRotate ?? true,
                        enabledZoom: sceneData.camera?.controls?.enabledZoom ?? true
                    }
                },
                environment: {
                    exposure: sceneData.environment?.exposure ?? 1,
                    backgroundColor: sceneData.environment?.backgroundColor ?? '#ffffff',
                    hdr: {
                        enabled: sceneData.environment?.hdr?.enabled ?? false,
                        hdrRadius: sceneData.environment?.hdr?.hdrRadius ?? 115,
                        hdrHeight: sceneData.environment?.hdr?.hdrHeight ?? 10,
                        hdrScale: sceneData.environment?.hdr?.hdrScale ?? 150,
                        hdrType: sceneData.environment?.hdr?.hdrType ?? 'forest',
                        hrdUrl: sceneData.environment?.hdr?.hrdUrl ?? []
                    },
                },
                ground: {
                    enabled: sceneData.ground?.enabled ?? true,
                    groundType: sceneData.ground?.groundType ?? 'plane',
                    length: sceneData.ground?.length ?? 100,
                    width: sceneData.ground?.width ?? 100,
                },
                fog: {
                    enabled: sceneData.fog?.enabled ?? false,
                    min: sceneData.fog?.min ?? 10,
                    max: sceneData.fog?.max ?? 100
                },
                modelPositions: sceneData.modelPositions || {}
            };
            
            // Update store with safe data
            set({
                // Camera settings
                cameraPosition: safeSceneData.camera.position,
                lookAtPosition: safeSceneData.camera.lookAt,
                enabledDamping: safeSceneData.camera.controls.enabledDamping,
                enabledPan: safeSceneData.camera.controls.enabledPan,
                enabledRotate: safeSceneData.camera.controls.enabledRotate,
                enabledZoom: safeSceneData.camera.controls.enabledZoom,
                
                // Environment settings
                exposure: safeSceneData.environment.exposure,
                backgroundColor: safeSceneData.environment.backgroundColor,
                env: safeSceneData.environment.hdr.enabled,
                hdrRadius: safeSceneData.environment.hdr.hdrRadius,
                hdrHeight: safeSceneData.environment.hdr.hdrHeight,
                hdrScale: safeSceneData.environment.hdr.hdrScale,
                hdrType: safeSceneData.environment.hdr.hdrType,
                
                // Custom HDRs
                customHdrs: sceneData.environment?.hdr?.hrdUrl || [],
                selectedCustomHdr: sceneData.environment?.hdr?.selected ? sceneData.environment.hdr.hrdUrl.find(hdr => hdr._id === sceneData.environment.hdr.selected) : null,
                // Fog settings
                fogEnabled: safeSceneData.fog.enabled,
                fogMin: safeSceneData.fog.min,
                fogMax: safeSceneData.fog.max,

                //ground setting
                ground: safeSceneData.ground.enabled,
                groundType: safeSceneData.ground.groundType,
                groundLength: safeSceneData.ground.length,
                groundWidth: safeSceneData.ground.width,
                
                // Model positions
                modelPositions: safeSceneData.modelPositions
            });
            
            return safeSceneData;
        } catch (error) {
            console.error('Failed to load scene data:', error);
            // Don't update store on error, keep current values
        }
    },
    
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

    //  Update transfrom controls position from current scene state
    updateTransfromControlsFromScene: (transformControls, modelId) => {
        if (transformControls && modelId) {
            const pos = transformControls.object.position;
            get().setModelPositionX(modelId, pos.x);
            get().setModelPositionY(modelId, pos.y);
            get().setModelPositionZ(modelId, pos.z);
        }
    },
    setTransformControlsRef: (ref) => set({ transformControlsRef: ref }),
    transformControlsRef: null,
    setBackgroundColor: (color) => set({ backgroundColor: color }),
    setExposure: (value) => set({ exposure: value }),
    toggleFog: () => set((state) => ({ fogEnabled: !state.fogEnabled })),
    setModelUrl: (url) => set({ modelUrl: url }),
    setEnv: () => set((state) => ({ env: !state.env })),
    setFogMin: (value) => set({ fogMin: value }),
    setFogMax: (value) => set({ fogMax: value }),
    setGroundLength: (value) => set({groundLength: value}),
    setGroundWidth: (value) => set({groundWidth: value}),
    hdrHeight: 10,
    hdrRadius: 115,
    hdrScale: 150,
    hdrType: 'forest',
    setHdrRadius: (value) => set({ hdrRadius: value }),
    setHdrHeight: (value) => set({ hdrHeight: value }),
    setHdrScale: (value) => set({ hdrScale: value }),
    setHdrType: (value) => set({ hdrType: value }),
    // Delete experience
    deleteExperience: async (experienceId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/experiences/${experienceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete experience');
            }
            
            return { success: true, message: 'Experience deleted successfully' };
        } catch (error) {
            console.error('Failed to delete experience:', error);
            throw error;
        }
    }
});

export default CreatorSlice; 
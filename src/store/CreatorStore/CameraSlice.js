const CameraSetup = (set, get) => ({
    enabledDamping: true,
    enabledPan: true,
    enabledRotate: true,
    enabledZoom: true,
    enabledControl: true,
    
    // Camera position
    cameraPosition: { x: 0, y: 1, z: 10 },
    setCameraPositionX: (x) => set((state) => ({ cameraPosition: { ...state.cameraPosition, x } })),
    setCameraPositionY: (y) => set((state) => ({ cameraPosition: { ...state.cameraPosition, y } })),
    setCameraPositionZ: (z) => set((state) => ({ cameraPosition: { ...state.cameraPosition, z } })),
    
    // LookAt position
    lookAtPosition: { x: 0, y: 0, z: 0 },
    setLookAtPositionX: (x) => set((state) => ({ lookAtPosition: { ...state.lookAtPosition, x } })),
    setLookAtPositionY: (y) => set((state) => ({ lookAtPosition: { ...state.lookAtPosition, y } })),
    setLookAtPositionZ: (z) => set((state) => ({ lookAtPosition: { ...state.lookAtPosition, z } })),
    
    // Camera and controls references for update functionality
    cameraRef: null,
    controlsRef: null,
    
    // Update camera position from current scene state
    updateCameraFromScene: (camera) => {
        if (camera) {
            set({
                cameraPosition: {
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z
                }
            });
        }
    },
    
    // Update look at position from current scene state
    updateLookAtFromScene: (target) => {
        if (target) {
            set({
                lookAtPosition: {
                    x: target.x,
                    y: target.y,
                    z: target.z
                }
            });
        }
    },
    
    // Update camera and look at from current scene state
    updateCameraFromCurrentScene: () => {
        const state = get();
        if (state.cameraRef) {
            state.updateCameraFromScene(state.cameraRef);
        }
        if (state.controlsRef && state.controlsRef.target) {
            state.updateLookAtFromScene(state.controlsRef.target);// controlsRef.target The point the camera is looking at (Vector3)
        }
    },
    
    setEnabledDamping: () => set((state) => ({ enabledDamping: !state.enabledDamping })),
    setEnabledPan: () => set((state) => ({ enabledPan: !state.enabledPan })),
    setEnabledRotate: () => set((state) => ({ enabledRotate: !state.enabledRotate })),
    setEnabledZoom: () => set((state) => ({ enabledZoom: !state.enabledZoom })),
    setEnabledControl: (flag) => set({ enabledControl: flag }),
});

export default CameraSetup;
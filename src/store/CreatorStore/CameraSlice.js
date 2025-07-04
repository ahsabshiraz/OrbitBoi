const CameraSetup = (set) => ({
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
    
    setEnabledDamping: () => set((state) => ({ enabledDamping: !state.enabledDamping })),
    setEnabledPan: () => set((state) => ({ enabledPan: !state.enabledPan })),
    setEnabledRotate: () => set((state) => ({ enabledRotate: !state.enabledRotate })),
    setEnabledZoom: () => set((state) => ({ enabledZoom: !state.enabledZoom })),
    setEnabledControl: (flag) => set({ enabledControl: flag }),
});

export default CameraSetup;
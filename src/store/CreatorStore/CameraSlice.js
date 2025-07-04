const CameraSetup = (set) => ({
    enabledControl: true,
    setEnabledControl: (flag) => set({ enabledControl: flag }),
});

export default CameraSetup; 
const DashBoardSlice = (set, get) => ({
    handleCreateExperience: async (navigate) => {
        try {
            const newExperience = await get().createExperience({
                name: "New Experience",
                description: "A new 3D experience"
            });
            navigate(`/creator/${newExperience._id}`);
        } catch (err) {
            alert('Failed to create experience');
        }
    }
});

export default DashBoardSlice; 
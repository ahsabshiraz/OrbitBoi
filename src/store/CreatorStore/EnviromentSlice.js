import axios from "axios";
import { API_BASE_URL } from "../../config/environment";

const EnvironmentSlice = (set, get) => ({
    customHdrs: [],
    selectedCustomHdr: null,
    removeCustomHdr: (hdrId) => set((state) => ({ customHdrs: state.customHdrs.filter(h => h._id !== hdrId) })),
    setSelectedCustomHdr: (hdr) => set({ selectedCustomHdr: hdr }),

    
    uploadHdr: async (hdrFile) => {
        const token = localStorage.getItem('token');
        const experienceId = get().currentExperienceId;
       
        
        if (!hdrFile) {
            throw new Error('HDR file are required');
        }
        
        const formData = new FormData();
        formData.append('hdr', hdrFile);
        
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/experiences/${experienceId}/hdr`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            // Update the custom HDRs list with the new HDR
            set({ customHdrs: res.data });
            
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    deleteHdr: async (hdrId) => {
        const token = localStorage.getItem('token');
        const experienceId = get().currentExperienceId;
        
        if (!hdrId) {
            throw new Error('HDR ID is required');
        }
        
        try {
            const res = await axios.delete(
                `${API_BASE_URL}/api/experiences/${experienceId}/hdr`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: { hdrId }
                }
            );
            
            // Update the custom HDRs list with the remaining HDRs
            set({ customHdrs: res.data.remainingHdrs });
            
            return res.data;
        } catch (err) {
            throw err;
        }
    },
    
    // Fetch HDRs for an experience
    fetchHdrs: async () => {
        const token = localStorage.getItem('token');
        const experienceId = get().currentExperienceId;
        
        try {
            const res = await axios.get(
                `${API_BASE_URL}/api/experiences/${experienceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const hdrs = res.data.sceneData?.environment?.hdr?.hrdUrl || [];
            set({ customHdrs: hdrs });
            
            return hdrs;
        } catch (err) {
            throw err;
        }
    }
});

export default EnvironmentSlice; 
import axios from 'axios';
import { create } from 'zustand';
import API_BASE_URL from '../../config/api';

const UploadSlice = (set, get) => ({
    experiences: [],
    loading: false,
    error: null,
    showUploadModel: false,
    currentExperienceId: null,
    
    setCurrentExperienceId: (id) => set({ currentExperienceId: id }),
    setShowUploadModel: (flag) => {
        set({ showUploadModel: flag })
    },

    fetchExperiences: async () => {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get(`${API_BASE_URL}/api/experiences`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ experiences: res.data, loading: false });
        } catch (err) {
            set({ error: 'Failed to fetch models', loading: false });
        }
    },

    uploadModel: async (file) => {
        const token = localStorage.getItem('token');
        const experienceId = get().currentExperienceId;
        const formData = new FormData();
        formData.append('model', file);
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/experiences/${experienceId}/models`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return res.data; // The updated experience
        } catch (err) {
            throw err;
        }
    },

    createExperience: async (experienceData) => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/experiences`,
                experienceData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return res.data; // The new experience
        } catch (err) {
            throw err;
        }
    },
});

export default UploadSlice; 
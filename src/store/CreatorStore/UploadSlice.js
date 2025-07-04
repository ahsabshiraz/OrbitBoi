import axios from 'axios';
import { create } from 'zustand';

const UploadSlice = (set, get) => ({
    models: [],
    loading: false,
    error: null,
    showUploadModel: false,

    setShowUploadModel: (flag) => {
        set({ showUploadModel: flag })
    },

    fetchExperiences: async () => {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get('http://localhost:5000/api/experiences', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ models: res.data, loading: false });
        } catch (err) {
            set({ error: 'Failed to fetch models', loading: false });
        }
    },

    uploadModel: async (experienceId, file) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('model', file);
        try {
            const res = await axios.post(
                `http://localhost:5000/api/experiences/${experienceId}/models`,
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
                'http://localhost:5000/api/experiences',
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
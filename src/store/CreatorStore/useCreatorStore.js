import { create } from 'zustand';
import axios from 'axios';

const useCreatorStore = create((set) => ({
    models: [],
    loading: false,
    error: null,
    showUploadModel: false,

    setShowUploadModel: (flag) => {
        set({ showUploadModel: flag })
    },

    fetchModels: async () => {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get('http://localhost:5000/api/models', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ models: res.data, loading: false });
        } catch (err) {
            set({ error: 'Failed to fetch models', loading: false });
        }
    },

    uploadModel: async (file, onSuccess) => {
        set({ loading: true, error: null });
        const formData = new FormData();
        formData.append('model', file);
        const token = localStorage.getItem('token')

        try {
            const res = await axios.post('http://localhost:5000/api/models/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            set((state) => ({
                models: [...state.models, res.data],
                loading: false,
                showUploadModel: false
            }));
            if (onSuccess) onSuccess();
        } catch (err) {
            set({ error: 'Upload failed', loading: false });
            alert('Upload failed');
        }
    },

    addModel: (model) => set((state) => ({ models: [...state.models, model] })),
}));

export default useCreatorStore;

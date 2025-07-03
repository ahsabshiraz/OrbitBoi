import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,

    loginUser: (userData) => {
        set({ user: userData.user, token: userData.token });
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('token', userData.token);
    },
    
    logout: () => {
        set({ user: null, token: null });
        localStorage.clear();
    },
}));

export default useAuthStore;
import { create } from 'zustand';
import UploadSlice from './UploadSlice';
import CreatorSlice from './CreatorSlice';

const useCreatorStore = create((set) => ({
    ...UploadSlice(set),
    ...CreatorSlice(set),
}));

export default useCreatorStore;

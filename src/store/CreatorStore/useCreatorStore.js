import { create } from 'zustand';
import UploadSlice from './UploadSlice';
import CreatorSlice from './CreatorSlice';
import CameraSetup from './CameraSlice';
const useCreatorStore = create((set) => ({
    ...UploadSlice(set),
    ...CreatorSlice(set),
    ...CameraSetup(set),
}));

export default useCreatorStore;

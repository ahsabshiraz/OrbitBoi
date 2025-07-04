import { create } from 'zustand';
import UploadSlice from './UploadSlice';
import CreatorSlice from './CreatorSlice';
import CameraSetup from './CameraSlice';
import DashBoardSlice from './DasboardSlice';

const useCreatorStore = create((set, get) => ({
    ...UploadSlice(set, get),
    ...CreatorSlice(set, get),
    ...CameraSetup(set, get),
    ...DashBoardSlice(set, get),
}));

export default useCreatorStore;

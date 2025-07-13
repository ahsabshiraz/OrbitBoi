import { create } from 'zustand';
import UploadSlice from './UploadSlice';
import CreatorSlice from './CreatorSlice';
import CameraSetup from './CameraSlice';
import DashBoardSlice from './DasboardSlice';
import EnvironmentSlice from './EnviromentSlice';

const useCreatorStore = create((set, get) => ({
    ...UploadSlice(set, get),
    ...CreatorSlice(set, get),
    ...CameraSetup(set, get),
    ...DashBoardSlice(set, get),
    ...EnvironmentSlice(set,get)
}));

export default useCreatorStore;

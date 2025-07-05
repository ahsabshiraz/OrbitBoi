import { Vector3 } from 'three';
import { useThree} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';

function ViewerCameraSetup() {
    const {
        cameraPosition,
        lookAtPosition,
        enabledControl,
        enabledRotate,
        enabledZoom,
        enabledPan,
        enabledDamping
    } = useCreatorStore();
    const { camera } = useThree();
    const controlsRef = useRef();

    useEffect(() => {
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.lookAt(new Vector3(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z));
        camera.updateProjectionMatrix();
    }, [camera, cameraPosition, lookAtPosition]);

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping={enabledDamping}
            enablePan={enabledPan}
            enableRotate={enabledRotate && enabledControl}
            enableZoom={enabledZoom}
            target={new Vector3(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z)}
        />
    );
}

export default ViewerCameraSetup; 
import { Vector3 } from 'three';
import { useThree} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';

function CameraSetup() {
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

    // Store camera and controls references in store for update button
    useEffect(() => {
        const store = useCreatorStore.getState();
        store.cameraRef = camera;
        store.controlsRef = controlsRef.current;
    }, [camera]);

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

export default CameraSetup;
import { useGLTF, TransformControls } from "@react-three/drei";
import useCreatorStore from "../store/CreatorStore/useCreatorStore";
import { useEffect, useRef } from "react";

export default function Model({ url, modelId }) {
    const { 
        setEnabledControl, 
        selectedModelId, 
        setSelectedModelId,
        modelPositions,
        initializeModelPosition,
        setModelPositionX,
        setModelPositionY,
        setModelPositionZ
    } = useCreatorStore();

    const { scene } = useGLTF(url);
    const transformControlsRef = useRef();
    
    useEffect(() => {
        if (modelId && !modelPositions[modelId]) {
          initializeModelPosition(modelId);
        }
      }, [modelId]);

    // Get current model position data
    const modelPosition = modelPositions[modelId] || { 
        x: 0, y: 0, z: 0, 
        rotationX: 0, rotationY: 0, rotationZ: 0, 
        scale: 1 
    };

    const isSelected = selectedModelId === modelId;

    const handleClick = (e) => {
        e.stopPropagation();
        setSelectedModelId(modelId);
    };

    // Handle transform controls events
    useEffect(() => {
        const controls = transformControlsRef.current;
        if (!controls || !isSelected) return;
    
        const updatePosition = () => {
          const pos = controls.object.position;
          setModelPositionX(modelId, pos.x);
          setModelPositionY(modelId, pos.y);
          setModelPositionZ(modelId, pos.z);
        };
    
        controls.addEventListener("objectChange", updatePosition);
    
        return () => controls.removeEventListener("objectChange", updatePosition);
      }, [isSelected, modelId]);
    return (
        <TransformControls
            ref={transformControlsRef}
            onPointerEnter={() => { setEnabledControl(false) }}
            onPointerLeave={() => { setEnabledControl(true) }}
            enabled={isSelected}
            position={[modelPosition.x, modelPosition.y, modelPosition.z]}
        >
            <primitive 
                object={scene} 
                rotation={[modelPosition.rotationX, modelPosition.rotationY, modelPosition.rotationZ]}
                scale={[modelPosition.scale, modelPosition.scale, modelPosition.scale]}
                onClick={handleClick}
            />
        </TransformControls>
    );
}
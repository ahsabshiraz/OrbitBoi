import { useGLTF, TransformControls } from "@react-three/drei";
import useCreatorStore from "../store/CreatorStore/useCreatorStore";
import { useEffect } from "react";

export default function Model({ url, modelId }) {
    const { 
        setEnabledControl, 
        selectedModelId, 
        setSelectedModelId,
        modelPositions,
        initializeModelPosition
    } = useCreatorStore();

    const { scene } = useGLTF(url);
    
    // Initialize model position when component mounts
    useEffect(() => {
        if (modelId) {
            initializeModelPosition(modelId);
        }
    }, [modelId, initializeModelPosition]);

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

    return (
        <TransformControls
            onPointerEnter={() => { setEnabledControl(false) }}
            onPointerLeave={() => { setEnabledControl(true) }}
            enabled={isSelected}
        >
            <primitive 
                object={scene} 
                position={[modelPosition.x, modelPosition.y, modelPosition.z]}
                rotation={[modelPosition.rotationX, modelPosition.rotationY, modelPosition.rotationZ]}
                scale={[modelPosition.scale, modelPosition.scale, modelPosition.scale]}
                onClick={handleClick}
            />
        </TransformControls>
    );
}
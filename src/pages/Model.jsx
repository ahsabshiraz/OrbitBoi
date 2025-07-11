import { useGLTF, TransformControls } from "@react-three/drei";
import useCreatorStore from "../store/CreatorStore/useCreatorStore";
import { useEffect, useRef } from "react";

export default function Model({ url, modelId }) {
    const {  
        selectedModelId, 
        setSelectedModelId,
        modelPositions,
        initializeModelPosition,
        setTransformControlsRef,
    } = useCreatorStore();

    const { scene } = useGLTF(url);
    const transformRef = useRef(); 
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
         if (isSelected && transformRef.current) {
            setTransformControlsRef(transformRef.current);
        }
    }, [isSelected, setTransformControlsRef]);
    return (
        <TransformControls
            ref={transformRef}
            enabled={isSelected}
            position={[modelPosition.x, modelPosition.y, modelPosition.z]}
            size={1}
            mode="translate"
        >
            <primitive 
                object={scene} 
                rotation={[modelPosition.rotationX, modelPosition.rotationY, modelPosition.rotationZ]}
                scale={[modelPosition.scale, modelPosition.scale, modelPosition.scale]}
                onClick={handleClick}
                visible={true}
            />
        </TransformControls>
    );
}
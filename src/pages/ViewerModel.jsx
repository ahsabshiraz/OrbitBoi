import { useGLTF } from "@react-three/drei";
import useCreatorStore from "../store/CreatorStore/useCreatorStore";
import { useEffect } from "react";

export default function ViewerModel({ url, modelId }) {
    const { 
        modelPositions,
        initializeModelPosition
    } = useCreatorStore();

    const { scene } = useGLTF(url);
    
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

    return (
        <primitive 
            object={scene} 
            position={[modelPosition.x, modelPosition.y, modelPosition.z]}
            rotation={[modelPosition.rotationX, modelPosition.rotationY, modelPosition.rotationZ]}
            scale={[modelPosition.scale, modelPosition.scale, modelPosition.scale]}
        />
    );
} 
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { Suspense } from 'react';
import BackGround from './BackGround';
import Model from './Model';
import CameraSetup from './CameraSetup';
// Custom Camera component that updates position dynamically


export default function CreatorScene({ experience }) {
  const { 
    exposure, 
    env,
    backgroundColor,
  } = useCreatorStore();
//  console.log('CurrentExperience', experience)
  return (
    <Canvas
      shadows
      gl={{ toneMappingExposure: exposure }}
      camera={{ position: [0, 1, 10], fov: 50 }}
      style={{ backgroundColor: backgroundColor }}
    // style={{ height: '100%', width: '100%' }}
    >
      <CameraSetup />
      <BackGround />
      <Suspense fallback={null}>
        {experience.models && experience.models.map((model) => (
          <Model 
            url={model.cloudinaryUrl} 
            modelId={model._id || model.cloudinaryUrl} 
            key={model._id || model.cloudinaryUrl} 
          />
        ))}
        {env && <Environment preset="city" background />}
      </Suspense>
    </Canvas>
  );
}

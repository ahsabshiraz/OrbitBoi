import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { Suspense } from 'react';
import BackGround from './BackGround';
import Model from './Model';
import CameraSetup from './CameraSetup';
import LoadingScreen3D from '../components/UI components/LoadingScreen3D';
// Custom Camera component that updates position dynamically


export default function CreatorScene({ experience }) {
  const {
    exposure,
    env,
    backgroundColor,
    hdrRadius,
    hdrHeight,
    hdrScale,
    hdrType,
    selectedCustomHdr,
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
      <Suspense fallback={<LoadingScreen3D/>}>
        {experience.models && experience.models.map((model) => (
          <Model 
            url={model.cloudinaryUrl} 
            modelId={model._id || model.cloudinaryUrl} 
            key={model._id || model.cloudinaryUrl} 
          />
        ))}
      </Suspense>
        {env && (
          <Environment
            preset={selectedCustomHdr ? undefined : hdrType}
            files={selectedCustomHdr ? selectedCustomHdr.cloudinaryUrl : undefined}
            background
            ground={{
              radius: hdrRadius,
              height: hdrHeight,
              scale: hdrScale,
            }}
          />
        )}
    </Canvas>
  );
}

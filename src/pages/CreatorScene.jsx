import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, TransformControls } from '@react-three/drei';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { Suspense } from 'react';
import BackGround from './backGround';
import Model from './Model';


export default function CreatorScene({ experience }) {
  const { exposure, env, enabledControl, setEnabledControl } = useCreatorStore();
  return (
    <Canvas
      shadows
      gl={{ toneMappingExposure: exposure }}
      camera={{ position: [0, 1, 10], fov: 50 }}
    // style={{ height: '100%', width: '100%' }}
    >
      <BackGround />
      <Suspense fallback={null}>
          {experience.models && experience.models.map((model) => (
            <Model url={model.cloudinaryUrl} key={model.cloudinaryUrl} />
          ))}
        {env && <Environment preset="city" background />}
      </Suspense>

      <OrbitControls
        enableRotate={enabledControl}
      />
    </Canvas>
  );
}

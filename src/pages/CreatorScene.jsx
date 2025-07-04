import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, TransformControls } from '@react-three/drei';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { Suspense } from 'react';
import BackGround from './backGround';
import Model from './Model';


export default function CreatorScene({ model }) {
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
        <TransformControls
          onPointerEnter={() => { setEnabledControl(false) }}
          onPointerLeave={() => { setEnabledControl(true) }}>
          {model && <Model url={model.cloudinaryUrl} />}
        </TransformControls>
          {env && <Environment preset="city" background />}
      </Suspense>

      <OrbitControls
        enableRotate={enabledControl}
      />
    </Canvas>
  );
}

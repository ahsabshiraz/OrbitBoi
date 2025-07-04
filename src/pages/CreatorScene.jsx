import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import { Suspense } from 'react';
import BackGround from './backGround';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function CreatorScene({ model }) {
  const { backgroundColor, exposure, fogEnabled, env, fogMin, fogMax } = useCreatorStore();
  return (
    <Canvas
      shadows
      gl={{ toneMappingExposure: exposure }}
      camera={{ position: [0, 1, 10], fov: 50 }}
    // style={{ height: '100%', width: '100%' }}
    >
      <BackGround />
      <Suspense fallback={null}>
        {model && <Model url={model.cloudinaryUrl} />}
        {env && <Environment preset="city" background />}
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}

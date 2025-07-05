import useCreatorStore from '../store/CreatorStore/useCreatorStore';

export default function BackGround() {
    const { backgroundColor, fogEnabled, fogMin, fogMax } = useCreatorStore();

    return (
        <>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="#404040" />
            </mesh>

            <color attach="background" args={[backgroundColor]} />
            {fogEnabled && <fog attach="fog" args={[backgroundColor, fogMin, fogMax]} />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        </>
    );
}
import { useTexture, MeshReflectorMaterial } from '@react-three/drei';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';
import * as THREE from 'three';

export default function BackGround() {
    const { backgroundColor, fogEnabled, fogMin, fogMax, ground, groundType, groundLength, groundWidth } = useCreatorStore();

    const [terrainColorMap, terrainNormalMap, terrainArmMap] = useTexture([
        '/textures/terrain/rocky_terrain_diff_1k.jpg',
        '/textures/terrain/rocky_terrain_nor_gl_1k.jpg',
        '/textures/terrain/rocky_terrain_arm_1k.jpg'
    ]);
    const [floorColorMap, floorNormalMap, floorArmMap] = useTexture([
        '/textures/floor/square_floor_diff_2k.jpg',
        '/textures/floor/square_floor_nor_gl_2k.jpg',
        '/textures/floor/square_floor_rough_2k.jpg'
    ]);
    
    const [metalColorMap, metalNormalMap, metalArmMap] = useTexture([
        '/textures/metal/blue_metal_plate_diff_2k.jpg',
        '/textures/metal/blue_metal_plate_nor_gl_2k.jpg',
        '/textures/metal/blue_metal_plate_arm_2k.jpg'
    ]);
    
    const [sandColorMap,sandNormalMap, sandArmMap] = useTexture([
        '/textures/sand/gravelly_sand_diff_2k.jpg',
        '/textures/sand/gravelly_sand_nor_gl_2k.jpg',
        '/textures/sand/gravelly_sand_arm_2k.jpg'
    ]);
    const [rockyColorMap,rockyNormalMap, rockyArmMap] = useTexture([
        '/textures/rocky/rocky_trail_diff_2k.jpg',
        '/textures/rocky/rocky_trail_nor_gl_2k.jpg',
        '/textures/rocky/rocky_trail_arm_2k.jpg'
    ]);
    
    return (
        <>
            {ground && groundType === 'plane' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <meshStandardMaterial
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            {ground && groundType === 'terrain' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <meshStandardMaterial
                        map={terrainColorMap}
                        normalMap={terrainNormalMap}
                        roughnessMap={terrainArmMap}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            {ground && groundType === 'floor' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <meshStandardMaterial
                        map={floorColorMap}
                        normalMap={floorNormalMap}
                        roughnessMap={floorArmMap}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            {ground && groundType === 'metal' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <meshStandardMaterial
                        map={metalColorMap}
                        normalMap={metalNormalMap}
                        roughnessMap={metalArmMap}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            {ground && groundType === 'sand' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <meshStandardMaterial
                        map={sandColorMap}
                        normalMap={sandNormalMap}
                        roughnessMap={sandArmMap}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            {ground && groundType === 'rocky' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <meshStandardMaterial
                        map={rockyColorMap}
                        normalMap={rockyNormalMap}
                        roughnessMap={rockyArmMap}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            {ground && groundType === 'reflective' && (
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                    <planeGeometry args={[groundLength, groundWidth]} />
                    <MeshReflectorMaterial
                        blur={[256, 256]}
                        resolution={512}
                        mixBlur={0.5}
                        mixStrength={0.8}
                        mirror={0.8}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        depthScale={0.2}
                        color="#ffffff"
                        metalness={0.5}
                        roughness={0.1}
                    />
                </mesh>
            )}

            <color attach="background" args={[backgroundColor]} />
            {fogEnabled && <fog attach="fog" args={[backgroundColor, fogMin, fogMax]} />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        </>
    );
}
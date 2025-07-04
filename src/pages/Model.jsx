import { useGLTF, TransformControls } from "@react-three/drei";
import useCreatorStore from "../store/CreatorStore/useCreatorStore";

export default function Model({ url }) {
    const { setEnabledControl } = useCreatorStore();

    const { scene } = useGLTF(url);
    return (
        <TransformControls
            onPointerEnter={() => { setEnabledControl(false) }}
            onPointerLeave={() => { setEnabledControl(true) }}>
            <primitive object={scene} />;
        </TransformControls>
    )
}
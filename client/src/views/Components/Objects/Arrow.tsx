import { Addition, Base, CSGGeometryRef, Geometry } from "@react-three/csg";
import { useRef } from "react";
import THREE from "three";

export default function Arrow() {
  const box = new THREE.BoxGeometry();
  const tri = new THREE.CylinderGeometry(1, 1, 2, 3);

  const csg = useRef<CSGGeometryRef>(null);
  
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <Geometry ref={csg} computeVertexNormals>
        <Base name="base" geometry={box} scale={[3, 3, 1]} />
        <Addition
          name="roof"
          geometry={tri}
          scale={[2.5, 0.5, 1.425]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.2, 0]}
        />
      </Geometry>
      <meshStandardMaterial envMapIntensity={0.25} />
    </mesh>
  );
}
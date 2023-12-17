import React, { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import { Selection, Select, EffectComposer, Outline } from "@react-three/postprocessing"

function Shape({ time, ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(null)

  const ref = useRef()

  return (
    <Select enabled={isHover}>
      <mesh
        receiveShadow castShadow
        ref={ref}
        {...props}
        onClick={() => {
          console.log("Object clicked")
          if (isOpen) {
            setIsOpen(false)
          } else {
            setIsOpen(true)
          }
        }}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}>
        <dodecahedronGeometry />
        <meshStandardMaterial roughness={0.75} emissive="#404057" />
        {isOpen && (
          <Html distanceFactor={30} center>
            <div className="content">
              hello <br />
              world
            </div>
          </Html>
        )}
      </mesh>
    </Select>
  )
}

export default function Dodecahedron() {
  return (
    <Selection>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline blur visibleEdgeColor="yellow" edgeStrength={100} width={2000} />
      </EffectComposer>
      <Shape position={[-2, 0, 0]} />
      <Shape position={[0, 0, -6]} />
      <Shape position={[2, 0, 0]} />
    </Selection>
  )
}
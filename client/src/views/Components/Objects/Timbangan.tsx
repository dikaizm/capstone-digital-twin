import { useState } from 'react'
import { Select } from '@react-three/postprocessing'
import Model from './Model'

export default function Timbangan({ position, rotation, scale, clickable = true }: ObjectProps) {

  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/Timbangan/Timbangan Assembly.mtl'
  const objPath = './objects/Timbangan/Timbangan Assembly.obj'

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow

        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => {
          setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

      </mesh>
    </Select>
  )
}
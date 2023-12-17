import { useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import Model from './Model'

import labelIdle from "@assets/panel/machine-name/idle/Strapping Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Strapping Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Strapping Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

interface StrappingProps extends ObjectProps {
  keyId: string;
}

export default function Strapping({ keyId, position, rotation, scale, clickable = true }: StrappingProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/Strapping/Strapping.mtl'
  const objPath = './objects/Strapping/Strapping.obj'

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow

        onClick={() => {
          setIsHover(true)
          clickable && setIsOpen(!isOpen)
        }}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => {
          if (!isOpen) setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <ObjectLabel2
          onHover={setIsHover}
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[0, 170, 0]}
          size={90}
          keyId={""}
        />

      </mesh>
    </Select>
  )
}
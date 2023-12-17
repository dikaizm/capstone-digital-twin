import { useState } from 'react';
import { Select } from '@react-three/postprocessing';
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import Model from './Model';

import labelIdle from "@assets/panel/machine-name/idle/Charging Billet Black.svg"
import labelWarning from "@assets/panel/machine-name/warning/Charging Billet Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: "",
  warning: labelWarning
}

interface ChargingBilletProps extends ObjectProps {
  keyId: string;
}

export default function ChargingBillet({ keyId, position, rotation, scale, clickable = true }: ChargingBilletProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/ChargingBillet/v2/ChargingBillet.mtl'
  const objPath = './objects/ChargingBillet/v2/ChargingBillet.obj'

  return (
    <Select enabled={isHover}>
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

        <ObjectLabel2
          onHover={setIsHover}
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[30, 90, 0]}
          size={85}
          keyId={""}
          clickable={clickable}
        />

      </mesh >
    </Select>
  )
}
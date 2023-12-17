import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel'
import Model from './Model'

import labelIdle from "@assets/panel/machine-name/idle/Storage Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Storage Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Storage Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

interface StorageProps extends ObjectProps {
  keyId: string;
}

export function Storage({ keyId, position, rotation, scale, clickable = true }: StorageProps) {
  const mtlPath = './objects/Storage/Storage.mtl'
  const objPath = './objects/Storage/Storage.obj'

  return (
    <Select enabled={clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <ObjectLabel2
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[0, 250, 0]}
          size={70}
          keyId={""}
        />

      </mesh>
    </Select>
  )
}
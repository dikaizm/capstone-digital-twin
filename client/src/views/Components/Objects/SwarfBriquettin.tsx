import { useEffect, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout'
import Model from './Model';
import { useWindowState } from '@/context/WindowStateContext';

import labelIdle from "@assets/panel/machine-name/idle/Swarf Briquettin Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Swarf Briquettin Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Swarf Briquettin Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

interface SwarfProps extends ObjectProps {
  keyId: string;
}

export default function SwarfBriquettin({ keyId, position, rotation, scale, clickable = true }: SwarfProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/SwarfBriquettin/SwarfBriquettinPress.mtl'
  const objPath = './objects/SwarfBriquettin/SwarfBriquettinPress.obj'

  const { windowState, toggleWindowState } = useWindowState()
  const state = windowState[keyId]

  useEffect(() => {
    if (!state) setIsHover(false)
  }, [state])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow

        onClick={() => {
          setIsHover(true)
          clickable && toggleWindowState(keyId)
        }}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => {
          if (!windowState[keyId]) setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <ObjectLabel2
          onHover={setIsHover}
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[0, 250, 0]}
          size={90}
          keyId={keyId}
        />

      </mesh>
    </Select>
  )
}


type EquipmentDetailProps = {
  data: SwarfDataProps;
  type: string;
}

/**
 * Component
 * 
 * @param {Object} data - Equipment data containing information about the equipment.
 * @param {string} [type="tooltip" | type="window" | type="overview"] - Type of display, either "tooltip" or "window" or "overview".
 * @example
 * // Example usage of EquipmentDetail as a tooltip
 * <EquipmentDetail data={equipmentData} type="tooltip" />
 * 
*/
export function SwarfEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.DO_QLMP_ctrlOn
    ]} type={type} />
  )
}
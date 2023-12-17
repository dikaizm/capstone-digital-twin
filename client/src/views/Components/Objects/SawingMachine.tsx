import { useEffect, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout'
import Model from './Model';
import { useWindowState } from '@/context/WindowStateContext';

import labelIdle from "@assets/panel/machine-name/idle/Sawing Machine Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Sawing Machine Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Sawing Machine Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

interface SawingMachineProps extends ObjectProps {
  keyId: string;
}

export default function SawingMachine({ keyId, position, rotation, scale, clickable = true }: SawingMachineProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/SawingMachine/v2/SawingMachine.mtl'
  const objPath = './objects/SawingMachine/v2/SawingMachine.obj'

  const { windowState, toggleWindowState } = useWindowState()
  const state = windowState[keyId]

  useEffect(() => {
    if (!state) setIsHover(false)
  }, [state])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        castShadow
        position={position}
        rotation={rotation}
        scale={scale}

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
          size={100}
          keyId={keyId}
        />

      </mesh>
    </Select>
  )
}

type EquipmentDetailProps = {
  data: SawingDataProps;
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
export function SawingEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.GL_Cut_currentMeasured,
      data.tag?.['LtNoLogs[0]']
    ]} type={type} />
  )
}
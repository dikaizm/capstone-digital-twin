import { useEffect, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import EquipmentLayout from '@/views/Layouts/EquipmentLayout'
import Model from './Model'

import labelIdle from "@assets/panel/machine-name/idle/Sawing Entry System Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Sawing Entry System Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Sawing Entry System Red.svg"

import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

import { ObjectLabel2 } from '../Tooltips/ObjectLabel'
import { useWindowState } from '@/context/WindowStateContext'

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

interface SawingEntryProps extends ObjectProps {
  keyId: string;
}

export default function SawingEntrySystem({ keyId, position, rotation, scale, clickable = true }: SawingEntryProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/SawingEntrySystem/SawingEntrySystem.mtl'
  const objPath = './objects/SawingEntrySystem/SawingEntrySystem.obj'

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
          position={[100, 160, 0]}
          size={80}
          keyId={keyId}
        />

      </mesh>
    </Select>
  )
}

type EquipmentDetailProps = {
  data: SawingEntryDataProps;
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
export function SawingEntryEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.['LtNoLogs[20]']
    ]} type={type} />
  )
}
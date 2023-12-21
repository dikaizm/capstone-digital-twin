import { useEffect, useState } from 'react';
import { Select } from '@react-three/postprocessing';
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import Model from './Model';

import { useWindowState } from '@/context/WindowStateContext';

interface VDCProps extends ObjectProps {
  keyId: string;
}

import labelIdle from "@assets/panel/machine-name/idle/VDC Black.svg"
import labelRunning from "@assets/panel/machine-name/running/VDC Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/VDC Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function VDC({ keyId, position, rotation, scale, clickable = true }: VDCProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/VDC/VDC.mtl'
  const objPath = './objects/VDC/VDC.obj'

  const { windowState, toggleWindowState } = useWindowState()

  useEffect(() => {
    if (!windowState[keyId]) setIsHover(false)
  }, [keyId, windowState])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
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
          position={[0, 550, 0]}
          size={75}
          keyId={keyId}
        />
      </mesh >
    </Select>
  )
}

type EquipmentDetailProps = {
  data: VDCDataProps;
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
export function VDCEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      // data.tag?.BilletLength,
      data.tag?.['CCS_E1_PLC_Cabinet_PointIO:3:I.Ch0Data'],
      // data.tag?.LevelMetal9F,
      // data.tag?.['CM_E7_Cooling_Water:1:I.Ch0Data'],
      // data.tag?.SpeedCasting,
      // data.tag?.['LSYS_E2_IO_Cabinet_Launder:3:I.Ch0Data'],
      // data.tag?.LevelMetal10F,
      // data.tag?.['CM_E5_Casting_Gas_Cabinet:1:I.Ch0Data'],
    ]} type={type} />
  )
}
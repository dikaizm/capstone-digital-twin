import { useEffect, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout'
import Model from './Model';
import { useWindowState } from '@/context/WindowStateContext';

import labelIdle from "@assets/panel/machine-name/idle/Sir Degasser Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Sir Degasser Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Sir Degasser Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

interface SIRDegasserProps extends ObjectProps {
  data?: SIRDataProps;
  keyId: string;
}

export default function SirDegasser({ keyId, position, rotation, scale, clickable = true }: SIRDegasserProps) {

  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/SIRDegasser/SIRDegasser.mtl'
  const objPath = './objects/SIRDegasser/SIRDegasser.obj'

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

        {/* {isOpen && (
          <CardTooltip
            size={90}
            position={[0, 700, 0]}
            linePosition={[0, 300, 0]}
            lineLength='h-40'
            equipmentName={data?.equipmentName}
            icon={FurnaceIcon}
            state={{
              openState: setIsOpen,
              hoverState: setIsHover
            }}
          >
            <SIREquipmentDetail data={data} type='tooltip' />
          </CardTooltip>
        )} */}

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
  data: SIRDataProps;
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
export function SIREquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.['rc:3:I.Ch1Data'],
      data.tag?.['rc:5:I.Ch0Data'],
      data.tag?.['rc:7:I.Ch0Data'],
      data.tag?.['X_Rotor1_U1:I.TorqueCurrent'],
      data.tag?.['X_Rotor2_U2:I.TorqueCurrent'],
      data.tag?.SIR_PV_OperatingHoursR1,
      data.tag?.SIR_PV_OperatingHoursR2,
    ]} type={type} />
  )
}
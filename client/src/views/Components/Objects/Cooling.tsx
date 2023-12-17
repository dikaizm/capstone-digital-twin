import { useEffect, useState } from 'react';
import { Select } from "@react-three/postprocessing"
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import Model from './Model';
import { useWindowState } from '@/context/WindowStateContext';

interface CoolingProps extends ObjectProps {
  keyId: string;
}

import labelIdleOne from "@assets/panel/machine-name/idle/Cooling One Black.svg"
import labelRunningOne from "@assets/panel/machine-name/running/Cooling One Green.svg"
import labelWarningOne from "@assets/panel/machine-name/warning/Cooling One Red.svg"

const statusSvgOne: StatusSvgProps = {
  idle: labelIdleOne,
  running: labelRunningOne,
  warning: labelWarningOne
}

import labelIdleTwo from "@assets/panel/machine-name/idle/Cooling Two Black.svg"
import labelRunningTwo from "@assets/panel/machine-name/running/Cooling Two Green.svg"
import labelWarningTwo from "@assets/panel/machine-name/warning/Cooling Two Red.svg"

import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvgTwo: StatusSvgProps = {
  idle: labelIdleTwo,
  running: labelRunningTwo,
  warning: labelWarningTwo
}

export function Cooling({ keyId, position, rotation, scale, clickable = true }: CoolingProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/Cooling/AirCooling.mtl'
  const objPath = './objects/Cooling/AirCooling.obj'

  const { windowState, toggleWindowState } = useWindowState()
  const state = windowState[keyId]

  useEffect(() => {
    if (!state) setIsHover(false)
  }, [state])

  return (
    <Select enabled={isHover}>
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

        <Model mtlPath={mtlPath} objPath={objPath} />

        <ObjectLabel2
          onHover={setIsHover}
          label={
            // eslint-disable-next-line react-hooks/rules-of-hooks
            keyId === "coolingOne" ? useEquipmentLabel(keyId, statusSvgOne) : useEquipmentLabel(keyId, statusSvgTwo)
          }
          position={[0, 250, 0]}
          size={115}
          keyId={keyId}
        />

      </mesh >
    </Select>
  )
}

type EquipmentDetailProps = {
  data: CoolingOneDataProps | CoolingTwoDataProps;
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
export function CoolingOneEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.GL_HMI_ACT_ACS1_logTempL,
      data.tag?.GL_HMI_ACT_ACS1_logTempR,
      data.tag?.GL_STACK_ACS1_pos1TotalNoLogs
    ]} type={type} />
  )
}

export function CoolingTwoEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.GL_HMI_ACT_ACS2_logTempL,
      data.tag?.GL_HMI_ACT_ACS2_logTempR,
      data.tag?.GL_STACK_ACS2_pos1TotalNoLogs
    ]} type={type} />
  )
}
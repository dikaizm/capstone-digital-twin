import { useEffect, useState } from 'react';
import { Select } from "@react-three/postprocessing"
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import Model from './Model';

import labelIdle from "@assets/panel/machine-name/idle/Homogenizing Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Homogenizing Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Homogenizing Red.svg"

import { useWindowState } from '@/context/WindowStateContext';
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

interface HomogenezingProps extends ObjectProps {
  data?: HomogenizingDataProps;
  keyId: string;
}

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function Homogenezing({ keyId, position, rotation, scale, clickable = true }: HomogenezingProps) {

  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/Homogenezing/v2/Homogenezing.mtl'
  const objPath = './objects/Homogenezing/v2/Homogenezing.obj'

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
          // <CardTooltip
          //   size={110}
          //   position={[0, 600, 0]}
          //   linePosition={[0, 300, 0]}
          //   lineLength='h-40'
          //   equipmentName={data?.equipmentName}
          //   icon={FurnaceIcon}
          //   state={{
          //     openState: setIsOpen,
          //     hoverState: setIsHover
          //   }}
          // >

          //   <HomogenizingEquipmentDetail data={data} type='tooltip' />

          // </CardTooltip>
        )} */}

        <ObjectLabel2
          onHover={setIsHover}
          keyId={keyId}
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[0, 250, 0]}
          size={140}
        />

      </mesh >
    </Select>
  )
}

type EquipmentDetailProps = {
  data: HomogenizingDataProps;
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
export function HomogenizingEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.GL_STACK_BF1_pos1TotalNoLogs,
      data.tag?.GL_BF1_ProcData_furn1Z1L_airTemp,
      data.tag?.GL_BF1_ProcData_furn1Z1R_airTemp,
      data.tag?.GL_BF1_ProcData_furn1Z2L_airTemp,
      data.tag?.GL_BF1_ProcData_furn1Z2R_airTemp,
      data.tag?.GL_BF1_ProcData_furn1Z1L_logTemp_1,
      data.tag?.DO_QP0421_BF1_HOMO_onOff_rd,
      data.tag?.GL_BF1_ProcData_furn1Z1R_logTemp_1,
      data.tag?.GL_BF1_ProcData_furn1Z2L_logTemp_1,
      data.tag?.GL_BF1_ProcData_furn1Z2L_logTemp_2,
      data.tag?.GL_BF1_ProcData_furn1Z2R_logTemp_1
    ]} type={type} />
  )
}
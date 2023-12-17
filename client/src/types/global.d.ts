import { ReactNode } from "react";

export { };

declare global {
  interface AppProps {
    auth: {
      user: {
        name: string;
      }
    }
  }

  interface ButtonProps {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
  }

  interface DataProps {
    tagName?: string;
    label?: string;
    unit?: string;
    value: number | string;
    isShown?: boolean;
  }

  interface EquipmentProps {
    equipmentName: string;
    status?: 0 | 1 | 2;
  }

  interface StatusSvgProps {
    idle: string;
    running: string;
    warning: string;
  }

  interface Furnace9FDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LSYS_E2_IO_Cabinet_Launder:1:I.Ch0Data'?: DataProps;
    }
  }

  interface Furnace10FDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LSYS_E2_IO_Cabinet_Launder:2:I.Ch0Data'?: DataProps;
    }
  }

  interface HomogenizingDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'GL_STACK_BF1_pos1TotalNoLogs'?: DataProps;
      'GL_STACK_BF1_pos2TotalNoLogs'?: DataProps;
      'GL_STACK_ACS1_pos1TotalNoLogs'?: DataProps;
      'GL_STACK_ACS2_pos1TotalNoLogs'?: DataProps;
      'GL_BF1_ProcData_furn1Z1L_airTemp'?: DataProps;
      'GL_BF1_ProcData_furn1Z1R_airTemp'?: DataProps;
      'GL_BF1_ProcData_furn1Z2L_airTemp'?: DataProps;
      'GL_BF1_ProcData_furn1Z2R_airTemp'?: DataProps;
      'GL_BF1_ProcData_furn1Z1L_logTemp_1'?: DataProps;
      'GL_BF1_ProcData_furn1Z1R_logTemp_1'?: DataProps;
      'GL_BF1_ProcData_furn1Z1R_logTemp_2'?: DataProps;
      'GL_BF1_ProcData_furn1Z2L_logTemp_1'?: DataProps;
      'GL_BF1_ProcData_furn1Z2L_logTemp_2'?: DataProps;
      'GL_BF1_ProcData_furn1Z2R_logTemp_1'?: DataProps;
      'DO_QP0421_BF1_HOMO_onOff_rd'?: DataProps;
    }
  }

  interface SawingDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'GL_Cut_currentMeasured'?: DataProps;
      'LtNoLogs[0]'?: DataProps;
    }
  }

  interface SIRDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'rc:3:I.Ch1Data'?: DataProps;
      'rc:5:I.Ch0Data'?: DataProps;
      'rc:7:I.Ch0Data'?: DataProps;
      'X_Rotor1_U1:I.TorqueCurrent'?: DataProps;
      'X_Rotor2_U2:I.TorqueCurrent'?: DataProps;
      'SIR_PV_OperatingHoursR1'?: DataProps;
      'SIR_PV_OperatingHoursR2'?: DataProps;
    }
  }

  interface SwarfDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'DO_QLMP_ctrlOn'?: DataProps;
    }
  }

  interface VDCDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LSYS_E2_IO_Cabinet_Launder:3:I.Ch0Data'?: DataProps;
      'CCS_E1_PLC_Cabinet_PointIO:3:I.Ch0Data'?: DataProps;
      'CM_E7_Cooling_Water:1:I.Ch0Data'?: DataProps;
      'CM_E5_Casting_Gas_Cabinet:1:I.Ch0Data'?: DataProps;
      BilletLength?: DataProps;
      SpeedCasting?: DataProps;
      LevelMetal9F?: DataProps;
      LevelMetal10F?: DataProps;
    }
  }

  interface CoolingOneDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      GL_STACK_ACS1_pos1TotalNoLogs?: DataProps;
      GL_HMI_ACT_ACS1_logTempL?: DataProps;
      GL_HMI_ACT_ACS1_logTempR?: DataProps;
    }
  }

  interface CoolingTwoDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      GL_STACK_ACS2_pos1TotalNoLogs?: DataProps;
      GL_HMI_ACT_ACS2_logTempL?: DataProps;
      GL_HMI_ACT_ACS2_logTempR?: DataProps;
    }
  }

  interface StillageOneDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LtNoLogs[19]'?: DataProps;
    }
  }
  interface StillageTwoDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LtNoLogs[15]'?: DataProps;
    }
  }

  interface SawingEntryDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LtNoLogs[20]'?: DataProps;
    }
  }

  interface ConveyorDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LtNoLogs[0]'?: DataProps;
    }
  }

  interface UTDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'LtNoLogs[1]'?: DataProps;
    }
  }

  interface RodFeederDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      'DosisAltib'?: DataProps;
    }
  }

  interface CFFDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      cff?: DataProps;
    }
  }

  interface WeighingDataProps extends EquipmentProps {
    tag?: {
      [tag_name: string]: DataProps;
      weighing?: DataProps;
    }
  }

  interface DataFieldProps {
    [key: string]: EquipmentProps & {
      tag?: {
        [tag_name: string]: DataProps;
      }
    };
    conveyor: ConveyorDataProps;
    ut: UTDataProps;

    coolingOne: CoolingOneDataProps;
    coolingTwo: CoolingTwoDataProps;

    furnace9F: Furnace9FDataProps;
    furnace10F: Furnace10FDataProps;

    homogenizing: HomogenizingDataProps;
    sawing: SawingDataProps;
    sawingEntry: SawingEntryDataProps;
    sir: SIRDataProps;

    stillageOne: StillageOneDataProps;
    stillageTwo: StillageTwoDataProps;

    swarf: SwarfDataProps;
    vdc: VDCDataProps;

    rodFeeder: RodFeederDataProps;
    cff: CFFDataProps;
    weighing: WeighingDataProps;
    chargingBillet: EquipmentProps;
  }

  interface WindowOpenProps {
    [key: string]: boolean;
    conveyor: boolean;
    ut: boolean;
    stillageOne: boolean;
    stillageTwo: boolean;
    coolingOne: boolean;
    coolingTwo: boolean;
    furnace9F: boolean;
    furnace10F: boolean;
    homogenizing: boolean;
    sawing: boolean;
    sawingEntry: boolean;
    sir: boolean;
    swarf: boolean;
    vdc: boolean;
    rodFeeder: boolean;
    cff: boolean;
    weighing: boolean;
  }

  interface ParentProps {
    children?: ReactNode
  }

  interface DisplayStateProps {
    flow: boolean;
  }

  interface ObjectProps {
    keyId?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    clickable?: boolean;
    setObjState?: React.Dispatch<React.SetStateAction<ObjectStateProps>>;
    setLastClick?: React.Dispatch<React.SetStateAction<string>>;
  }

  interface IconProps {
    active?: boolean;
    className?: string;
  }

  type ObjectDimensionProps = {
    x: number;
    y: number;
    z: number;
  }
}
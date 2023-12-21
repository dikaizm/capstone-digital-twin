export const UserRole = {
  ADMIN: "admin",
  LEVEL1: "level1",
  LEVEL2: "level2",
  LEVEL3: "level3",
}

const equipments = {
  CONVEYOR: "Conveyor",
  UT: "UT",
  ROD_FEEDER: "Rod Feeder",
  CFF: "CFF",
  COOLING_ONE: "CoolingOne",
  COOLING_TWO: "CoolingTwo",
  FURNACE_9F: "Furnace MF-09",
  FURNACE_10F: "Furnace MF-10",
  HOMOGENIZING: "Homogenizing",
  SAWING: "Sawing Machine",
  SAWING_ENTRY: "Sawing Entry System",
  SWARF: "Swarf Briquettin",
  SIR: "SIR Degasser",
  STILLAGE_ONE: "Stillage 1",
  STILLAGE_TWO: "Stillage 2",
  VDC: "VDC",
  WEIGHING: "Weighing",
  CHARGING_BILLET: "Charging Billet",
}

/**
 * Equipment indicators:
 * - operation: green    => text-green-500
 * - standby: blue       => text-blue-500
 * - maintenance: orange => text-orange-500
 * - offline: gray       => text-gray-300
*/
export const Status = {
  OPERATION: {
    label: "Operation",
    color: "text-green-500"
  },
  STANDBY: {
    label: "Standby",
    color: "text-blue-500"
  },
  MAINTENANCE: {
    label: "Maintenance",
    color: "text-orange-500"
  },
  OFFLINE: {
    label: "Offline",
    color: "text-gray-300"
  }
}

const InitialCoolingOneData: CoolingOneDataProps = {
  equipmentName: equipments.COOLING_ONE,
  status: 0,
  tag: {
    GL_HMI_ACT_ACS1_logTempL: {
      tagName: 'GL_HMI_ACT_ACS1_logTempL',
      label: "Air Temperature Left",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    GL_HMI_ACT_ACS1_logTempR: {
      tagName: 'GL_HMI_ACT_ACS1_logTempR',
      label: "Air Temperature Right",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    GL_STACK_ACS1_pos1TotalNoLogs: {
      tagName: 'GL_STACK_ACS1_pos1TotalNoLogs',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    }
  }
}

const initialCoolingTwoData: CoolingTwoDataProps = {
  equipmentName: equipments.COOLING_TWO,
  status: 0,
  tag: {
    GL_HMI_ACT_ACS2_logTempL: {
      tagName: 'GL_HMI_ACT_ACS2_logTempL',
      label: "Air Temperature Left",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    GL_HMI_ACT_ACS2_logTempR: {
      tagName: 'GL_HMI_ACT_ACS2_logTempR',
      label: "Air Temperature Right",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    GL_STACK_ACS2_pos1TotalNoLogs: {
      tagName: 'GL_STACK_ACS2_pos1TotalNoLogs',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    }
  }
}

const InitialFurnace9FData: Furnace9FDataProps = {
  equipmentName: equipments.FURNACE_9F,
  status: 0,
  tag: {
    'LSYS_E2_IO_Cabinet_Launder:1:I.Ch0Data': {
      tagName: 'LSYS_E2_IO_Cabinet_Launder:1:I.Ch0Data',
      label: "Level Metal Depan Furnace 1",
      unit: "mm",
      value: 0,
      isShown: true,
    }
  }
}

const InitialFurnace10FData: Furnace10FDataProps = {
  equipmentName: equipments.FURNACE_10F,
  status: 0,
  tag: {
    'LSYS_E2_IO_Cabinet_Launder:2:I.Ch0Data': {
      tagName: 'LSYS_E2_IO_Cabinet_Launder:2:I.Ch0Data',
      label: "Level Metal Depan Furnace 2",
      unit: "mm",
      value: 0,
      isShown: true,
    }
  }
}

const InitialSIRData: SIRDataProps = {
  equipmentName: equipments.SIR,
  status: 0,
  tag: {
    'rc:3:I.Ch1Data': {
      tagName: 'rc:3:I.Ch1Data',
      label: "Air Pressure",
      unit: "bar",
      value: 0,
      isShown: true,
    },
    'rc:5:I.Ch0Data': {
      tagName: 'rc:5:I.Ch0Data',
      label: "Temperature",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'rc:7:I.Ch0Data': {
      tagName: 'rc:7:I.Ch0Data',
      label: "Ejector Use",
      unit: "%",
      value: 0,
      isShown: true,
    },
    'X_Rotor1_U1:I.TorqueCurrent': {
      tagName: 'X_Rotor1_U1:I.TorqueCurrent',
      label: "Rotor 1 Torque",
      unit: "A",
      value: 0,
      isShown: true,
    },
    'X_Rotor2_U2:I.TorqueCurrent': {
      tagName: 'X_Rotor2_U2:I.TorqueCurrent',
      label: "Rotor 2 Torque",
      unit: "A",
      value: 0,
      isShown: true,
    },
    'SIR_PV_OperatingHoursR1': {
      tagName: 'SIR_PV_OperatingHoursR1',
      label: "Opt Hour Rotor 1",
      unit: "hour",
      value: 0,
      isShown: true,
    },
    'SIR_PV_OperatingHoursR2': {
      tagName: 'SIR_PV_OperatingHoursR2',
      label: "Opt Hour Rotor 2",
      unit: "hour",
      value: 0,
      isShown: true,
    },
  }
}

const InitialHomogenizingData: HomogenizingDataProps = {
  equipmentName: equipments.HOMOGENIZING,
  status: 0,
  tag: {
    'GL_STACK_BF1_pos1TotalNoLogs': {
      tagName: 'GL_STACK_BF1_pos1TotalNoLogs',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z1L_airTemp': {
      tagName: 'GL_BF1_ProcData_furn1Z1L_airTemp',
      label: "Air Temperatur Z1 Left",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z1R_airTemp': {
      tagName: 'GL_BF1_ProcData_furn1Z1R_airTemp',
      label: "Air Temperature Z1 Right",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z2L_airTemp': {
      tagName: 'GL_BF1_ProcData_furn1Z2L_airTemp',
      label: "Air Temperature Z2 Left",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z2R_airTemp': {
      tagName: 'GL_BF1_ProcData_furn1Z2R_airTemp',
      label: "Air Temperature Z2 Right",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z1L_logTemp_1': {
      tagName: 'GL_BF1_ProcData_furn1Z1L_logTemp_1',
      label: "Billet Temperature Z1 Left",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z1R_logTemp_1': {
      tagName: 'GL_BF1_ProcData_furn1Z1R_logTemp_1',
      label: "Billet Temperature Z1 Right",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z2L_logTemp_1': {
      tagName: 'GL_BF1_ProcData_furn1Z2L_logTemp_1',
      label: "Billet Temperature Z2 Left",
      unit: "°C",
      value: 0,
      isShown: true,

    },
    'GL_BF1_ProcData_furn1Z2L_logTemp_2': {
      tagName: 'GL_BF1_ProcData_furn1Z2L_logTemp_2',
      label: "Billet Temperature Z2 Left",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'GL_BF1_ProcData_furn1Z2R_logTemp_1': {
      tagName: 'GL_BF1_ProcData_furn1Z2R_logTemp_1',
      label: "Billet Temperature Z2 Right",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    'DO_QP0421_BF1_HOMO_onOff_rd': {
      tagName: "DO_QP0421_BF1_HOMO_onOff_rd",
      label: "Status",
      unit: "",
      value: "OFF",
      isShown: true,
    },
  }
}

const InitialSawingData: SawingDataProps = {
  equipmentName: equipments.SAWING,
  status: 0,
  tag: {
    'GL_Cut_currentMeasured': {
      tagName: 'GL_Cut_currentMeasured',
      label: "Arus Motor Saw Blade",
      unit: "A",
      value: 0,
      isShown: true,
    },
    'LtNoLogs[0]': {
      tagName: 'LtNoLogs[0]',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialSwarfData: SwarfDataProps = {
  equipmentName: equipments.SWARF,
  status: 0,
  tag: {
    'DO_QLMP_ctrlOn': {
      tagName: 'DO_QLMP_ctrlOn',
      label: "Status",
      unit: "",
      value: "OFF",
      isShown: true,
    },
  }
}

const InitialVDCData: VDCDataProps = {
  equipmentName: equipments.VDC,
  status: 0,
  tag: {
    BilletLength: {
      label: "Billet Length",
      unit: "mm",
      value: 0,
      isShown: true,
    },
    SpeedCasting: {
      label: "Speed Casting",
      unit: "m/hour",
      value: 0,
      isShown: true,
    },
    'LSYS_E2_IO_Cabinet_Launder:3:I.Ch0Data': {
      tagName: 'LSYS_E2_IO_Cabinet_Launder:3:I.Ch0Data',
      label: "Level Metal Casting Table",
      unit: "mm",
      value: 0,
      isShown: true,
    },
    'CCS_E1_PLC_Cabinet_PointIO:3:I.Ch0Data': {
      tagName: 'CCS_E1_PLC_Cabinet_PointIO:3:I.Ch0Data',
      label: "Temperature Casting Table",
      unit: "°C",
      value: 0,
      isShown: true,
    },
    LevelMetal9F: {
      label: "Level Metal 9F",
      unit: "mm",
      value: 0,
      isShown: true,
    },
    LevelMetal10F: {
      label: "Level Metal 10F",
      unit: "mm",
      value: 0,
      isShown: true,
    },
    'CM_E7_Cooling_Water:1:I.Ch0Data': {
      tagName: 'CM_E7_Cooling_Water:1:I.Ch0Data',
      label: "Water Flow",
      unit: "m3/hour",
      value: 0,
      isShown: true,
    },
    'CM_E5_Casting_Gas_Cabinet:1:I.Ch0Data': {
      tagName: 'CM_E5_Casting_Gas_Cabinet:1:I.Ch0Data',
      label: "Gas Pocket",
      unit: "m3/hour",
      value: 0,
      isShown: true,
    }
  }
}

const InitialStillageOneData: StillageOneDataProps = {
  equipmentName: equipments.STILLAGE_ONE,
  status: 0,
  tag: {
    'LtNoLogs[19]': {
      tagName: 'LtNoLogs[19]',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialStillageTwoData: StillageTwoDataProps = {
  equipmentName: equipments.STILLAGE_TWO,
  status: 0,
  tag: {
    'LtNoLogs[15]': {
      tagName: 'LtNoLogs[15]',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialSawingEntryData: SawingEntryDataProps = {
  equipmentName: equipments.SAWING_ENTRY,
  status: 0,
  tag: {
    'LtNoLogs[20]': {
      tagName: 'LtNoLogs[20]',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialConveyorData: ConveyorDataProps = {
  equipmentName: equipments.CONVEYOR,
  status: 0,
  tag: {
    'LtNoLogs[0]': {
      tagName: 'LtNoLogs[0]',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialUTData: UTDataProps = {
  equipmentName: equipments.UT,
  status: 0,
  tag: {
    'LtNoLogs[1]': {
      tagName: 'LtNoLogs[1]',
      label: "Log Tracking",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialRodFeederData: RodFeederDataProps = {
  equipmentName: equipments.ROD_FEEDER,
  status: 0,
  tag: {
    DosisAltib: {
      label: "Dosis Altib",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialCFFData: CFFDataProps = {
  equipmentName: equipments.CFF,
  status: 0,
  tag: {
    cff: {
      label: "Temperature",
      unit: "",
      value: 0,
      isShown: true,
    },
  }
}

const InitialWeighingData: WeighingDataProps = {
  equipmentName: equipments.WEIGHING,
  status: 0,
  tag: {
    'weighing': {
      label: "Weight",
      unit: "kg",
      value: 0,
      isShown: true,
    },
  }
}

const InitialCharginBilletData: EquipmentProps = {
  equipmentName: equipments.CHARGING_BILLET,
  status: 0,
}

export const InitialDataField: DataFieldProps = {
  conveyor: InitialConveyorData,
  ut: InitialUTData,
  stillageOne: InitialStillageOneData,
  stillageTwo: InitialStillageTwoData,
  coolingOne: InitialCoolingOneData,
  coolingTwo: initialCoolingTwoData,
  furnace9F: InitialFurnace9FData,
  furnace10F: InitialFurnace10FData,
  homogenizing: InitialHomogenizingData,
  sawing: InitialSawingData,
  sawingEntry: InitialSawingEntryData,
  swarf: InitialSwarfData,
  sir: InitialSIRData,
  vdc: InitialVDCData,
  rodFeeder: InitialRodFeederData,
  cff: InitialCFFData,
  weighing: InitialWeighingData,
  chargingBillet: InitialCharginBilletData
}

export const InitialWindowOpen: WindowOpenProps = {
  conveyor: false,
  ut: false,
  stillageOne: false,
  stillageTwo: false,
  coolingOne: false,
  coolingTwo: false,
  furnace9F: false,
  furnace10F: false,
  homogenizing: false,
  sawing: false,
  sawingEntry: false,
  sir: false,
  swarf: false,
  vdc: false,
  rodFeeder: false,
  cff: false,
  weighing: false
}
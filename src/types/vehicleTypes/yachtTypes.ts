export enum yachtTypesEnum {
    motorYacht = "MY",
    sailBoat = "SY",
    katamaran = "CT",
    motorKatamaran = "MC",
    motorBoat = "MB",
  }
  
  export const yachtTypesForDisplay = {
    MY: "Моторная яхта",
    SY: "Парусная яхта",
    CT: "Катамаран",
    MC: "Моторный катамаран",
    MB: "Моторная лодка",
  };
  
  export const yachtTypesValues = [
    {
      value: yachtTypesEnum.motorYacht,
      label: yachtTypesForDisplay.MY,
    },
    {
      value: yachtTypesEnum.sailBoat,
      label: yachtTypesForDisplay.SY,
    },
    {
      value: yachtTypesEnum.katamaran,
      label: yachtTypesForDisplay.CT,
    },
    {
      value: yachtTypesEnum.motorKatamaran,
      label: yachtTypesForDisplay.MC,
    },
    {
      value: yachtTypesEnum.motorBoat,
      label: yachtTypesForDisplay.MB,
    },
  ];
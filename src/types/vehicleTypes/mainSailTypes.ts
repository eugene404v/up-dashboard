export enum mainSailTypesEnum {
  twisting = "TW",
  classic = "CL",
}

export const mainSailTypesForDisplay = {
  TW: "Скрутка",
  CL: "Классический",
};

export const mainSailTypesValues = [
  {
    value: mainSailTypesEnum.twisting,
    label: mainSailTypesForDisplay.TW,
  },
  {
    value: mainSailTypesEnum.classic,
    label: mainSailTypesForDisplay.CL,
  },
];

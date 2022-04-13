export enum jetTypesEnum {
  light = "LG",
  medium = "MD",
  heavy = "HV",
}

export const jetTypesForDisplay = {
  LG: "Легкий",
  MD: "Средний",
  HV: "Тяжелый",
};

export const jetTypesValues = [
  {
    value: jetTypesEnum.light,
    label: jetTypesForDisplay.LG,
  },
  {
    value: jetTypesEnum.medium,
    label: jetTypesForDisplay.MD,
  },
  {
    value: jetTypesEnum.heavy,
    label: jetTypesForDisplay.HV,
  },
];


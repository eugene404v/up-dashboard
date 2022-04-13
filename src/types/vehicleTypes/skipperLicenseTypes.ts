export enum skipperLicenseTypesEnum {
  standart = "ST",
  notStandart = "NS",
  noLicense = "NL",
}

export const skipperLicenseTypesForDisplay = {
  ST: "Стандартная",
  NS: "Нестандартная",
  NL: "Без лицензии",
};

export const skipperLicenseTypesValues = [
  {
    id: skipperLicenseTypesEnum.standart,
    name: skipperLicenseTypesForDisplay.ST,
  },
  {
    id: skipperLicenseTypesEnum.notStandart,
    name: skipperLicenseTypesForDisplay.NS,
  },
  {
    id: skipperLicenseTypesEnum.noLicense,
    name: skipperLicenseTypesForDisplay.NL,
  },
];

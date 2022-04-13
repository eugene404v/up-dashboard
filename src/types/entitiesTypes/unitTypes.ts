export enum unitTypesEnum {
    perPerson = "PP",
    perWeek = "PW",
    perDay = "PD",
  }
  
  export const unitTypesForDisplay = {
    PP: "Человек",
    PW: "Неделя",
    PD: "День",
  };
  
  export const unitTypesValues = [
    {
      id: unitTypesEnum.perPerson,
      name: unitTypesForDisplay.PP,
    },
    {
      id: unitTypesEnum.perWeek,
      name: unitTypesForDisplay.PW,
    },
    {
      id: unitTypesEnum.perDay,
      name: unitTypesForDisplay.PD,
    },
  ];
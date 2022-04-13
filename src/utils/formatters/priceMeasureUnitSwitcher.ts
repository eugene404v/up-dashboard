import { unitTypesEnum } from "types/entitiesTypes/unitTypes";

export function priceMeasureUnitSwitcher(unit: unitTypesEnum) {
  switch (unit) {
    case unitTypesEnum.perDay:
      return "день";
    case unitTypesEnum.perPerson:
      return "человек";
    case unitTypesEnum.perWeek:
      return "неделя";
    default:
      return "";
  }
}

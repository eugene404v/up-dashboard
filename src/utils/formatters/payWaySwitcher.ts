import { payWaysEnum } from "types/entitiesTypes/entitiesType";

export const payWaySwitcher = (payWay: payWaysEnum) => {
    switch (payWay) {
        case payWaysEnum.masterCard:
            return "MasterCard"
        case payWaysEnum.usd:
            return "Доллар США"
        case payWaysEnum.visa:
            return "Visa"
    }
}
import { currenciesEnum } from "types/entitiesTypes/entitiesType";

export const currencySwitcher = (currency: currenciesEnum) => {
    switch (currency) {
        case currenciesEnum.eur:
            return "€"
        case currenciesEnum.rub:
            return "₽"
        case currenciesEnum.usd:
            return "$"
        default:
            return ""
    }
}
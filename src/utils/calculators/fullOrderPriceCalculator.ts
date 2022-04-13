import { extraExpenseType } from "types/vehicleTypes/cardTypes"
import { calculateAllExtraExpensesPrice } from "./calculateAllExtraExpensesPrice"
import { calculatePaidServicesPrice } from "./calculatePaidServicesPrice"

type propsType = {
    cost: number, 
    discount?: number, 
    days: number, 
    people?: number,
    paidServices?: extraExpenseType[],
    extraExpenses?: extraExpenseType[],
    selectedServicesIds?: number[]
}

export const fullOrderPriceCalculator = ({cost, days, discount = 0, people = 1, paidServices = [], extraExpenses = [], selectedServicesIds = []}: propsType) => {
    const actualPrice = cost - (cost * discount / 100)
    const actualPriceWithExtraExps = actualPrice * days + calculateAllExtraExpensesPrice(extraExpenses, days, people)
    const paidServicesPrice = calculatePaidServicesPrice(paidServices, selectedServicesIds, days, people)
    const finalTotalPrice = actualPriceWithExtraExps + paidServicesPrice
    return {
        actualPrice,
        actualPriceWithExtraExps,
        paidServicesPrice,
        finalTotalPrice
    }
}

export type fullOrderPriceType = ReturnType<typeof fullOrderPriceCalculator>
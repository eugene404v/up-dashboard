import { jetFullCardForDisplay, jetFullCardForEdit } from "types/vehicleTypes/cardTypes";
import { extraExpenseRemoveIds } from "./extraExpenseRemoveId";

export const fromGetJetToEdit = (jet: jetFullCardForDisplay):jetFullCardForEdit => {
    return {
        ...jet,
        airport: jet.airport?.id,
        manufacturer: jet.manufacturer?.id as number,
        additional_conditions: jet.additional_conditions?.map(el => el.id) as number[]||[],
        amenities: jet.amenities.map(el => el.id),
        photos: undefined, 
        extra_expenses: extraExpenseRemoveIds(jet.extra_expenses||[]),
        paid_services: extraExpenseRemoveIds(jet.paid_services||[]),
        main_photo: undefined
    }
}
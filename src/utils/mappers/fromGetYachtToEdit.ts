import { yachtFullCardForDisplay, yachtFullCardForEdit } from "types/vehicleTypes/cardTypes";
import { extraExpenseRemoveIds } from "./extraExpenseRemoveId";

export const fromGetYachtToEdit = (yacht: yachtFullCardForDisplay):yachtFullCardForEdit => {
    return {
        ...yacht,
        marina: yacht.marina?.id,
        manufacturer: yacht.manufacturer?.id as number,
        additional_conditions: yacht.additional_conditions?.map(el => el.id) as number[]||[],
        amenities: yacht.amenities.map(el => el.id),
        cabins: yacht.cabins || {},
        photos: undefined,
        extra_expenses: extraExpenseRemoveIds(yacht.extra_expenses||[]),
        paid_services: extraExpenseRemoveIds(yacht.paid_services||[]),
        main_photo: undefined
    }
}


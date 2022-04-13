import { joinDateTime } from "utils/time/joinDateTime";
import { editingRequestResultType } from "./fromGetYachtRequestToEdit";

export const fromEditYachtRequestToPatch = (data: editingRequestResultType, selectedIds: number[]) => {
    return {
        return_date: joinDateTime(data.dayEnd, data.timeEnd),
        collection_date: joinDateTime(data.dayStart, data.timeStart),
        paid_services: selectedIds,
        last_name: data.last_name,
        first_name: data.first_name,
        phone: data.phone,
        email: data.email
    }
}
export type editingRequestFormResultType = ReturnType<typeof fromEditYachtRequestToPatch>

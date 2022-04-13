import moment from "moment";
import { requestYachtPreviewType } from "types/requestsTypes";

export const fromGetYachtRequestToEdit = (request: requestYachtPreviewType) => {
    return {
        dayStart: moment(request.collection_date).format("YYYY-MM-DD"),
        dayEnd: moment(request.return_date).format("YYYY-MM-DD"),
        timeStart: moment(request.collection_date).format("hh.mm"),
        timeEnd: moment(request.return_date).format("hh.mm"),
        first_name: request.first_name,
        last_name: request.last_name,
        email: request.email,
        phone: request.phone,
    }
}

export type editingRequestResultType = ReturnType<typeof fromGetYachtRequestToEdit>
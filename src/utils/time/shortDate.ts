import moment from "moment"

export const shortDate = (date?: string) => {
    if (!date) return ""
    return moment(date).format("DD.MM.YYYY")
}
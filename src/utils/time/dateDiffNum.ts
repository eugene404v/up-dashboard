import moment from "moment";

export const dateDiffNum = (date1?: string, date2?: string) => {
    if (!date1 || !date2) return 1
    const start = moment(moment(date1).format("YYYY-MM-DD"))
    const end = moment(moment(date2).format("YYYY-MM-DD"))
    const duration = moment.duration(end.diff(start));
    const hours = duration.asHours();
    const daysDiff = Math.ceil(hours/24)
    return daysDiff
}
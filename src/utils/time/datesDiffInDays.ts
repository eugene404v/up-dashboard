import moment from "moment";
import declOfNum from "utils/formatters/declOfNum";

export const datesDiffInDays = (date1?: string, date2?: string) => {
    if (!date1 || !date2) return ""
    const start = moment(date1)
    const end = moment(date2)
    const duration = moment.duration(end.diff(start));
    const hours = duration.asHours();
    const daysDiff = Math.ceil(hours/24)
    return declOfNum(daysDiff, ["день", "дня", "дней"])
}
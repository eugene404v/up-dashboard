import moment from "moment"

export const dateOfBookingFormatter = (date: string) => {
    if (!date) return ""
    const formattedDate =  moment(date as string).format("dddd") + " " + moment(date as string).format("LL")
    const slicedDate = formattedDate.substr(0, formattedDate.length - 2)
    return slicedDate
}
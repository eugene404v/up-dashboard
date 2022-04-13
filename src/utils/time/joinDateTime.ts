import moment from "moment"

export const joinDateTime = (day: string, time: string) => {
    const formattedTime = time.split(".").join(":") + ":00"
    return moment(day + "T" + formattedTime).toISOString()
}
import { formatDistanceToNow, formatRelative } from "date-fns";
import { ru } from "date-fns/locale";

export const lastTimeFormatter = (time: string) => {
  if (!time) {
    return "";
  }
  const timeStamp = Date.parse(time);
  const timeStampNow = Date.parse(new Date().toUTCString());
  const days = Math.floor(timeStamp / (24 * 60 * 60 * 1000));
  const today = Math.floor(timeStampNow / (24 * 60 * 60 * 1000));
  const diff = today - days;
  const hours = Math.floor(timeStamp / (60 * 60 * 1000));
  const todayHours = Math.floor(timeStampNow / (60 * 60 * 1000));
  const diffHours = todayHours - hours

  if (diff < 1 && diffHours <= 1) {
    const result = formatDistanceToNow(new Date(time), {
        locale: ru,
        addSuffix: true,
      });
    return result
  } else if (diff < 1 && diffHours > 1) {
    const result = formatRelative(new Date(time), new Date(), {
        locale: ru,
      })
    return result
  } else {
    const formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return formatter.format(new Date(time));
  }
};

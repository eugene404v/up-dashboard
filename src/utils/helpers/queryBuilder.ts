import { anyObjectType } from "types/utilTypes";

export const queryBuilder = (data: anyObjectType) => {
    const tempObj = {} as { [key: string]: string | number | boolean };
  for (let key in data) {
    if (data[key] !== null && data[key] !== undefined) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        tempObj[key + "From"] = data[key].from;
        tempObj[key + "To"] = data[key].to;
      } else if (Array.isArray(data[key])) {
        data[key].forEach((el: string | number | boolean, i: number) => {
          tempObj[key + String(i)] = el;
        });
      } else {
        tempObj[key] = data[key];
      }
    }
  }
  const esc = encodeURIComponent;
  const query = Object.keys(tempObj)
    .map((key) => esc(key.replace(/\d+/g, "")) + "=" + esc(tempObj[key]))
    .join("&");
  return query;
}
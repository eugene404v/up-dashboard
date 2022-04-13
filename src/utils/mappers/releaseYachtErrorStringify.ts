export const releaseYachtErrorStringify = (fields: string[]):string => {
    const tempResult:string[] = []
    if (!Array.isArray(fields)) return ""
    fields.forEach(el => {
        switch (el) {
            case "marina":
                tempResult.push("марина")
                break
            case "cost":
                tempResult.push("цена")
                break
            case "discount":
                tempResult.push("скидка")
                break
            case "owner":
                tempResult.push("владелец")
                break
            case "about":
                tempResult.push("описание")
                break
            case "length":
                tempResult.push("длина")
                break
            case "width":
                tempResult.push("ширина")
                break
            case "draught":
                tempResult.push("осадка")
                break
            case "year_built":
                tempResult.push("год")
                break
            case "showerCount":
                tempResult.push("душевые")
                break
            case "toiletCount":
                tempResult.push("туалеты")
                break
            case "bedCount":
                tempResult.push("кровати")
                break
            case "waterTankVolume":
                tempResult.push("водяной бак")
                break
            case "fuelTankVolume":
                tempResult.push("топливный бак")
                break
            case "engineHP":
                tempResult.push("мощность")
                break
            case "manufacturer":
                tempResult.push("производитель")
                break
        }
    })
    return tempResult.join(", ") 
}
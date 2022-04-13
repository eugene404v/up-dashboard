export function releaseJetErrorStringify(fields: string[]):string {
    const tempResult:string[] = []
    if (!Array.isArray(fields)) return ""
    fields.forEach(el => {
        switch (el) {
            case "airport":
                tempResult.push("аэропорт")
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
            case "height":
                tempResult.push("высота")
                break
            case "year_built":
                tempResult.push("год")
                break
            case "passengerCount":
                tempResult.push("пассажиры")
                break
            case "toiletCount":
                tempResult.push("туалеты")
                break
            case "bedCount":
                tempResult.push("кровати")
                break
            case "baggageVolume":
                tempResult.push("багаж")
                break
            case "range":
                tempResult.push("дальность")
                break
            case "speed":
                tempResult.push("скорость")
                break
            case "manufacturer":
                tempResult.push("производитель")
                break
        }
    })
    return tempResult.join(", ") 
}
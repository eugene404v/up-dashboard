export interface objectWithNumbers {
    [key: string]: number
}

export const getSumFromObjectFields = (obj: objectWithNumbers) => {
    let result = 0
    for (let key in obj) {
        if (obj[key]) {
            result += obj[key]
        }
    }
    return result
}
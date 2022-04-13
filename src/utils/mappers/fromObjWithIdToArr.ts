interface anyObjWithId {
    id: number;
    [key: string]: any;
}

export interface anyAmenitiesObj {
    [key: string]: anyObjWithId[]
}

export interface objWithIdsArrays {
    [key: string]: number[]
}

export const fromObjWithIdToArr = (objects: anyObjWithId[]) => {
    const result = objects.map(el => {
        return el.id
    })
    return result
}

export const fromAmenitiesObjToIdsArr = (amenities: anyAmenitiesObj) => {
    let tempArr:number[] = []
    for (let key in amenities) {
        tempArr = [...tempArr, ...fromObjWithIdToArr(amenities[key])]
    }
    return tempArr
}
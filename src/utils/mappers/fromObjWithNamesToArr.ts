import { amenitiesJetTypeEnum, amenitiesYachtTypeEnum, amenityType } from "types/entitiesTypes/amenitiesTypes"

interface anyObjWithName {
    name: string;
    [key: string]: any;
}

export interface anyAmenitiesObj {
    [key: string]: anyObjWithName[]
}

export interface objWithIdsArrays {
    [key: string]: number[]
}

export const fromObjWithNamesToArr = (objects: anyObjWithName[]) => {
    const result = objects.map(el => {
        return el.name
    })
    return result
}

export const fromAmenitiesObjToNamesArr = (arr?: amenityType[], type?: amenitiesYachtTypeEnum|amenitiesJetTypeEnum) => {
    if (!Array.isArray(arr)) return []
    const filteredArr = arr.filter(el => el.type === type)
    return fromObjWithNamesToArr(filteredArr)
}
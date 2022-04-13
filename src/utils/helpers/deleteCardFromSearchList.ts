import { yachtFullCardForDisplay } from "types/vehicleTypes/cardTypes"

export type deleteCardFromSearchListProps = {
    results: mutationResult[];
    setLoadedData: React.Dispatch<React.SetStateAction<yachtFullCardForDisplay[]>>;
    loadedData: yachtFullCardForDisplay[];
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export type mutationResult = {
    originalArgs: number;
    isSuccess: boolean;
}

export const deleteCardFromSearchList = ({results, loadedData, setLoadedData, setOffset}: deleteCardFromSearchListProps):void => {
    const tempData =  [...loadedData];
    results.forEach(el => {
        if (!el.isSuccess) return
        if (!el.originalArgs) return
        const index = tempData.findIndex(item => item.id === el.originalArgs)
        if (index < 0) return
        tempData.splice(index, 1)
    })
    setLoadedData(tempData)
    setOffset(tempData.length)
}
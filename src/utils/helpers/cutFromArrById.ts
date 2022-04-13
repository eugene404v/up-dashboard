export const cutFromArrById = (arr: any[], id: number) => {
    if (!arr.length) return arr
    if (!arr[0].id) return arr
    const index = arr.findIndex(el => el.id == id)
    const newArr = [...arr]
    newArr.splice(index, 1)
    return newArr
}
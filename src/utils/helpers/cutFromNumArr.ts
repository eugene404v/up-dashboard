export const cutFromNumArr = (arr: number[], id: number) => {
    if (!arr.length) return arr
    const index = arr.findIndex(el => el == id)
    const newArr = [...arr]
    newArr.splice(index, 1)
    return newArr
}
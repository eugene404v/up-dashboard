export const newPriceCalculator = (price: number, discount?: number) => {
    if (!discount) return price
    const decreasedPrice = Math.ceil(price - (price * (discount/100)))
    return decreasedPrice
}
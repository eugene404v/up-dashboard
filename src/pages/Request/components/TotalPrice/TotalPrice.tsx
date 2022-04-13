import React from 'react'
import { typoEnum } from 'styles/typo'
import { currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { currencySwitcher } from 'utils/formatters/currencySwitcher'
import styles from "./TotalPrice.module.css"

type propsType = {
    price: number;
    currency: currenciesEnum
}

function TotalPrice({price, currency}: propsType) {
    return (
        <div className={styles.container}>
            <span className={typoEnum.typo_14_17_500}>Итоговая цена</span>
            <span className={typoEnum.typo_20_24_500}>
                {currencySwitcher(currency)}
                {price}
            </span>
        </div>
    )
}

export default TotalPrice

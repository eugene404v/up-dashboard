import React from 'react'
import { typoEnum } from 'styles/typo'
import { currenciesEnum, timeMeasuresEnum } from 'types/entitiesTypes/entitiesType'
import { currencySwitcher } from 'utils/formatters/currencySwitcher'
import styles from "./Price.module.css"

type propsType = {
    price: number;
    oldPrice?: number;
    currency: currenciesEnum;
    timeMeasure: timeMeasuresEnum;
    className?: string;
}

function Price({price, oldPrice, currency, timeMeasure, className}: propsType) {
    return (
        <div className={`${styles.container} ${className||""}`}>
            {oldPrice && <span className={`${styles.old} ${typoEnum.typo_14_17_500}`}>{currencySwitcher(currency)}{oldPrice}</span>} 
            <span className={`${styles.price} ${typoEnum.typo_16_19_500}`}>{currencySwitcher(currency)}{price}</span>
            /
            <span className={styles.day}>{timeMeasure === timeMeasuresEnum.day?"день":"час"}</span>
        </div>
    )
}

export default Price

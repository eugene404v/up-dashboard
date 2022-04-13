import React from 'react'
import { typoEnum } from 'styles/typo'
import { currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { currencySwitcher } from 'utils/formatters/currencySwitcher'
import styles from "./Price.module.css"

type propsType = {
    classname?: string;
    price?: number;
    discount?: number;
    currency: currenciesEnum;
}

function Price({ classname, price, discount, currency }: propsType) {
    return (
        <div className={`${styles.container} ${classname}`}>
            {(!discount && price) && <p className={`${styles.price} ${typoEnum.typo_16_19_500}`}>{currencySwitcher(currency)}{price}</p>}
            {(discount && price) && <p className={`${styles.price} ${typoEnum.typo_16_19_500}`}>
                <pre className={styles.old}>{currencySwitcher(currency)}{price}</pre>
                {currencySwitcher(currency)}{Math.ceil(price * (1 - discount/100))}
            </p>}  
            {(!discount && !price) && <p className={`${styles.price} ${typoEnum.typo_16_19_500}`}></p>}
            {discount && <div className={styles.discount}>{discount}%</div>}
        </div>
    )
}

export default Price

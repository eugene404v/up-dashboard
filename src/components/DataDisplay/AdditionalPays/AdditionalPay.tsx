import React from 'react'
import { typoEnum } from 'styles/typo'
import { currenciesEnum, priceMeasureEnum } from 'types/entitiesTypes/entitiesType'
import { unitTypesEnum } from 'types/entitiesTypes/unitTypes'
import { currencySwitcher } from 'utils/formatters/currencySwitcher'
import { priceMeasureUnitSwitcher } from 'utils/formatters/priceMeasureUnitSwitcher'
import styles from "./AdditionalPays.module.css"

export type additionalPayType = {
    name: string;
    descr?: string;
    price: number;
    currency?: currenciesEnum;
    unit: unitTypesEnum
}

function AdditionalPay({name, descr, price, currency = currenciesEnum.usd, unit}: additionalPayType) {
    return (
        <li className={styles.item}>
            <div className={styles.left}>
                <h3 className={`${typoEnum.typo_14_17_500}`}>{name}</h3>
                {descr && <p className={styles.descr}>{descr}</p>}
            </div>
            <p className={styles.price}>
                {currencySwitcher(currency)}{price}
                <span className={styles.divider}>/</span>
                {priceMeasureUnitSwitcher(unit)}
            </p>
        </li>
    )
}

export default AdditionalPay

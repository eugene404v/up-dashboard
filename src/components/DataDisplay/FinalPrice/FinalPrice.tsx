import React from 'react'
import { typoEnum } from 'styles/typo'
import { currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { unitTypesEnum } from 'types/entitiesTypes/unitTypes'
import { calculateOneExtraExpPrice } from 'utils/calculators/calculateOneExtraExpPrice'
import { currencySwitcher } from 'utils/formatters/currencySwitcher'
import styles from "./FinalPrice.module.css"

type propsType = {
    items?: finalPriceItemsType[];
    name: string;
    currency: currenciesEnum;
    fullPrice?: number;
    days?: number
}

export type finalPriceItemsType = {
    name: string;
    price: number;
    isRequired?: boolean;
    isIncluded?: boolean;
    isAdditional?: boolean;
    tip?: string;
    isTip?: boolean;
    unit?: unitTypesEnum
}

function FinalPrice({items = [], name, currency, fullPrice, days = 1}: propsType) {
    const totalPrice = (Array.isArray(items) && items.length) ? items.map(el => calculateOneExtraExpPrice({
        price: el.price,
        days: days,
        unit: el.unit!
    })).reduce((accumulator, currentValue) => accumulator + currentValue) : ""

    return (
        <div className={`${styles.container}`}>
            <h4 className={styles.title}>
                <span className={`${typoEnum.typo_14_17_500}`}>{name}</span>
                <span className={`${typoEnum.typo_14_17_500}`}>{currencySwitcher(currency)}{fullPrice || totalPrice}</span>
            </h4>
            <ul className={styles.list}>
                {Array.isArray(items) && items.map(el => <li key={el.name} className={styles.item}>
                    <span className={styles.name}>{el.name}</span>
                    {el.isTip && <span className={styles.tip}>?</span>}
                    {el.isRequired && <span className={styles.required}>Обязательно</span>}
                    {el.isIncluded && <span className={styles.included}>Включено</span>}
                    {el.isAdditional && <span className={styles.additional}>Дополнительно</span>}
                    {el.price > 0 ? <span className={styles.price}>{currencySwitcher(currency)}{calculateOneExtraExpPrice({
                        price: el.price,
                        days: days,
                        unit: el.unit!
                    })}</span> 
                    : <span className={styles.price}>Бесплатно</span>}
                </li>)}
            </ul>
        </div>
    )
}

export default FinalPrice

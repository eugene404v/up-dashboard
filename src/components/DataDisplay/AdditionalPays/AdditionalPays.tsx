import React from 'react'
import { extraExpenseType } from 'types/vehicleTypes/cardTypes'
import AdditionalPay, { additionalPayType } from './AdditionalPay'
import styles from "./AdditionalPays.module.css"

type propsType = {
    items: extraExpenseType[]
}

function AdditionalPays({items}: propsType) {
    return (
        <ul className={styles.list}>
            {Array.isArray(items) && items.map((el, i) => <AdditionalPay key={i} {...el} />)}
        </ul>
    )
}

export default AdditionalPays

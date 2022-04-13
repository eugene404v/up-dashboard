import React from 'react'
import { payWaysEnum } from 'types/entitiesTypes/entitiesType'
import { payWaySwitcher } from 'utils/formatters/payWaySwitcher'
import styles from "./PayWays.module.css"

type propsType = {
    className?: string;
    payWay: payWaysEnum;
}

function PayWays({className, payWay}:propsType) {
    return (
        <p className={`${styles.container} ${className||""}`}>
            <img src={`/imgs/payways/${payWay}.svg`} alt={payWaySwitcher(payWay)} className={styles.img} />
            <span>{payWaySwitcher(payWay)}</span>
        </p>
    )
}

export default PayWays

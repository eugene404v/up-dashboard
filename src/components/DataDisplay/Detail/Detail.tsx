import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./Detail.module.css"

type propsType = {
    name: string;
    value: string;
    optionalValue?: string;
    className?: string;
}

function Detail({name, value, optionalValue, className}: propsType) {
    return (
        <div className={`${styles.container} ${className||""}`}>
            <p className={`${styles.name} `}>{name}</p>
            <p className={`${typoEnum.typo_16_19_500}`}>{value}</p>
            {optionalValue && <p className={styles.optional}>{optionalValue}</p>}
        </div>
    )
}

export default Detail

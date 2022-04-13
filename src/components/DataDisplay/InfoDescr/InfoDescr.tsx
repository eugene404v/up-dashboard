import React from 'react'
import styles from "./InfoDescr.module.css"
import { typoEnum } from 'styles/typo'

type propsType = {
    name: string;
    descr: string | number;
    className?: string;
}

function InfoDescr({name, descr, className}: propsType) {
    return (
        <dl className={`${styles.container} ${className||""} ${typoEnum.typo_12_14_400}`}>
            <dt className={styles.name}>{name}</dt>
            <dd className={styles.descr}>{descr}</dd>
        </dl>
    )
}

export default InfoDescr

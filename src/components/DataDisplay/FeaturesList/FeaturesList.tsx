import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./styles.module.css"

type propsType = {
    features: string[];
    title: string;
}

function FeaturesList({features, title}: propsType) {
    return (
        <div className={styles.container}>
            <h3 className={`${styles.title} ${typoEnum.typo_16_19_500}`}>{title}</h3>
            <ul className={styles.list}>
                {Array.isArray(features) && features.map(el => <li key={el} className={styles.item}>{el}</li>)}
            </ul>
        </div>
    )
}

export default FeaturesList

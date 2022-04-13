import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./Pair.module.css"

type propsType = {
    name: string;
    children?: React.ReactElement | React.ReactFragment;
    text?: string | number;
    notFlex?: boolean;
}

function Pair({name, children, text, notFlex}: propsType) {
    return (
        <li className={`${styles.item} ${notFlex ? styles.notFlex : ""}`}>
            <div className={styles.left}>
                <h3 className={`${typoEnum.typo_14_17_500}`}>{name}</h3>
            </div>
            <p className={styles.right}>
                {!text && children}
                {!children && text}
            </p>
        </li>
    )
}

export default Pair

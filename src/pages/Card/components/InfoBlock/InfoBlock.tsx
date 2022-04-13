import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./InfoBlock.module.css"

type propsType = {
    className?: string;
    title: string;
    children: React.ReactElement | React.ReactFragment;
    id?: string;
}

function InfoBlock({className, title,  children, id}: propsType) {
    return (
        <section className={`${styles.container} ${className||""}`} id={id}>
            <h2 className={`${styles.title} ${typoEnum.typo_20_24_500}`}>{title}</h2>
            {children}
        </section>
    )
}

export default InfoBlock

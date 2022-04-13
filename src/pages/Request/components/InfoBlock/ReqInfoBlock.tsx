import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./ReqInfoBlock.module.css"

type propstype = {
    className?: string;
    title: string;
    children: React.ReactElement | React.ReactFragment
}

function ReqInfoBlock({children, className, title}: propstype) {
    return (
        <section className={`${styles.container} ${className||""}`}>
            <h3 className={`${styles.title} ${typoEnum.typo_20_24_500}`}>{title}</h3>
            <div className={styles.children}>
                {children}
            </div>
        </section>
    )
}

export default ReqInfoBlock

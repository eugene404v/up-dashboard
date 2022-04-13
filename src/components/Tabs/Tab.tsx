import React from 'react'
import styles from "./Tabs.module.css"

type propsType = {
    hash: string;
    text: string;
}

function Tab({hash, text}: propsType) {
    return (
        <a className={styles.tab} href={`#${hash}`}>
            {text}
        </a>
    )
}

export default Tab

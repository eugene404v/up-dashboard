import React from 'react'
import styles from "./Thead.module.css"

type propsType = {
    data: Array<string>;
}

function Thead({data}:propsType) {
    return (
        <tr className={styles.thead}>
            {Array.isArray(data) && data.map(el => <th className={`${styles.th} typo-14-17-400`} key={el}>{el}</th>)}
        </tr>
    )
}

export default Thead

import React from 'react'
import { activityAdminDataType } from 'types/reduxTypes/adminTypes'
import styles from "./Table.module.css"
import Thead from './Thead'
import TrowActivity from './TrowActivity'

type propsType = {
    title: string;
    data: Array<activityAdminDataType>;
}

function TableActivity({ title, data }: propsType) {
    return (
        <div className={`white-block ${styles.container}`}>
            <h2 className={`${styles.title} typo-24-29-500`}>{title}</h2>
            <table className={styles.table}>
                <Thead data={["Логин", "Время", "Действие", ""]} />
                {Array.isArray(data) && data.map(el => <TrowActivity data={el} key={el.id} />)}
            </table>
        </div>
    )
}

export default TableActivity

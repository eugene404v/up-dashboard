import Button from 'components/Buttons/Button'
import React from 'react'
import { usersAdminDataType } from 'types/reduxTypes/adminTypes'
import styles from "./Table.module.css"
import Thead from './Thead'
import TrowUsers from './TrowUsers'

type propsType = {
    title: string;
    data: Array<usersAdminDataType>;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onOpenModal: () => void;
}

function TableUsers({ title, data, onDelete, onEdit, onOpenModal }: propsType) {
    return (
        <div className={`white-block ${styles.container}`}>
            <h2 className={`${styles.title} typo-24-29-500`}>{title}</h2>
            <table className={styles.table}>
                <Thead data={["Логин", "Роль", "Последняя активность", ""]} />
                {Array.isArray(data) && data.map(el => <TrowUsers data={el} key={el.id} onEdit={onEdit} onDelete={onDelete} />)}
            </table>
            <Button text="Создать аккаунт" additionalClassNames={styles.addBtn} onClick={onOpenModal} />
        </div>
    )
}

export default TableUsers

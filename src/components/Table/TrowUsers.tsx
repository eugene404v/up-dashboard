import DropdownMenu from 'components/DropdownMenu/DropdownMenu';
import React from 'react'
import { usersAdminDataType } from 'types/reduxTypes/adminTypes'
import { roleFormatter } from 'utils/formatters/roleFormatter';
import { lastTimeFormatter } from 'utils/time/lastTimeFormatter';
import styles from "./Trow.module.css"

type propsType = {
    data: usersAdminDataType;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

function TrowUsers({data, onDelete, onEdit}: propsType) {

    const dropdownMenuData = [
        {
            text: "Редактировать",
            onClick: () => onEdit(data.id)
        },
        {
            text: "Удалить",
            onClick: () => onDelete(data.id)
        }
    ]

    return (
        <tr className={`${styles.tr} typo-14-17-400`}>
            <td className={styles.td}>{data.name}</td>
            <td className={styles.td}>{roleFormatter(data.role)}</td>
            <td className={styles.td}>{lastTimeFormatter(data.lastActivity)}</td>
            <td className={`${styles.td} ${styles.tdBtn}`}>
                <DropdownMenu data={dropdownMenuData}>
                    <button className={styles.btn} />
                </DropdownMenu>

            </td>
        </tr>
    )
}

export default TrowUsers

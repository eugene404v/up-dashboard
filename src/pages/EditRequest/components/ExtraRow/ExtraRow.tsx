import React from 'react'
import { unitTypesEnum, unitTypesForDisplay } from 'types/entitiesTypes/unitTypes'
import ExtraItem from './ExtraItem'
import styles from "./ExtraRow.module.scss"

type propsType = {
    firstLabel?: string;
    name: string;
    price: number;
    unit: unitTypesEnum;
    id: number;
    onDelete?: (id: number) => void;
    onAdd?: (id: number) => void;
}

function ExtraRow({firstLabel = "", name, price, unit, id, onDelete, onAdd}: propsType) {

    const deleteHandler = onDelete ? (e:React.MouseEvent) => {
        e.preventDefault()
        onDelete(id)
    } : undefined

    const addHandler = onAdd ? (e:React.MouseEvent) => {
        e.preventDefault()
        onAdd(id)
    } : undefined

    return (
        <div className={styles.row}>
            <ExtraItem label={firstLabel} value={name} />
            <ExtraItem label="Цена (руб.)" value={price} />
            <ExtraItem label="Параметр" value={unitTypesForDisplay[unit]} onDelete={deleteHandler} onAdd={addHandler} />
        </div>
    )
}

export default ExtraRow

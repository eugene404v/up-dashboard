import Button from 'components/Buttons/Button'
import React from 'react'
import { typoEnum } from 'styles/typo'
import { amenitiesJetTypeEnum, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'
import Tag from './Tag'
import styles from "./Tags.module.css"

type propsType = {
    items: tagItemType[];
    onAdd?: () => void;
    onDelete?: (id: number, type: amenitiesYachtTypeEnum) => void;
    label?: string;
    type: amenitiesYachtTypeEnum | amenitiesJetTypeEnum
}

export type tagItemType = {
    id: number;
    name: string;
    onDelete?: (id: number, type: amenitiesYachtTypeEnum) => void;
    type: amenitiesYachtTypeEnum | amenitiesJetTypeEnum
}

function Tags({items, onAdd, onDelete, label, type}: propsType) {
    const addHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        onAdd && onAdd()
    }

    return (
        <div className={styles.container}>
            <p className={`${styles.label} ${typoEnum.typo_12_14_500}`}>{label}</p>
            <ul className={styles.list}>
                {Array.isArray(items) && items.map(el => <Tag key={el.id} id={el.id} name={el.name} onDelete={onDelete} type={type} />)}
                <Button size="small" prefix="plus" additionalClassNames={styles.btn} text="Добавить" onClick={addHandler} />
            </ul>
        </div>
    )
}

export default Tags

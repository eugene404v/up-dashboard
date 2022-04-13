import { Checkbox } from 'antd'
import React from 'react'
import styles from "./FilterSelect.module.css"

type propsType = {
    name: string;
    id: number;
    counter: number;
    isSelected: boolean;
    onClick: (id: number) => void;
}

function FilterSelectItem({ name, id, counter, isSelected, onClick }: propsType) {
    const clickHandler = () => {
        onClick(id)
    }

    return (
        <div className={styles.item} onClick={clickHandler}>
            <Checkbox checked={isSelected} />
            <span className={styles.name}>{name}</span>
            <span className={styles.counter}>{counter}</span>
        </div>
    )
}

export default FilterSelectItem

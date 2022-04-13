import React from 'react'
import styles from "./AmenitiesItem.module.css"
import { amenitiesJetTypeEnum, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'

type propsType = {
    id: number;
    name: string;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onDeselect: (id: number, type: amenitiesYachtTypeEnum&amenitiesJetTypeEnum) => void;
    type: amenitiesYachtTypeEnum & amenitiesJetTypeEnum;
}

function AmenitiesItem({id, name, isSelected, onDeselect, onSelect, type}: propsType) {
    const selectHandler = () => {
        onSelect(id)
    }

    const deselectHandler = () => {
        onDeselect(id, type)
    }

    return (
        <li className={styles.item} onClick={isSelected?deselectHandler:selectHandler}>
            {name}
            {isSelected && <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 24.1667L22.1667 28.8333L31.5 19.5" stroke="#0B193D"/>
            </svg>}
        </li>
    )
}

export default AmenitiesItem

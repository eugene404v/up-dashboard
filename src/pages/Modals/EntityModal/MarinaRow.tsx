import DeleteRowBtn from 'components/Controls/DeleteRowBtn/DeleteRowBtn'
import React from 'react'
import styles from "./MarinaRow.module.css"

type propsType = {
    name: string;
    id: number;
    onDelete?: (id: number) => void;
}

function MarinaRow({ name, id, onDelete }: propsType) {
    const clickHandler = () => {
        onDelete && onDelete(id)
    }

    return (
        <li className={styles.container}>
            <span className={styles.name}>{name}</span>
            <DeleteRowBtn onClick={clickHandler} />
        </li>
    )
}

export default MarinaRow

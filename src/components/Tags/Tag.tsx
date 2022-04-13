import React from 'react'
import { tagItemType } from './Tags'
import styles from "./Tags.module.css"

function Tag({ id, name, onDelete, type }: tagItemType) {
    const deleteHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        onDelete && onDelete(id, type as any)
    }

    return (
        <li className={styles.item}>
            {name}
            <button className={styles.delete} onClick={deleteHandler}>
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.800004 0.299805L4.58465e-06 1.0998L5.20001 6.2998L0 11.4998L0.799999 12.2998L6 7.0998L11.2 12.2998L12 11.4998L6.8 6.2998L12 1.09982L11.2 0.299823L6 5.4998L0.800004 0.299805Z" fill="#0B193D" fill-opacity="0.25" />
                </svg>
            </button>
        </li>
    )
}

export default Tag

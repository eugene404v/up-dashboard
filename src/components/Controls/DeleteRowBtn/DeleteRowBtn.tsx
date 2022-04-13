import React from 'react'
import styles from "./DeleteRowBtn.module.css"
import deleteSvg from "images/controls/deleteRowBtn.svg"

type propsType = {
    classNames?: string;
    onClick?: (e: React.MouseEvent) => void;
}

function DeleteRowBtn({onClick, classNames}: propsType) {
    return (
        <button className={`${styles.btn} ${classNames}`} onClick={onClick}>
            <img src={deleteSvg} alt="delete row" />
        </button>
    )
}

export default DeleteRowBtn

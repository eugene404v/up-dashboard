import React from 'react'
import styles from "./CloseBtn.module.css"

type propsType = {
    classNames?: string;
    onClick?: (e: React.MouseEvent) => void;
}

function CloseBtn({classNames, onClick}: propsType) {
    return (
        <button className={`${styles.close} ${classNames||""}`} onClick={onClick}>
        </button>
    )
}

export default CloseBtn

import React from 'react'
import styles from "./ExtraRow.module.scss"

type propsType = {
    isExpanded: boolean;
    onClick: () => void;
}

function ExtraDivider({ isExpanded, onClick }: propsType) {
    return (
        <div className={styles.divider} onClick={onClick}>
            <span>Добавить услугу</span>
            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg" className={!isExpanded?styles.closedDivider:""}>
                <path d="M30.618 29L32 27.618L24 19.618L16 27.618L17.382 29L24 22.382L30.618 29Z" fill="black" />
            </svg>
        </div>
    )
}

export default ExtraDivider

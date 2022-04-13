import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./ExtraRow.module.scss"

type propsType = {
    label: string;
    value: string | number;
    onAdd?: (e:React.MouseEvent) => void;
    onDelete?: (e:React.MouseEvent) => void;
}

function ExtraItem({ label, value, onAdd, onDelete }: propsType) {
    return (
        <div className={`${styles.item}`}>
            <p className={`label ${typoEnum.typo_12_14_500}`}>{label}</p>
            <div className={styles.flex}>
                <div className={styles.input}>{value}</div>
                {onDelete && <button className={`${styles.btn} ${styles.delete}`} onClick={onDelete}>
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_77_17624)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5667 16.5L16.5 17.5667L23.4333 24.5L16.5 31.4333L17.5667 32.5L24.5 25.5667L31.4333 32.5L32.5 31.4333L25.5667 24.5L32.5 17.5667L31.4333 16.5L24.5 23.4333L17.5667 16.5Z" fill="#0B193D" />
                        </g>
                        <defs>
                            <clipPath id="clip0_77_17624">
                                <rect width="16" height="16" fill="white" transform="translate(16.5 16.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>}
                {onAdd && <button className={`${styles.btn} ${styles.delete}`} onClick={onAdd}>
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1034_31785)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5 16H23.5V23H16.5V25H23.5V32H25.5V25H32.5V23H25.5V16Z" fill="#0B193D" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1034_31785">
                                <rect width="16" height="16" fill="white" transform="translate(16.5 16)" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>}
            </div>
        </div>
    )
}

export default ExtraItem

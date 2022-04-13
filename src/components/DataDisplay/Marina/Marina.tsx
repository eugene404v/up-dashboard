import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./Marina.module.css"

type propsType = {
    className?: string;
    onClick?: () => void;
    marinaName: string;
}

function Marina({ className, marinaName, onClick }: propsType) {
    return (
        <p className={`${styles.container} ${className || ""}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                <g clipPath="url(#clip0)">
                    <path d="M8.4 6.06169e-07C6.70261 6.06169e-07 5.07475 0.674284 3.87452 1.87452C2.67428 3.07475 2 4.70262 2 6.4C2.00076 7.04546 2.09782 7.68719 2.288 8.304C2.352 8.496 2.416 8.688 2.496 8.88C3.456 11.248 5.704 13.304 8.4 16C11.096 13.304 13.336 11.248 14.296 8.896C14.7082 7.92268 14.873 6.86242 14.7755 5.8099C14.6781 4.75739 14.3214 3.7454 13.7375 2.86432C13.1535 1.98325 12.3604 1.26053 11.4291 0.76071C10.4977 0.260892 9.45702 -0.00045939 8.4 6.06169e-07ZM8.4 0.800001C9.50758 0.800001 10.5903 1.12843 11.5112 1.74377C12.4321 2.35911 13.1499 3.23371 13.5737 4.25697C13.9976 5.28024 14.1085 6.40621 13.8924 7.49251C13.6763 8.5788 13.143 9.57662 12.3598 10.3598C11.5766 11.143 10.5788 11.6763 9.49251 11.8924C8.40621 12.1085 7.28024 11.9976 6.25697 11.5737C5.23371 11.1499 4.35911 10.4321 3.74377 9.51119C3.12843 8.59028 2.8 7.50758 2.8 6.4C2.8 4.91479 3.39 3.49041 4.4402 2.4402C5.49041 1.39 6.91479 0.800001 8.4 0.800001Z" fill="#0B193D" />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <span className={`${styles.name} ${typoEnum.typo_12_14_400}`} onClick={onClick}>{marinaName}</span>
        </p>
    )
}

export default Marina

import React from 'react'
import styles from "./BackModalBtn.module.css"

type propsType = {
    classNames?: string;
    onClick?: () => void;
}

function BackModalBtn({ classNames, onClick }: propsType) {
    return (
        <button className={`${styles.back} ${classNames || ""}`} onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.6668 2.02236C16.6934 0.703788 14.3734 0 12 0C8.8174 0 5.76515 1.26428 3.51471 3.51472C1.26428 5.76515 -5.72205e-06 8.8174 -5.72205e-06 12C-5.72205e-06 14.3734 0.703783 16.6935 2.02236 18.6668C3.34094 20.6402 5.21508 22.1783 7.40779 23.0866C9.60051 23.9948 12.0133 24.2324 14.3411 23.7694C16.6688 23.3064 18.807 22.1635 20.4853 20.4853C22.1635 18.8071 23.3064 16.6689 23.7694 14.3411C24.2324 12.0133 23.9948 9.60051 23.0865 7.4078C22.1783 5.21509 20.6402 3.34094 18.6668 2.02236ZM18.1113 21.1462C16.3023 22.3549 14.1756 23 12 23C9.08261 23 6.28472 21.8411 4.22182 19.7782C2.15892 17.7153 0.999994 14.9174 0.999994 12C0.999994 9.82441 1.64513 7.69767 2.85383 5.88873C4.06252 4.07979 5.78049 2.66989 7.79048 1.83733C9.80046 1.00476 12.0122 0.786924 14.146 1.21136C16.2798 1.6358 18.2398 2.68345 19.7782 4.22183C21.3165 5.7602 22.3642 7.72022 22.7886 9.85401C23.2131 11.9878 22.9952 14.1995 22.1627 16.2095C21.3301 18.2195 19.9202 19.9375 18.1113 21.1462ZM8.60999 15.4L7.89999 16.11L3.79 12L7.89999 7.89001L8.60999 8.60002L5.70999 11.5H20V12.5H5.70999L8.60999 15.4Z" fill="#0B193D" />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)" />
                    </clipPath>
                </defs>
            </svg>

        </button>
    )
}

export default BackModalBtn

import React from 'react'
import styles from "./Slider.module.css"

type propsType = {
    onClick: () => void;
    isActive?: boolean;
    src: string;
}

function SliderThumb({onClick, isActive, src}: propsType) {
    return (
        <img className={`${styles.thumb} ${isActive ? styles.activeThumb : ""}`} src={src} onClick={onClick} />
    )
}

export default SliderThumb

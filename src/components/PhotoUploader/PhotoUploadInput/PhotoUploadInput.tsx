import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import styles from "./PhotoUploadInput.module.css"

type propsType = {
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

function PhotoUploadInput({ onChange }: propsType) {
    const generatedId = String(Math.random())

    return (
        <label htmlFor={generatedId} className={styles.label}>
            <input id={generatedId} type="file" className={styles.input} onChange={onChange} multiple />
         </label>
    )
}

export default PhotoUploadInput

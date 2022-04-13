import { nanoid } from '@reduxjs/toolkit'
import { Input as AntdInput } from 'antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./Input.module.css"

type propsType = {
    placeholder?: string;
    label?: string;
    name?: string;
    containerClassNames?: string;
    isWhite?: boolean;
    classNames?: string;
    allowClear?: boolean;
    isRequired?: boolean;
    disabled?: boolean;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    value?: string;
}

function Input({ placeholder, label, name, containerClassNames, isWhite, classNames, allowClear, isRequired, disabled, onChange, defaultValue,value }: propsType) {
    const generatedId = nanoid()
    return (
        <div className={`${styles.container} ${containerClassNames || ""}`}>
        {label ? 
        <label htmlFor={generatedId} className={`${styles.label}  ${isWhite ? styles.labelWhite : ""}`}>
            <span className={typoEnum.typo_12_14_500}>{label}</span>
            {isRequired && <span className={`${styles.required} ${typoEnum.typo_12_14_400}`}>(Обязательно)</span>}
        </label> : ""}
            <AntdInput
                disabled={disabled}
                name={name}
                placeholder={placeholder}
                id={generatedId}
                className={`${styles.input} ${isWhite ? styles.inputWhite : ""} ${classNames || ""}`}
                allowClear={allowClear}
                onChange={onChange}
                defaultValue={defaultValue}
                value={value}
            />
    </div>
    )
}

export default Input

import React from 'react'
import { Form, InputNumber as FInputNumber } from 'formik-antd'
import styles from "./InputNumber.module.css"
import { typoEnum } from 'styles/typo'

type propsType = {
    label?: string;
    name: string;
    placeholder?: string;
    className?: string;
    isRequired?: boolean;
    isFast?: boolean;
}

function InputNumber({label, name, placeholder, className, isRequired, isFast = true}: propsType) {
    return (
        <div className={`${className || ""} ${styles.container}`}>
            <Form.Item name={name}>
               {label ? 
                <label  className={`${styles.label} label`}>
                    <span className={typoEnum.typo_12_14_500}>{label}</span>
                    {isRequired && <span className={`${styles.required} ${typoEnum.typo_12_14_400}`}>(Обязательно)</span>}
                </label> : ""}
                <FInputNumber name={name} min={0} placeholder={placeholder} className={styles.input} fast={isFast} /> 
            </Form.Item>
        </div>
    )
}

export default InputNumber

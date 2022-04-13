import { Form, Input } from 'formik-antd'
import React from 'react'
import styles from "./Input.module.css"

type propsType = {
    placeholder?: string;
    label?: string;
    name: string;
    containerClassNames?: string;
    isWhite?: boolean;
    visibilityToggle?: boolean
}

function FormikPassword({ placeholder, label, name, containerClassNames, isWhite, visibilityToggle }: propsType) {
    const generatedId = String(Math.random())

    return (
        <div className={`${styles.container} ${containerClassNames||""}`}>
            {label ? <label htmlFor={generatedId} className={`${styles.label} ${isWhite ? styles.labelWhite : ""}`}>{label}</label> : ""}
            <Form.Item name={name}>
                <Input.Password  visibilityToggle={visibilityToggle} name={name} placeholder={placeholder} id={generatedId} className={`${styles.input} ${isWhite ? styles.inputWhite : ""}`} />
            </Form.Item>
        </div>

    )
}

export default FormikPassword

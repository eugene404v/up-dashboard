import { Form, Input } from 'formik-antd'
import { Input as AntdInput } from 'antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./TextArea.module.css"



type propsType = {
    label?: string;
    placeholder?: string;
    maxLength?: number;
    value?: string;
    disabled?: boolean;
    className?: string;
    isFast?: boolean;
}

function TextArea({ label, placeholder, maxLength = 1000, value, disabled, className, isFast = true }: propsType) {
    const [val, setVal] = React.useState(value || "")
    return (
        <div className={`${styles.container} ${className || ""}`}>
                {label && <label className={`${styles.label} ${typoEnum.typo_12_14_500}`}>{label}</label>}
                    <AntdInput.TextArea className={styles.textarea} autoSize onChange={e => setVal(e.target.value)} placeholder={placeholder} disabled={disabled} value={value} />
                {!disabled && <span className={styles.counter}>{val.length}/{maxLength}</span>}
        </div>
    )
}

export default TextArea

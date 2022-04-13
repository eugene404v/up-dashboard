import { nanoid } from '@reduxjs/toolkit'
import { Input as InputType } from 'antd'
import { Form, Input } from 'formik-antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./Input.module.css"

type propsType = {
    placeholder?: string;
    label?: string;
    name: string;
    containerClassNames?: string;
    isWhite?: boolean;
    classNames?: string;
    allowClear?: boolean;
    isRequired?: boolean;
    disabled?: boolean;
    onClear?: (v: any) => void;
    isFast?: boolean;
}

function FormikInput({ placeholder, label, name, containerClassNames, isWhite, classNames, allowClear, isRequired, disabled, onClear, isFast = true }: propsType) {
    const generatedId = "a" + nanoid()
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [inputValue, setInputValue] = React.useState("")

    React.useEffect(() => {
        if (!allowClear || !containerRef || !onClear) return 
        const input = containerRef.current?.querySelector(`.${generatedId}`)
        const clearButton = input?.querySelector(".ant-input-clear-icon")
        if (inputValue) {
            clearButton?.addEventListener("click", onClear)
        } 
        return () => {
            clearButton?.removeEventListener("click", onClear)
        }
    }, [inputValue, onClear, allowClear, containerRef])

    return (
        <div className={`${styles.container} ${containerClassNames || ""}`} ref={containerRef}>
            {label ? 
            <label htmlFor={generatedId} className={`${styles.label}  ${isWhite ? styles.labelWhite : ""}`}>
                <span className={typoEnum.typo_12_14_500}>{label}</span>
                {isRequired && <span className={`${styles.required} ${typoEnum.typo_12_14_400}`}>(Обязательно)</span>}
            </label> : ""}
            <Form.Item name={name}>
                <Input
                    disabled={disabled}
                    name={name}
                    placeholder={placeholder}
                    id={generatedId}
                    className={`${styles.input} ${isWhite ? styles.inputWhite : ""} ${classNames || ""} ${generatedId}`}
                    allowClear={allowClear}
                    onChange={(e) => setInputValue(e.target.value)}
                    fast={isFast}
                />
            </Form.Item>
        </div>

    )
}

export default FormikInput

import { Form, Input } from 'formik-antd'
import { Input as AntdInput } from 'antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./TextArea.module.css"



type propsType = {
    label?: string;
    placeholder?: string;
    name: string;
    maxLength?: number;
    value?: string;
    disabled?: boolean;
    className?: string;
    isFast?: boolean;
}

function FormTextArea({ label, placeholder, name, maxLength = 1000, disabled, className, isFast = true }: propsType) {
    const [val, setVal] = React.useState("")
    const inputRef = React.useRef<any>()

    React.useEffect(() => {
        setVal(inputRef.current?.resizableTextArea?.props?.value||"")
    }, [])

    return (
        <div className={`${styles.container} ${className || ""}`}>
            <Form.Item name={name} >
                {label && <label className={`${styles.label} ${typoEnum.typo_12_14_500}`}>{label}</label>}
                <Input.TextArea name={name} className={styles.textarea} autoSize onChange={e => setVal(e.target.value)} placeholder={placeholder} disabled={disabled} fast={isFast} ref={inputRef} />
                <span className={styles.counter}>{val.length}/{maxLength}</span>
            </Form.Item>
        </div>
    )
}

export default FormTextArea

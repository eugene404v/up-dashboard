import { InputNumber } from 'formik-antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./FormikCounter.module.css"

type propsType = {
    label?: string;
    name: string;
    className?: string;
    isFast?: boolean;
}

function FormikCounter({label, name, className, isFast = true}: propsType) {
    return (
        <div className={`${styles.container} ${className||""}`}>
            {label && <p className={`label ${typoEnum.typo_12_14_500}`}>{label}</p>}
            <InputNumber name={name} min={0} fast={isFast} />
        </div>
    )
}

export default FormikCounter

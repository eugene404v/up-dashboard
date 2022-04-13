import { RadioChangeEvent } from 'antd'
import { Radio } from 'formik-antd'
import React from 'react'
import styles from "./Radio.module.css"

type propsType = {
    values: Array<valuesType>;
    name: string;
    onChange?: (e: RadioChangeEvent) => void;
    classNameContainer?: string;
    classNameLabel?: string;
    classNameGroup?: string;
}

type valuesType = {
    value: string | number;
    label: string;
    counter?: number;
}

function FormikRadioGroup({ values, name, onChange, classNameContainer, classNameLabel, classNameGroup }: propsType) {
    return (
        <Radio.Group name={name} onChange={onChange} className={classNameGroup}>
            {Array.isArray(values) && values.map(el => (
            <label className={`${styles.container} ${classNameContainer||""}`} key={el.value}>
                <Radio name={name} value={el.value} />
                <p className={`${styles.label} ${classNameLabel||""}`}>{el.label}</p>
                {el.counter && <span className={`${styles.counter}`}>{el.counter}</span>}
            </label>))}
        </Radio.Group>
    )
}

export default FormikRadioGroup

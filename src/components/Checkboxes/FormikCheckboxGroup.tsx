import { Checkbox as FCheckbox } from 'formik-antd'
import React from 'react'
import styles from "./Checkbox.module.css"

export type CheckboxValueType = string | boolean | number

type propsType = {
    values: Array<valuesType>;
    name: string;
    onChange?: (vals: CheckboxValueType[]) => void;
}

type valuesType = {
    value: string;
    label: string;
    counter?: number;
}

function FormikCheckboxGroup({ values, name, onChange }: propsType) {


    return (
        <FCheckbox.Group name={name} onChange={onChange}>
            {Array.isArray(values) && values.map(el => (
            <label className={styles.label} key={el.value}>
                <FCheckbox name={name} value={el.value} />
                <p className={`${styles.span}`}>{el.label}</p>
                {el.counter && <span className={`${styles.counter}`}>{el.counter}</span>}
            </label>))}
        </FCheckbox.Group>
    )
}

export default FormikCheckboxGroup

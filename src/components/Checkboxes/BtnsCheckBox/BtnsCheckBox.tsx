import { Checkbox as FCheckbox } from 'formik-antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./BtnsCheckBox.module.css"

export type CheckboxValueType = string | boolean | number

type propsType = {
    values: Array<valuesType>;
    name: string;
    onChange?: (vals: CheckboxValueType[]) => void;
}

type valuesType = {
    id: string|number;
    name: string;
    counter?: number;
}

function BtnsCheckboxGroup({ values, name, onChange }: propsType) {


    return (
        <FCheckbox.Group name={name} onChange={onChange} className={styles.list}>
            {Array.isArray(values) && values.map(el => (
            <label className={styles.label} key={el.id}>
                <FCheckbox name={name} value={el.id} className={styles.check} />
                <p className={`${styles.span} ${typoEnum.typo_14_17_500}`}>{el.name}</p>
                {el.counter && <span className={`${styles.counter}`}>{el.counter}</span>}
            </label>))}
        </FCheckbox.Group>
    )
}

export default BtnsCheckboxGroup

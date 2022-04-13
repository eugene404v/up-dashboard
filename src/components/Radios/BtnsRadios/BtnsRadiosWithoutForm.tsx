import { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./BtnsRadios.module.css"

export type CheckboxValueType = string | boolean | number

type propsType = {
    values: Array<valuesType>;
    name: string;
    onChange?: (e: RadioChangeEvent) => void;
    classNameContainer?: string;
    classNameLabel?: string;
    classNameGroup?: string;
    isWide?: boolean;
}

type valuesType = {
    value: string | number;
    label: string;
    counter?: number;
}
function BtnsRadiosWithoutForm({ values, name, onChange, classNameContainer, classNameLabel, classNameGroup, isWide }: propsType) {


    return (
        <Radio.Group name={name} onChange={onChange} className={isWide ? styles.listWide : styles.list}>
            {Array.isArray(values) && values.map(el => (
                <label className={`${styles.container} ${classNameContainer || ""} ${isWide ? styles.spanWide : ""}`} key={el.value}>
                    <Radio name={name} value={el.value} className={styles.check} />
                    <p className={`${styles.span} ${!isWide ? typoEnum.typo_14_17_500 : typoEnum.typo_14_17_400} ${classNameLabel || ""}`}>{el.label}</p>
                    {el.counter && <span className={`${styles.counter}`}>{el.counter}</span>}
                </label>))}
        </Radio.Group>
    )
}

export default BtnsRadiosWithoutForm
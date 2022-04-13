import { Form, Select } from 'formik-antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import { selectDataType } from 'types/utilTypes'
import { bodyScrollSwitcher } from 'utils/helpers/bodyNoScroll'
import styles from "./Select.module.css"

type propsType = {
    name: string;
    data: selectDataType[];
    placeholder?: string;
    label?: string;
    className?: string;
    isRequired?: boolean;
    allowSearch?: boolean;
    disabled?: boolean;
    onChange?: (val: number|string) => void;
    isFast?: boolean;
}

function FormikSelect({ name, data, placeholder, label, className, isRequired, allowSearch, disabled, onChange, isFast }: propsType) {
    return (
        <div className={`${styles.container} ${className||""}`}>
            {label ? 
            <label className={`${styles.label} label`}>
                <span className={typoEnum.typo_12_14_500}>{label}</span>
                {isRequired && <span className={`${styles.required} ${typoEnum.typo_12_14_400}`}>(Обязательно)</span>}
            </label> : ""}
            <Form.Item name={name}>
                <Select
                    name={name}
                    placeholder={placeholder}
                    className={`${styles.picker}`}
                    onDropdownVisibleChange={bodyScrollSwitcher}
                    suffixIcon={false}
                    showSearch={allowSearch}
                    disabled={disabled}
                    onChange={onChange}
                    fast={isFast}
                >
                    {Array.isArray(data) && data.map(el => <Select.Option value={el.id} key={el.id} className={styles.item} >{el.name}</Select.Option>)}
                </Select>
            </Form.Item>

        </div>
    )
}

export default FormikSelect

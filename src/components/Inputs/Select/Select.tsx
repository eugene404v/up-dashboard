import { Select as AntdSelect } from 'antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import { selectDataType } from 'types/utilTypes'
import { bodyScrollSwitcher } from 'utils/helpers/bodyNoScroll'
import styles from "./Select.module.css"

type propsType = {
    data: selectDataType[];
    placeholder?: string;
    label?: string;
    className?: string;
    isRequired?: boolean;
    allowSearch?: boolean;
    onSelect?: (val: number | string) => void;
}

function Select({ data, placeholder, label, className, isRequired, allowSearch, onSelect }: propsType) {
    return (
        <div className={`${styles.container} ${className||""}`}>
            {label ? 
            <label className={`${styles.label} label`}>
                <span className={typoEnum.typo_12_14_500}>{label}</span>
                {isRequired && <span className={`${styles.required} ${typoEnum.typo_12_14_400}`}>(Обязательно)</span>}
            </label> : ""}
                <AntdSelect
                    placeholder={placeholder}
                    className={`${styles.picker}`}
                    onDropdownVisibleChange={bodyScrollSwitcher}
                    suffixIcon={false}
                    showSearch={allowSearch}
                    onChange={onSelect}
                >
                    {Array.isArray(data) && data.map(el => <AntdSelect.Option value={el.id} key={el.id} className={styles.item} >{el.name}</AntdSelect.Option>)}
                </AntdSelect>

        </div>
    )
}

export default Select

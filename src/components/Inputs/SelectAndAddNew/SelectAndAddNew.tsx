import React from 'react'
import { selectDataType } from 'types/utilTypes'
import FormikSelect from '../Select/FormikSelect'
import styles from "./SelectAndAddNew.module.css"

type propsType = {
    name: string;
    className?: string;
    data: selectDataType[];
    isRequired?: boolean;
    placeholder?: string;
    label?: string;
    onClick?: (e: React.MouseEvent) => void;
    btnText: string;
    onChange?: (val: number|string) => void;
    isFast?: boolean;
}

function SelectAndAddNew({ name, className, data, label, placeholder, isRequired, onClick, btnText, onChange, isFast = true }: propsType) {
    return (
        <div className={`${styles.container} ${className || ""}`}>
            <FormikSelect name={name} data={data} label={label} placeholder={placeholder} isRequired={isRequired} onChange={onChange} isFast={isFast} />
            <button className={`${styles.btn} ${label?styles.btnDown:""}`} onClick={onClick}>
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.75 0.799805H5.25V6.0498H0V7.54981H5.25V12.7998H6.75V7.54981H12V6.0498H6.75V0.799805Z" fill="#0B193D" />
                </svg>
                {btnText}
            </button>
        </div>
    )
}

export default SelectAndAddNew

import { DatePicker } from 'formik-antd'
import moment from 'moment'
import React from 'react'
import styles from "./FormikCalenDar.module.css"

type propsType = {
    name: string;
    placeholder?: string;
    onChange?: (v: moment.Moment|null, str: string) => void
}


function FormikCalendar({ name, placeholder, onChange }: propsType) {
    return (
        <DatePicker
            allowClear={false}
            picker="date"
            name={name}
            placeholder={placeholder}
            className={styles.calendar}
            dropdownClassName={styles.dropDown}
            suffixIcon={false}
            format="DD.MM.YYYY"
            disabledDate={(date) => date.isBefore(moment().add(-1, 'days'))}
            onChange={onChange}
        />
    )
}

export default FormikCalendar

import Button from 'components/Buttons/Button'
import FormikInput from 'components/Inputs/FormikInput'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import styles from "./SearchBar.module.css"

type propsType = {
    search: string;
    onSubmit: (v: searchBarValuesType) => void;
}

export type searchBarValuesType = {
    search: string
}

function SearchBar({ onSubmit, search }: propsType) {
    return (
        <div className={styles.bg}>
            <Formik initialValues={{ search: search }} onSubmit={onSubmit}>
                <Form autoComplete="off">
                    <div className={styles.container}>
                        <FormikInput name="search" isWhite placeholder="Поиск" classNames={styles.input} containerClassNames={styles.inputContainer} allowClear onClear={onSubmit} />
                        <Button text="Найти" size="large" color="orange" additionalClassNames={styles.submit} />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchBar

import Button from 'components/Buttons/Button'
import FormikInput from 'components/Inputs/FormikInput'
import FormikPassword from 'components/Inputs/FormikPassword'
import Modal from 'components/Modals/Modal'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import { createUserType } from 'types/reduxTypes/adminTypes'
import styles from "./CreateUserModal.module.css"

type propTypes = {
    onClose: () => void;
    onSubmit: (value: createUserType) => void;
}

function CreateUserModal({onClose, onSubmit}: propTypes) {
    return (
        <Modal title="Создать аккаунт" onClose={onClose}>
            <Formik initialValues={{login: "", password: "", role: ""}} onSubmit={onSubmit}>
                <Form className={styles.flex}>
                    <FormikInput name="login" label="Логин" placeholder="Введите имя" containerClassNames={styles.input} />
                    <FormikInput name="role" label="Роль" placeholder="Выберите роль" containerClassNames={styles.input} />
                    <FormikPassword name="password" label="Пароль" placeholder="Введите пароль" containerClassNames={styles.input} />
                    <Button text="Сохранить" additionalClassNames={styles.btn} />
                </Form>
            </Formik>
        </Modal>
    )
}

export default CreateUserModal

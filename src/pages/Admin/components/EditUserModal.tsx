import Button from 'components/Buttons/Button'
import FormikInput from 'components/Inputs/FormikInput'
import Modal from 'components/Modals/Modal'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import { createUserType } from 'types/reduxTypes/adminTypes'
import { profileRolesEnum } from 'types/reduxTypes/profileTypes'
import styles from "./CreateUserModal.module.css"

type propTypes = {
    onClose: () => void;
    onSubmit: (value: createUserType, id: number) => void;
    login: string;
    role: profileRolesEnum;
    id: number;
}

function EditUserModal({onClose, onSubmit, login, role, id}: propTypes) {
    return (
        <Modal title="Редактировать аккаунт" onClose={onClose}>
            <Formik initialValues={{login: login, password: "", role: role}} onSubmit={(vals) => onSubmit(vals, id)}>
                <Form className={styles.flex}>
                    <FormikInput name="login" label="Логин" placeholder="Введите имя" containerClassNames={styles.input} />
                    <FormikInput name="role" label="Роль" placeholder="Выберите роль" containerClassNames={styles.input} />
                    <FormikInput name="password" label="Пароль" placeholder="Введите пароль" containerClassNames={styles.input} />
                    <Button text="Сохранить" additionalClassNames={styles.btn} />
                </Form>
            </Formik>
        </Modal>
    )
}

export default EditUserModal

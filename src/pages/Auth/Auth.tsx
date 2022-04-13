import Button from 'components/Buttons/Button'
import FormikInput from 'components/Inputs/FormikInput'
import FormikPassword from 'components/Inputs/FormikPassword'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import styles from "./Auth.module.css"
import * as Yup from 'yup';
import { useAppDispatch } from 'redux/hooks'
import { setIsAuth, signIn } from 'redux/ducks/auth/authSlice'
import { signInType } from 'types/reduxTypes/authTypes'

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Логин слишком короткий')
        .max(50, 'Логин слишком длинный')
        .required('Введите логин'),
    password: Yup.string()
        .min(2, 'Пароль слишком короткий')
        .max(50, 'Пароль слишком длинный')
        .required('Введите пароль')
});

function Auth() {
    const dispatch = useAppDispatch()

    const onSubmit = (vals: signInType) => {
        dispatch(signIn(vals))
    }

    return (
        <div className={styles.bg}>
            <section className={styles.modal}>
                <h1 className={`${styles.title} typo-32-38-700`}>Вход</h1>
                <div className={styles.container}>
                    <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit} validationSchema={SignupSchema} >
                        {({ errors, touched }) => (<Form className={styles.flex}>
                            <FormikInput isWhite name="email" label="Логин" placeholder="Введите имя" containerClassNames={styles.input} />
                            <FormikPassword visibilityToggle isWhite name="password" label="Пароль" placeholder="Введите пароль" containerClassNames={styles.input} />
                            <Button text="Войти" additionalClassNames={styles.btn} size="wide" color="orange" />
                        </Form>)}
                    </Formik>
                </div>
            </section>
        </div>
    )
}

export default Auth

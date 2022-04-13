import React from 'react'
import Modal from 'components/Modals/Modal'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import FormikInput from 'components/Inputs/FormikInput'
import styles from "./AddProducerModal.module.css"
import Button from 'components/Buttons/Button'
import * as Yup from 'yup';
import { requiredStringSchema } from 'utils/validationSchemas/atoms/requiredStringSchema'
import { useCreateJetManufacturerMutation } from 'redux/ducks/manufacturers/manufacturersQuery'

type propsType = {
    onClose: (e: React.MouseEvent) => void;
    onBack?: () => void;
}

const validationSchema = Yup.object().shape({name: requiredStringSchema})

function AddJetProducerModal({onClose, onBack}: propsType) {
    const [createJetManufacturer, result] = useCreateJetManufacturerMutation()

    const submitHandler = (vals:{name: string}) => {
        createJetManufacturer(vals.name)
    }

    React.useEffect(() => {
        result.isSuccess && onBack && onBack()
    }, [result])

    return (
        <Modal title="Добавить производителя" onClose={onClose} onBack={onBack}>
            <Formik onSubmit={submitHandler} initialValues={{name: ""}} validationSchema={validationSchema}>
                {({values}) => <Form autoComplete="off">
                    <FormikInput name="name" label="Название" placeholder="Введите название" isRequired />
                    <Button text="Добавить" additionalClassNames={styles.btn} disabled={result.isLoading} />
                </Form>}
            </Formik>
        </Modal>
    )
}

export default AddJetProducerModal

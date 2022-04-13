import Button from 'components/Buttons/Button'
import FormikInput from 'components/Inputs/FormikInput'
import FormikSelect from 'components/Inputs/Select/FormikSelect'
import Select from 'components/Inputs/Select/Select'
import InputNumber from 'components/Inputs/InputNumber/InputNumber'
import TextArea from 'components/Inputs/TextArea/TextArea'
import Modal from 'components/Modals/Modal'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { typoEnum } from 'styles/typo'
import { marinaType } from 'types/entitiesTypes/marinasTypes'
import * as Yup from 'yup';
import styles from "./AddAirport.module.css"
import { useCreateAirportMutation } from 'redux/ducks/airports/airportsApi'
import { airportCreateData } from 'types/entitiesTypes/airportTypes'
import { useGetCitiesQuery, useGetCountriesQuery } from 'redux/ducks/locations/locationsApi'
import FormTextArea from 'components/Inputs/TextArea/FormTextArea'

type propsType = {
    onClose: (e?: React.MouseEvent) => void;
    onBack: () => void;
}

const initialvalues:marinaType = {
    name: "",
    about: "",
    address: "",
    city: null,
    locationNote: "",
    locationLat: null,
    locationLon: null
}

function AddAirport({ onBack, onClose }: propsType) {
    const [country, setCountry] = React.useState<number|null>(null)
    const {data:cities} = useGetCitiesQuery(country)
    const {data: countries} = useGetCountriesQuery()
    const [createAirport, createAirportResult] = useCreateAirportMutation()

    const countriesHandler = (val: string|number) => {
        setCountry(val as number)
    }

    const submitHandler = (values: airportCreateData) => {
        createAirport({ ...values, about: "test" } as airportCreateData)
    }

    React.useEffect(() => {
        createAirportResult.isSuccess && onBack()
    }, [createAirportResult])

    return (
        <Modal onClose={onClose} title="Добавить аэропорт" classnames={styles.modal} onBack={onBack}>
            <Formik onSubmit={submitHandler} initialValues={initialvalues as airportCreateData}>
                {({ values, errors }) => <Form autoComplete="off">
                    <div className={styles.wrapper}>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Общее</h3>
                        <FormikInput name="name" isRequired label="Название" placeholder="Введите название" containerClassNames={styles.input} />
                        <Select isRequired label="Страна" placeholder="Выберите страну" data={countries||[]} className={styles.input} onSelect={countriesHandler} />
                        <FormikSelect disabled={!country} name="city" isRequired label="Город" placeholder={!country?"Сначала выберите страну":"Выберите город"} data={cities||[]} className={styles.input} />
                        <InputNumber name="locationLat" isRequired label="Широта" placeholder="Введите широту" className={styles.input} />
                        <InputNumber name="locationLon" isRequired label="Долгота" placeholder="Введите долготу" className={styles.input} />
                        <FormikInput name="address" isRequired label="Адрес" placeholder="Введите адрес" containerClassNames={styles.address} />
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Как добраться</h3>
                        <FormTextArea name="locationNote" placeholder="Введите описание" maxLength={1000} />
                        <div className={styles.btns}>
                            <Button text="Добавить"/>
                        </div>
                    </div>
                </Form>}
            </Formik>

        </Modal>
    )
}

export default AddAirport

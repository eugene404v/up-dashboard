import { RadioChangeEvent } from 'antd'
import FormikRadioGroup from 'components/Radios/FormikRadioGroup'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import { requestsEnum, requestsTypesEnum } from 'types/requestsTypes'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import styles from "./Filter.module.css"

type propsType = {
    onSwitchCategirie: (e: RadioChangeEvent) => void;
    onSwitchRequestType: (e: RadioChangeEvent) => void;
}

function FilterRequests({onSwitchCategirie, onSwitchRequestType}: propsType) {

    return (
        <section className={styles.filter}>
            <h2 className={`${styles.title} ${typoEnum.typo_20_24_500}`}>Фильтр</h2>
            <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Транспорт</h3>
            <Formik initialValues={{vehicleType: vehiclesCategoriesEnum.yacht}} onSubmit={(v) => console.log(v.vehicleType)}>
                <Form>
                    <FormikRadioGroup onChange={onSwitchCategirie} name="vehicleType" values={[{
                        value: vehiclesCategoriesEnum.yacht,
                        label: "Яхты"
                    }, {
                        value: vehiclesCategoriesEnum.jet,
                        label: "Самолеты"
                    }]}
                    classNameGroup={styles.radios}
                    />
                </Form>
            </Formik>
            <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Статус</h3>
            <Formik initialValues={{requestType: requestsTypesEnum.pending}} onSubmit={(v) => console.log(v)}>
                <Form>
                    <FormikRadioGroup onChange={onSwitchRequestType} name="requestType" values={[{
                        value: requestsTypesEnum.pending,
                        label: requestsEnum.pending
                    }, {
                        value: requestsTypesEnum.accepted,
                        label: requestsEnum.accepted
                    }, {
                        value: requestsTypesEnum.archived,
                        label: requestsEnum.archived
                    }]}
                    classNameGroup={`${styles.radios} ${styles.radiosLast}`}
                    />
                </Form>
            </Formik>
        </section>
    )
}

export default FilterRequests

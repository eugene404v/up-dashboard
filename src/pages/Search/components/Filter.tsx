import { RadioChangeEvent } from 'antd'
import FilterSelect from 'components/FilterSelect/FilterSelect'
import FormikRadioGroup from 'components/Radios/FormikRadioGroup'
import { Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import { typoEnum } from 'styles/typo'
import { vehiclesByCountry } from 'types/entitiesTypes/entitiesType'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import styles from "./Filter.module.css"

type propsType = {
    onSwitchCategirie: (e: RadioChangeEvent) => void;
    onSelectRegion: (ids: number[]) => void;
    onClearRegion: () => void;
    allRegions: vehiclesByCountry[];//TODO
    selectedRegionsIds: number[]; 
}

function Filter({onSwitchCategirie, onClearRegion, onSelectRegion, allRegions, selectedRegionsIds}: propsType) {
    
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
            <FilterSelect onSelect={onSelectRegion} onClear={onClearRegion} title="Регион" data={allRegions} selectedIds={selectedRegionsIds} />
        </section>
    )
}

export default Filter

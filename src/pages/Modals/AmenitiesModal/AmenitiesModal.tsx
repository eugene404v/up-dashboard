import React from 'react'
import styles from "./AmenitiesModal.module.css"
import Modal from 'components/Modals/Modal'
import Input from 'components/Inputs/Input'
import { selectDataType } from 'types/utilTypes'
import AmenitiesItem from "./AmenitiesItem"
import { useCreateYachtAmenityMutation } from 'redux/ducks/amenities/amenitiesApi'
import { amenitiesJetTypeEnum, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'

type propsType = {
   title?: string;
   data: selectDataType[];
   selectedData: number[];
   onSelect: (id: number) => void;
   onDeselect: (id: number, type: amenitiesYachtTypeEnum) => void;
   onClose: () => void;
   type: amenitiesYachtTypeEnum & amenitiesJetTypeEnum;
}

function AmenitiesModal({ title = "Удобства / Оборудование", data, selectedData, onClose, onDeselect, onSelect, type}: propsType) {
    const [filteredData, setFilteredData] = React.useState(data)
    const [inputValue, setInputValue] = React.useState("")
    const [ createAmenity, result ] = useCreateYachtAmenityMutation()

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value)
        setFilteredData(data.filter(el => el.name.toLowerCase().includes(value.toLowerCase())));
    }

    React.useEffect(() => {
        setFilteredData(data)
    }, [data])

    React.useEffect(() => {
        result?.status==="fulfilled" && setInputValue("")
    }, [result?.status])

    return (
        <Modal title={title} onClose={onClose} classnames={styles.modal}>
            <Input placeholder="Поиск" onChange={inputHandler} classNames={styles.input} value={inputValue} />
            {(Array.isArray(filteredData) && !filteredData.length && inputValue) && <button className={`${styles.add}`} onClick={() => createAmenity({name: inputValue, type})} disabled={result?.status==="pending"} >
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.75 0.799805H5.25V6.0498H0V7.54981H5.25V12.7998H6.75V7.54981H12V6.0498H6.75V0.799805Z" fill="#0B193D" />
                </svg>
                Добавить "{inputValue}"
            </button>}
            <ul className={styles.list}>
                {Array.isArray(filteredData) && filteredData.map(el => (
                    <AmenitiesItem key={el.id} id={el.id as number} name={el.name} onDeselect={onDeselect} onSelect={onSelect} isSelected={selectedData.includes(el.id as number)} type={type} />
                ))}
            </ul>
        </Modal>
    )
}

export default AmenitiesModal

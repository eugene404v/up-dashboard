import Button from 'components/Buttons/Button'
import BtnsCheckboxGroup from 'components/Checkboxes/BtnsCheckBox/BtnsCheckBox'
import DeleteRowBtn from 'components/Controls/DeleteRowBtn/DeleteRowBtn'
import FormikCounter from 'components/Inputs/Counter/FormikCounter'
import FormikInput from 'components/Inputs/FormikInput'
import Input from 'components/Inputs/Input'
import InputNumber from 'components/Inputs/InputNumber/InputNumber'
import FormikSelect from 'components/Inputs/Select/FormikSelect'
import SelectAndAddNew from 'components/Inputs/SelectAndAddNew/SelectAndAddNew'
import FormTextArea from 'components/Inputs/TextArea/FormTextArea'
import TextArea from 'components/Inputs/TextArea/TextArea'
import Alert from 'components/Modals/Alert'
import PhotoUploader from 'components/PhotoUploader/PhotoUploader'
import PhotoUploaderForNewCard from 'components/PhotoUploader/PhotoUploaderForNewCard'
import BtnsRadios from 'components/Radios/BtnsRadios/BtnsRadios'
import BtnsRadiosWithoutForm from 'components/Radios/BtnsRadios/BtnsRadiosWithoutForm'
import FormikRadioGroup from 'components/Radios/FormikRadioGroup'
import SliderModal from 'components/Sliders/SliderModal/SliderModal'
import Tags, { tagItemType } from 'components/Tags/Tags'
import { FieldArray, Formik, FastField } from 'formik'
import { Form } from 'formik-antd'
import AmenitiesModal from 'pages/Modals/AmenitiesModal/AmenitiesModal'
import AddMarina from 'pages/Modals/MarinaModal/AddMarina'
import MarinaModal from 'pages/Modals/MarinaModal/MarinaModal'
import AddProducerModal from 'pages/Modals/ProducerModal/AddProducerModal'
import ProducerModal from 'pages/Modals/ProducerModal/ProducerModal'
import React from 'react'
import { useHistory } from 'react-router'
import { useGetYachtAdditionalConditionsQuery } from 'redux/ducks/additionalConditions/additionConditionsApi'
import { useGetYachtAmenitiesQuery } from 'redux/ducks/amenities/amenitiesApi'
import { useCreateYachtCardMutation, useReleaseYachtCardMutation, useUploadYachtPhotosFirstMutation } from 'redux/ducks/card/cardApi'
import { useGetYachtManufacturersQuery } from 'redux/ducks/manufacturers/manufacturersQuery'
import { useGetMarinasQuery } from 'redux/ducks/marinas/marinasQuery'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { typoEnum } from 'styles/typo'
import { amenitiesYachtType, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'
import { marinaTypeForDisplay, marinaTypeWithId } from 'types/entitiesTypes/marinasTypes'
import { paymentTermTypesValues } from 'types/entitiesTypes/paymentTermTypes'
import { unitTypesForDisplay, unitTypesValues } from 'types/entitiesTypes/unitTypes'
import { yachtFullCardForm, yachtAmenitiesType } from 'types/vehicleTypes/cardTypes'
import { skipperLicenseTypesValues } from 'types/vehicleTypes/skipperLicenseTypes'
import { yachtTypesEnum, yachtTypesValues } from 'types/vehicleTypes/yachtTypes'
import { inputFocusHandler } from 'utils/helpers/formInputFocusHandler'
import { getSumFromObjectFields, objectWithNumbers } from 'utils/helpers/sumOfObjectFileds'
import { anyAmenitiesObj, fromAmenitiesObjToIdsArr } from 'utils/mappers/fromObjWithIdToArr'
import { addDraftYachtSchema, addYachtInitialValues, addYachtSchema } from 'utils/validationSchemas/addYachtSchema'
import styles from "./AddCard.module.css"

function AddYacht() {
    const history = useHistory()
    const { data: additionalConditionsData } = useGetYachtAdditionalConditionsQuery()
    const dispatch = useAppDispatch()
    const { data: marinas, isFetching: marinasFetching } = useGetMarinasQuery()
    const { data: manufacturersYacht, isFetching: manufacturersFetching } = useGetYachtManufacturersQuery()
    const [yachtType, setYachtType] = React.useState<string | null>(null)
    const [marinaModal, setMarinaModal] = React.useState(false) 
    const [marinaCreateModal, setMarinaCreateModal] = React.useState(false) 
    const [manufacturersModal, setManufacturersModal] = React.useState(false) 
    const [manufacturersCreateModal, setManufacturersCreateModal] = React.useState(false)
    const [activeMarinaId, setActiveMarinaId] = React.useState<number>(0) 
    const [marinaData, setMarinaData] = React.useState<marinaTypeForDisplay>({} as marinaTypeForDisplay)
    const [isToPublish, setToPublish] = React.useState(true)

    React.useEffect(() => {
        if (activeMarinaId && marinas) {
            const index = marinas.findIndex(el => el.id == activeMarinaId)
            index >= 0 && setMarinaData(marinas[index])
        }
    }, [marinas, activeMarinaId])
    
    // START marina and manufacturers modal
    const marinaModalHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setMarinaModal(prev => !prev);
        setMarinaCreateModal(false)
    }
    
    const marinaCreateModalOpener = () => {
        setMarinaModal(false);
        setMarinaCreateModal(true)
    }
    
    const marinaCreateModalCloser = (e?: React.MouseEvent) => {
        e?.preventDefault();
        setMarinaModal(false);
        setMarinaCreateModal(false)
    }
    
    const marinaModalBackHandler = () => {
        setMarinaModal(true);
        setMarinaCreateModal(false)
    }
    
    const manufacturerModalHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setManufacturersModal(prev => !prev);
    }
    
    const manufacturerCreateModalCloser = (e?: React.MouseEvent) => {
        e?.preventDefault();
        setManufacturersModal(false);
        setManufacturersCreateModal(false)
    }
    
    const manufacturerCreateModalOpener = () => {
        setManufacturersModal(false);
        setManufacturersCreateModal(true)
    }
    
    const manufacturerModalBackHandler = () => {
        setManufacturersModal(true);
        setManufacturersCreateModal(false)
    }
    // END marina and manufacturers modal
    
    //START amenities
    const { data: amenitiesDataEq } = useGetYachtAmenitiesQuery({type: amenitiesYachtTypeEnum.equipment})
    const { data: amenitiesDataSC } = useGetYachtAmenitiesQuery({type: amenitiesYachtTypeEnum.saloonAndCabins})
    const { data: amenitiesDataEt } = useGetYachtAmenitiesQuery({type: amenitiesYachtTypeEnum.entertainment})
    const [amenities, setAmenities] = React.useState<yachtAmenitiesType>({
        [amenitiesYachtTypeEnum.entertainment]: amenitiesDataEt || [],
        [amenitiesYachtTypeEnum.equipment]: amenitiesDataEq || [],
        [amenitiesYachtTypeEnum.saloonAndCabins]: amenitiesDataSC || []
    })
    const [selectedAmenitiesIds, setSelectedAmenitiesIds] = React.useState<number[]>([])
    const [selectedAmenities, setSelectedAmenities] = React.useState<yachtAmenitiesType>({
        [amenitiesYachtTypeEnum.entertainment]: [],
        [amenitiesYachtTypeEnum.equipment]: [],
        [amenitiesYachtTypeEnum.saloonAndCabins]: []
    })
    const [activeAmenitiesType, setActiveAmenitiesType] = React.useState<amenitiesYachtTypeEnum|null>(null)

    React.useEffect(() => {
        setAmenities({
            [amenitiesYachtTypeEnum.entertainment]: amenitiesDataEt || [],
            [amenitiesYachtTypeEnum.equipment]: amenitiesDataEq || [],
            [amenitiesYachtTypeEnum.saloonAndCabins]: amenitiesDataSC || []
        })
    }, [amenitiesDataEq, amenitiesDataSC, amenitiesDataEt])
    
    const selectAmenityHandler = (id: number) => {
        if (!activeAmenitiesType) return
        setSelectedAmenitiesIds(prev => [...prev, id])
        const index = amenities[activeAmenitiesType]?.findIndex(el => el.id == id);
        (amenities[activeAmenitiesType] && typeof index === "number" && amenities[activeAmenitiesType][index]) && setSelectedAmenities(prev => ({
            ...prev,
            [activeAmenitiesType]:[...prev[activeAmenitiesType], amenities[activeAmenitiesType][index as number]]
        }))
    }
    
    const deSelectAmenityHandler = (id: number, type: amenitiesYachtTypeEnum) => {
        const idIndex = selectedAmenitiesIds.indexOf(id)
        const ids = [...selectedAmenitiesIds]
        ids.splice(idIndex, 1)
        setSelectedAmenitiesIds(prev => ids)
        const index = selectedAmenities[type]?.findIndex(el => el.id == id);
        if (index > -1 && selectedAmenities) {
            const items = [...selectedAmenities[type]];
            items.splice(index, 1);
            setSelectedAmenities(prev => ({
                ...prev,
                [type]: items
            }))
        }
    }
    //END amenities

    //START photos
    const [indexOfMainPhoto, setIndexOfMainPhoto] = React.useState(0)
    const makeMainHandler = (index: number) => {
        setIndexOfMainPhoto(index)
    }
    const [photoFiles, setPhotoFiles] = React.useState<File[]>([])
    const [photoUrls, setPhotoUrls] = React.useState<string[]>([])
    const photoUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files as FileList);
        setPhotoFiles(prev => [...prev, ...newFiles].slice(0, 26))
        const newUrls = newFiles.map(el => URL.createObjectURL(el))
        setPhotoUrls(prev => [...prev, ...newUrls].slice(0, 26))
    }
    const photoDeleteHandler = (index: number) => {
        if (index === indexOfMainPhoto) {
            setIndexOfMainPhoto(0)
        }
        const tempFiles = [...photoFiles]
        tempFiles.splice(index, 1)
        const tempUrls = [...photoUrls]
        tempUrls.splice(index, 1)
        setPhotoFiles(tempFiles)
        setPhotoUrls(tempUrls)
    }
    const [indexOfPhotoSlider, setIndexOfPhotoSlider] = React.useState<number|null>(null)
    const openPhotoSliderHandler = (index: number) => {
        setIndexOfPhotoSlider(index)
    }
    const closePhotoSliderHandler = () => {
        setIndexOfPhotoSlider(null)
    }
    //END photos
    
    //START submit
    const publishHandler = () => {
        inputFocusHandler()
        setToPublish(true)
    }

    const draftHandler = () => {
        inputFocusHandler()
        setToPublish(false)
    }

    const [createYacht, createYachtCardResult] = useCreateYachtCardMutation()
    const [releaseYacht, releaseYachtResult] = useReleaseYachtCardMutation()
    const [uploadPhotos, uploadPhotosResult] = useUploadYachtPhotosFirstMutation()
    const submitHandler = (values: yachtFullCardForm) => {
        createYacht({
            type: yachtType as yachtTypesEnum,
            ...values,
            amenities: fromAmenitiesObjToIdsArr(selectedAmenities as anyAmenitiesObj)
        })
    }

    React.useEffect(() => {
        if (createYachtCardResult.isSuccess) {
            photoFiles.length && uploadPhotosResult.isUninitialized && uploadPhotos({photoFiles, indexOfMainPhoto, id: createYachtCardResult.data?.id||0}) 
            if (isToPublish) {
                releaseYacht(createYachtCardResult.data?.id)
            } else {
                (!photoFiles.length||uploadPhotosResult.isSuccess) && history.push(`/yacht/${createYachtCardResult.data?.id}`)
            }
        }
    }, [createYachtCardResult, isToPublish, uploadPhotosResult])

    React.useEffect(() => {
        if (releaseYachtResult.isSuccess && !photoFiles.length) {
            history.push(`/yacht/${createYachtCardResult.data?.id}`)
        } else if (uploadPhotosResult.isSuccess && releaseYachtResult.isSuccess) {
            history.push(`/yacht/${createYachtCardResult.data?.id}`)
        }
    }, [releaseYachtResult, uploadPhotosResult])
    //END submit

    //handle errors
    const [photoError, setPhotoError] = React.useState("");
    React.useEffect(() => {
        if (uploadPhotosResult?.isError) {
            setPhotoError("Не удалось загрузить фото")
        }
    }, [uploadPhotosResult])

    return (
        <>
            <div className={styles.page}>
                <h2 className={`${styles.subtitleNoMt} ${typoEnum.typo_16_19_500}`}>Тип</h2>
                <BtnsRadiosWithoutForm name="yachtType" values={yachtTypesValues} onChange={(e) => setYachtType(e.target.value)} />
                {yachtType !== null && <>
                    <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Фотографии</h2>
                    <PhotoUploaderForNewCard files={photoFiles} indexOfMainPhoto={indexOfMainPhoto} onDelete={photoDeleteHandler} onMakeMain={makeMainHandler} onOpen={openPhotoSliderHandler} onUpload={photoUploadHandler} />
                    <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Общее</h2>
                </>}
                {yachtType !== null && <Formik enableReinitialize onSubmit={submitHandler} initialValues={addYachtInitialValues as any} validationSchema={isToPublish ? addYachtSchema : addDraftYachtSchema}>
                    {({ values, errors }) => <Form autoComplete="off">
                        <div className={styles.row}>
                            <FormikInput name="name" label="Название" isRequired placeholder="Название" containerClassNames={styles.inputLg} />
                        </div>
                        <div className={styles.row}>
                            {!manufacturersFetching && <SelectAndAddNew name="manufacturer" label="Производитель" isRequired placeholder="Выберите проивзодителя" className={styles.inputLg} data={manufacturersYacht||[]} btnText="Добавить проивзодителя" onClick={manufacturerModalHandler} />}
                        </div>
                        <div className={styles.row}>
                            {!marinasFetching && <SelectAndAddNew name="marina" label="Марина" isRequired placeholder="Выберите марину" className={styles.inputLg} data={marinas||[]} btnText="Добавить марину" onClick={marinaModalHandler} onChange={(v) => setActiveMarinaId(v as number)} />}
                        </div>
                        <div className={styles.row}>
                            <Input label="Регион" isRequired placeholder="Сначала выберите марину" containerClassNames={styles.inputMed} disabled value={marinaData?.city?.name} />
                            <Input label="Адрес" isRequired placeholder="Сначала выберите марину" containerClassNames={styles.inputMed} disabled value={marinaData.address} />
                        </div>
                        <div className={styles.row}>
                            <FormikInput name="owner" label="Владелец" isRequired placeholder="Введите имя владельца" containerClassNames={styles.inputLg} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="cost" label="Цена" isRequired placeholder="Введите цену за один день" className={styles.inputMed} />
                            <InputNumber name="discount" label="Скидка" placeholder="Введите скидку в %" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <FormikSelect name="paymentTerm" label="Условия оплаты" placeholder="Условия оплаты" className={styles.inputMed} data={paymentTermTypesValues} />
                            <FormikSelect name="skipperLicenseType" label="Лицензия" placeholder="Лицензия" className={styles.inputMed} data={skipperLicenseTypesValues} />
                        </div>
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Дополнительные условия (не больше 4-х)</h2>
                        <BtnsCheckboxGroup name="additional_conditions" values={additionalConditionsData||[]} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Информация</h2>
                        <div className={styles.row}>
                            <InputNumber name="year_built" label="Год" isRequired placeholder="Введите год" className={styles.inputMed} />
                            <InputNumber name="beam" label="Ширина (м)" isRequired placeholder="Введите метры" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="passengerCount" label="Человек" isRequired placeholder="Введите количество человек" className={styles.inputMed} />
                            <InputNumber name="length" label="Длина (м)" isRequired placeholder="Введите метры" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="toiletCount" label="Туалет" placeholder="Введите количество туалетов" className={styles.inputMed} />
                            <Input label="Каюты" placeholder="Заполнится автоматически" containerClassNames={styles.inputMed} disabled value={String(getSumFromObjectFields(values.cabins as objectWithNumbers)||"Заполнится автоматически")} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="showerCount" label="Душевые" placeholder="Введите количество душевых" className={styles.inputMed} />
                            <InputNumber name="draught" label="Осадка (м)" isRequired placeholder="Введите метры" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="waterTankVolume" label="Бак для воды" placeholder="Введите литры" className={styles.inputMed} />
                            <InputNumber name="engineHP" label="Двигатель (л. с.)" isRequired placeholder="Введите лошадиные силы" className={styles.inputMed} />
                        </div>
                        {yachtType === yachtTypesEnum.sailBoat && <p className={`label ${typoEnum.typo_12_14_500}`}>Грот</p>}
                        {yachtType === yachtTypesEnum.sailBoat && <div className={styles.row}><BtnsRadios isWide name="mainsailType" values={[{ value: "CL", label: "Классический" }, { value: "TW", label: "Скрутка" }]} /></div>}
                        <InputNumber name="fuelTankVolume" label="Топливный бак (л)" isRequired placeholder="Введите количество литров" className={styles.inputMed} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Каюты</h2>
                        <div className={styles.row}>
                            <FormikCounter name="cabins.SI" label="1-спальные кабины" className={styles.counter} />
                            <FormikCounter name="cabins.DB" label="2-спальные кабины" className={styles.counter} />
                            <FormikCounter name="cabins.TB" label="3-спальные кабины" className={styles.counter} />
                            <FormikCounter name="cabins.FB" label="4-спальные кабины" className={styles.counter} />
                        </div>
                        <div className={styles.row}>
                            <FormikCounter name="cabins.SB" label="Спальные места в салоне" className={styles.counter} />
                            <FormikCounter name="cabins.CB" label="Спальные места для экипажа" className={styles.counter} />
                        </div>
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Удобства</h2>
                        <Tags label="Оборудование" items={selectedAmenities[amenitiesYachtTypeEnum.equipment] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesYachtTypeEnum.equipment)} onDelete={deSelectAmenityHandler} type={amenitiesYachtTypeEnum.equipment} />
                        <Tags label="Салон и каюты" items={selectedAmenities[amenitiesYachtTypeEnum.saloonAndCabins] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesYachtTypeEnum.saloonAndCabins)} onDelete={deSelectAmenityHandler} type={amenitiesYachtTypeEnum.saloonAndCabins} />
                        <Tags label="Развлечения" items={selectedAmenities[amenitiesYachtTypeEnum.entertainment] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesYachtTypeEnum.entertainment)} onDelete={deSelectAmenityHandler} type={amenitiesYachtTypeEnum.entertainment} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Описание яхты</h2>
                        <FormTextArea name="about" placeholder="Введите описание" />
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Дополнительные расходы  </h3>
                        <FieldArray name="extra_expenses">
                            {({ insert, remove, push }) => (<>
                                {values.extra_expenses && values.extra_expenses.map((el, i) => <div className={styles.row} key={i}>
                                    <FormikInput label={`Расход ${i + 1}`} name={`extra_expenses.${i}.name`} containerClassNames={styles.inputSm} isRequired />
                                    <InputNumber label="Цена (руб.)" name={`extra_expenses.${i}.price`} className={styles.inputSm} isRequired />
                                    <div className={styles.deleteContainer}>
                                        <FormikSelect label="Параметр" name={`extra_expenses.${i}.unit`} className={styles.inputUnit} data={unitTypesValues} />
                                        <DeleteRowBtn onClick={(e) => {
                                            e.preventDefault()
                                            remove(i)
                                        }
                                        } classNames={styles.delRow} />
                                    </div>
                                </div>)}
                                <Button text="Добавить" onClick={(e) => {
                                    e.preventDefault()
                                    push({ name: "", price: "", unit: "" })
                                }} prefix="plus" additionalClassNames={styles.addRow} />
                            </>)}
                        </FieldArray>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Услуги</h3>
                        <FieldArray name="paid_services">
                            {({ insert, remove, push }) => (<>
                                {values.paid_services && values.paid_services.map((el, i) => <div className={styles.row} key={i}>
                                    <FormikInput label={`Расход ${i + 1}`} name={`paid_services.${i}.name`} containerClassNames={styles.inputSm} isRequired />
                                    <FormikInput label="Цена (руб.)" name={`paid_services.${i}.price`} containerClassNames={styles.inputSm} isRequired />
                                    <div className={styles.deleteContainer}>
                                        <FormikSelect label="Параметр" name={`paid_services.${i}.unit`} className={styles.inputUnit} data={unitTypesValues} />
                                        <DeleteRowBtn onClick={(e) => {
                                            e.preventDefault()
                                            remove(i)
                                        }
                                        } classNames={styles.delRow} />
                                    </div>
                                </div>)}
                                <Button text="Добавить" onClick={(e) => {
                                    e.preventDefault()
                                    push({ name: "", price: "", unit: "" })
                                }} prefix="plus" additionalClassNames={styles.addRow} />
                            </>)}
                        </FieldArray>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Местоположение</h3>
                        <TextArea label="Как добраться" placeholder="Сначала выберите марину" value={marinaData.locationNote} disabled className={styles.textareaBottom} />
                        <TextArea label="Описание от владельца" placeholder="Сначала выберите марину" value={marinaData.about} disabled />
                        <div className={styles.btns}>
                            <Button type="submit" text="В черновик" color="empty" onClick={draftHandler} disabled={createYachtCardResult.isLoading||releaseYachtResult.isLoading} />
                            <Button type="submit" text="Опубликовать" onClick={publishHandler} disabled={createYachtCardResult.isLoading||releaseYachtResult.isLoading} />
                        </div>
                    </Form>}
                </Formik>}
            </div>
            {indexOfPhotoSlider !== null && <SliderModal files={photoUrls} index={indexOfPhotoSlider} onClose={closePhotoSliderHandler} onSlide={()=> void 0} />}
            {marinaModal && <MarinaModal onClose={marinaModalHandler} onOpenAddModal={marinaCreateModalOpener} />}
            {marinaCreateModal && <AddMarina onClose={marinaCreateModalCloser} onBack={marinaModalBackHandler} />}
            {manufacturersModal && <ProducerModal onClose={manufacturerModalHandler} onOpenAddModal={manufacturerCreateModalOpener} />}
            {manufacturersCreateModal && <AddProducerModal onClose={manufacturerCreateModalCloser} onBack={manufacturerModalBackHandler} />}
            {activeAmenitiesType && <AmenitiesModal data={amenities[activeAmenitiesType]||[]} selectedData={selectedAmenitiesIds} onClose={() => setActiveAmenitiesType(null)} onDeselect={deSelectAmenityHandler} onSelect={//@ts-ignore
                selectAmenityHandler} type={activeAmenitiesType as amenitiesYachtTypeEnum} />}
            {photoError && <Alert text={photoError} title="Не удалось загрузить фото" onClose={() => setPhotoError("")} />}
            <br />
        </>
    )
}

export default  React.memo(AddYacht)
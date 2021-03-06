import React from 'react'
import Button from 'components/Buttons/Button'
import BtnsCheckboxGroup from 'components/Checkboxes/BtnsCheckBox/BtnsCheckBox'
import DeleteRowBtn from 'components/Controls/DeleteRowBtn/DeleteRowBtn'
import FormikCounter from 'components/Inputs/Counter/FormikCounter'
import FormikInput from 'components/Inputs/FormikInput'
import InputNumber from 'components/Inputs/InputNumber/InputNumber'
import FormikSelect from 'components/Inputs/Select/FormikSelect'
import TextArea from 'components/Inputs/TextArea/TextArea'
import PhotoUploader from 'components/PhotoUploader/PhotoUploader'
import BtnsRadios from 'components/Radios/BtnsRadios/BtnsRadios'
import BtnsRadiosWithoutForm from 'components/Radios/BtnsRadios/BtnsRadiosWithoutForm'
import FormikRadioGroup from 'components/Radios/FormikRadioGroup'
import Tags, { tagItemType } from 'components/Tags/Tags'
import { FieldArray, Formik } from 'formik'
import { Form } from 'formik-antd'
import { typoEnum } from 'styles/typo'
import styles from "./AddCard.module.css"
import { jetTypesEnum, jetTypesForDisplay, jetTypesValues } from 'types/vehicleTypes/jetTypes/jetTypes'
import { useGetAirportsQuery } from 'redux/ducks/airports/airportsApi'
import SelectAndAddNew from 'components/Inputs/SelectAndAddNew/SelectAndAddNew'
import { jetAmenitiesType, jetFullCardForm } from 'types/vehicleTypes/cardTypes'
import { marinaTypeForDisplay, marinaTypeWithId } from 'types/entitiesTypes/marinasTypes'
import { useGetJetManufacturersQuery } from 'redux/ducks/manufacturers/manufacturersQuery'
import AddJetProducerModal from 'pages/Modals/ProducerModal/AddJetProducerModal'
import JetProducerModal from 'pages/Modals/ProducerModal/JetProducerModal'
import AddAirport from 'pages/Modals/AirportsModal/AddAirport'
import AirportsModal from 'pages/Modals/AirportsModal/AirportsModal'
import Input from 'components/Inputs/Input'
import { paymentTermTypesValues } from 'types/entitiesTypes/paymentTermTypes'
import { useGetJetAdditionalConditionsQuery } from 'redux/ducks/additionalConditions/additionConditionsApi'
import { amenitiesJetTypeEnum, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'
import { useGetJetAmenitiesQuery, useGetYachtAmenitiesQuery } from 'redux/ducks/amenities/amenitiesApi'
import AmenitiesModal from 'pages/Modals/AmenitiesModal/AmenitiesModal'
import JetAmenitiesModal from 'pages/Modals/AmenitiesModal/JetAmenitiesModal'
import { unitTypesValues } from 'types/entitiesTypes/unitTypes'
import { useCreateJetCardMutation, useReleaseJetCardMutation, useUploadJetPhotosFirstMutation } from 'redux/ducks/card/cardApi'
import { anyAmenitiesObj, fromAmenitiesObjToIdsArr } from 'utils/mappers/fromObjWithIdToArr'
import { useHistory } from 'react-router'
import PhotoUploaderForNewCard from 'components/PhotoUploader/PhotoUploaderForNewCard'
import SliderModal from 'components/Sliders/SliderModal/SliderModal'
import FormTextArea from 'components/Inputs/TextArea/FormTextArea'
import Alert from 'components/Modals/Alert'
import { inputFocusHandler } from 'utils/helpers/formInputFocusHandler'

//TODO delete
const initialValues = { name: "", extra_expenses: [], paid_services: [] }
const validationSchema = {}

function AddJet() {
    const history = useHistory()
    const [createDraft, creatingResult] = useCreateJetCardMutation()
    const [releaseCard, releasingResult] = useReleaseJetCardMutation()
    const {data: additionalConditionsData} = useGetJetAdditionalConditionsQuery()
    const {data: airportsData, isFetching: airportsFetching} = useGetAirportsQuery()
    const {data: manufacturers, isFetching: manufacturersFetching} = useGetJetManufacturersQuery()
    const [jetType, setJetType] = React.useState<string|null>(null)
    const [activeAirportId, setActiveAirportId] = React.useState<number>(0) 
    const [airportData, setAirportData] = React.useState<marinaTypeForDisplay>({} as marinaTypeForDisplay)
    const [isToPublish, setToPublish] = React.useState(true)

    React.useEffect(() => {
        if (activeAirportId && airportsData) {
            const index = airportsData.findIndex(el => el.id == activeAirportId)
            index >= 0 && setAirportData(airportsData[index])
        }
    }, [airportsData, activeAirportId])

    //START modals 
    const [marinaModal, setMarinaModal] = React.useState(false) 
    const [marinaCreateModal, setMarinaCreateModal] = React.useState(false) 
    const [manufacturersModal, setManufacturersModal] = React.useState(false) 
    const [manufacturersCreateModal, setManufacturersCreateModal] = React.useState(false)

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
    //END modals

    //START amenities
    const { data: amenitiesDataCo } = useGetJetAmenitiesQuery({type: amenitiesJetTypeEnum.comfort})
    const { data: amenitiesDataEq } = useGetJetAmenitiesQuery({type: amenitiesJetTypeEnum.equipment})
    const [amenities, setAmenities] = React.useState<jetAmenitiesType>({
        [amenitiesJetTypeEnum.comfort]: amenitiesDataCo || [],
        [amenitiesJetTypeEnum.equipment]: amenitiesDataEq || [],
    })
    const [selectedAmenitiesIds, setSelectedAmenitiesIds] = React.useState<number[]>([])
    const [selectedAmenities, setSelectedAmenities] = React.useState<jetAmenitiesType>({
        [amenitiesJetTypeEnum.comfort]: [],
        [amenitiesJetTypeEnum.equipment]: [],
    })
    const [activeAmenitiesType, setActiveAmenitiesType] = React.useState<amenitiesJetTypeEnum|null>(null)

    React.useEffect(() => {
        setAmenities({
            [amenitiesJetTypeEnum.comfort]: amenitiesDataCo || [],
            [amenitiesJetTypeEnum.equipment]: amenitiesDataEq || [],
        })
    }, [amenitiesDataEq, amenitiesDataCo])
    
    const selectAmenityHandler = (id: number) => {
        if (!activeAmenitiesType) return
        setSelectedAmenitiesIds(prev => [...prev, id])
        const index = amenities[activeAmenitiesType]?.findIndex(el => el.id == id);
        (amenities[activeAmenitiesType] && typeof index === "number" && amenities[activeAmenitiesType][index]) && setSelectedAmenities(prev => ({
            ...prev,
            [activeAmenitiesType]:[...prev[activeAmenitiesType], amenities[activeAmenitiesType][index as number]]
        }))
    }
    
    const deSelectAmenityHandler = (id: number, type: amenitiesJetTypeEnum) => {
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
    const [uploadPhotos, uploadPhotosResult] = useUploadJetPhotosFirstMutation()
    const submitHandler = (values: jetFullCardForm) => {
        createDraft({
            type: jetType as jetTypesEnum,
            ...values,
            amenities: fromAmenitiesObjToIdsArr(selectedAmenities as anyAmenitiesObj)
        })
    }
    React.useEffect(() => {
        if (creatingResult.isSuccess) {
            photoFiles.length && uploadPhotosResult.isUninitialized && uploadPhotos({photoFiles, indexOfMainPhoto, id: creatingResult.data?.id||0}) 
            if (isToPublish) {
                releaseCard(creatingResult.data?.id)
            } else {
                (!photoFiles.length||uploadPhotosResult.isSuccess) && history.push(`/jet/${creatingResult.data?.id}`)
            }
        }
    }, [creatingResult, isToPublish, uploadPhotosResult])
    React.useEffect(() => {
        if (releasingResult.isSuccess && !photoFiles.length) {
            history.push(`/jet/${creatingResult.data?.id}`)
        } else if (uploadPhotosResult.isSuccess && releasingResult.isSuccess) {
            history.push(`/jet/${creatingResult.data?.id}`)
        }
    }, [releasingResult, uploadPhotosResult])

    const publishHandler = () => {
        inputFocusHandler()
        setToPublish(true)
    }

    const draftHandler = () => {
        inputFocusHandler()
        setToPublish(false)
    }
    //END submit

    //handle errors
    const [photoError, setPhotoError] = React.useState("");
    React.useEffect(() => {
        if (uploadPhotosResult?.isError) {
            setPhotoError("???? ?????????????? ?????????????????? ????????")
        }
    }, [uploadPhotosResult])

    return (<>
        <div className={styles.page}>
            <h2 className={`${styles.subtitleNoMt} ${typoEnum.typo_16_19_500}`}>??????</h2>
            <BtnsRadiosWithoutForm name="jetType" values={jetTypesValues} onChange={(e)=>setJetType(e.target.value)} />
            {jetType!==null && <>
                <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????????</h2>
                <PhotoUploaderForNewCard files={photoFiles} indexOfMainPhoto={indexOfMainPhoto} onDelete={photoDeleteHandler} onMakeMain={makeMainHandler} onOpen={openPhotoSliderHandler} onUpload={photoUploadHandler} />
                <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>??????????</h2>
            </>}
            {jetType!==null && <Formik onSubmit={submitHandler} initialValues={initialValues as jetFullCardForm}>
                    {({ values }) => <Form autoComplete="off">
                        <div className={styles.row}>
                            <FormikInput name="name" label="????????????????" isRequired placeholder="????????????????" containerClassNames={styles.inputLg} />
                        </div>
                        <div className={styles.row}>
                            {!manufacturersFetching && <SelectAndAddNew name="manufacturer" label="??????????????????????????" isRequired placeholder="???????????????? ??????????????????????????" className={styles.inputLg} data={manufacturers||[]} btnText="???????????????? ??????????????????????????" onClick={manufacturerModalHandler} />}
                        </div>
                        <div className={styles.row}>
                            {!airportsFetching && <SelectAndAddNew name="airport" label="????????????????" isRequired placeholder="???????????????? ????????????????" className={styles.inputLg} data={airportsData||[]} btnText="???????????????? ????????????????" onClick={marinaModalHandler} onChange={(v) => setActiveAirportId(v as number)} />}
                        </div>
                        <div className={styles.row}>
                            <Input label="????????????" isRequired placeholder="?????????????? ???????????????? ????????????????" containerClassNames={styles.inputMed} disabled value={airportData?.city?.name} />
                            <Input label="??????????" isRequired placeholder="?????????????? ???????????????? ????????????????" containerClassNames={styles.inputMed} disabled value={airportData?.address} />
                        </div>
                        <div className={styles.row}>
                            <FormikInput name="owner" label="????????????????" isRequired placeholder="?????????????? ??????????????????" containerClassNames={styles.inputLg} />
                        </div>
                        <div className={styles.row}>
                            <FormikInput name="cost" label="????????" isRequired placeholder="?????????????? ????????" containerClassNames={styles.inputMed} />
                            <FormikInput name="discount" label="????????????" placeholder="?????????????? ????????????" containerClassNames={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <FormikSelect name="paymentTerm" label="?????????????? ????????????" isRequired placeholder="?????????????? ????????????" className={styles.inputLg} data={paymentTermTypesValues} />
                        </div>
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>???????????????????????????? ?????????????? (???? ???????????? 4-??)</h2>
                        <BtnsCheckboxGroup name="additional_conditions" values={additionalConditionsData||[]} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????????</h2>
                        <div className={styles.row}>
                            <InputNumber name="year_built" label="??????" isRequired placeholder="?????????????? ??????" className={styles.inputMed} />
                            <InputNumber name="width" label="???????????? (??)" isRequired placeholder="?????????????? ??????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="passengerCount" label="??????????????????" isRequired placeholder="?????????????? ???????????????????? ????????????????????" className={styles.inputMed} />
                            <InputNumber name="length" label="?????????? (??)" isRequired placeholder="?????????????? ??????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="toiletCount" label="????????????" placeholder="?????????????? ???????????????????? ????????????????" className={styles.inputMed} />
                            <InputNumber name="height" label="???????????? (??)" placeholder="?????????????? ??????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="bedCount" label="??????????????" placeholder="?????????????? ???????????????????? ????????????????" className={styles.inputMed} />
                            <InputNumber name="range" label="?????????????????? (??)" isRequired placeholder="?????????????? ????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="baggageVolume" label="?????????? (??3)" placeholder="?????????????? ?????????? ????????????????????" className={styles.inputMed} />
                            <InputNumber name="speed" label="???????????????? (????/??)" isRequired placeholder="?????????????? ????/??" className={styles.inputMed} />
                        </div>
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????</h2>
                        <Tags label="????????????????????????" items={selectedAmenities[amenitiesJetTypeEnum.equipment] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesJetTypeEnum.equipment)} onDelete={deSelectAmenityHandler as any} type={amenitiesJetTypeEnum.equipment} />
                        <Tags label="??????????????" items={selectedAmenities[amenitiesJetTypeEnum.comfort] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesJetTypeEnum.comfort)} onDelete={deSelectAmenityHandler as any} type={amenitiesJetTypeEnum.comfort} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>???????????????? ????????????????</h2>
                        <FormTextArea name="about" placeholder="?????????????? ????????????????" />
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>???????????????????????????? ??????????????  </h3>
                        <FieldArray name="extra_expenses">
                            {({ insert, remove, push }) => (<>
                                {values.extra_expenses.map((el, i) => <div className={styles.row} key={i}>
                                    <FormikInput label={`???????????? ${i + 1}`} name={`extra_expenses.${i}.name`} containerClassNames={styles.inputSm} isRequired />
                                    <FormikInput label="???????? (??????.)" name={`extra_expenses.${i}.price`} containerClassNames={styles.inputSm} isRequired />
                                    <div className={styles.deleteContainer}>
                                        <FormikSelect label="????????????????" name={`extra_expenses.${i}.unit`} className={styles.inputUnit} data={unitTypesValues} />
                                        <DeleteRowBtn onClick={(e) => {
                                            e.preventDefault()
                                            remove(i)
                                        }
                                        } classNames={styles.delRow} />
                                    </div>
                                </div>)}
                                <Button text="????????????????" onClick={(e) => {
                                    e.preventDefault()
                                    push({ name: "", price: "", unit: "" }
                                    )
                                }} prefix="plus" additionalClassNames={styles.addRow} />
                            </>)}
                        </FieldArray>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????</h3>
                        <FieldArray name="paid_services">
                            {({ insert, remove, push }) => (<>
                                {values.paid_services.map((el, i) => <div className={styles.row} key={i}>
                                    <FormikInput label={`???????????? ${i + 1}`} name={`paid_services.${i}.name`} containerClassNames={styles.inputSm} isRequired />
                                    <FormikInput label="???????? (??????.)" name={`paid_services.${i}.price`} containerClassNames={styles.inputSm} isRequired />
                                    <div className={styles.deleteContainer}>
                                        <FormikSelect label="????????????????" name={`paid_services.${i}.unit`} className={styles.inputUnit} data={unitTypesValues} />
                                        <DeleteRowBtn onClick={(e) => {
                                            e.preventDefault()
                                            remove(i)
                                        }
                                        } classNames={styles.delRow} />
                                    </div>
                                </div>)}
                                <Button text="????????????????" onClick={(e) => {
                                    e.preventDefault()
                                    push({ name: "", price: "", unit: "" }
                                    )
                                }} prefix="plus" additionalClassNames={styles.addRow} />
                            </>)}
                        </FieldArray>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????????????????</h3>
                        <TextArea disabled value={airportData.locationNote} label="?????? ??????????????????" placeholder="?????????????? ???????????????? ????????????????" />
                        <div className={styles.btns}>
                            <Button text="?? ????????????????" color="empty" type="submit" onClick={draftHandler} disabled={creatingResult.isLoading||releasingResult.isLoading} />
                            <Button text="????????????????????????" type="submit" onClick={publishHandler} disabled={creatingResult.isLoading||releasingResult.isLoading} />
                        </div>
                    </Form>}
                </Formik>}
        </div>
        {indexOfPhotoSlider !== null && <SliderModal files={photoUrls} index={indexOfPhotoSlider} onClose={closePhotoSliderHandler} onSlide={()=> void 0} />}
        {marinaModal && <AirportsModal onClose={marinaModalHandler} onOpenAddModal={marinaCreateModalOpener} />}
        {marinaCreateModal && <AddAirport onClose={marinaCreateModalCloser} onBack={marinaModalBackHandler} />}
        {manufacturersModal && <JetProducerModal onClose={manufacturerModalHandler} onOpenAddModal={manufacturerCreateModalOpener} />}
        {manufacturersCreateModal && <AddJetProducerModal onClose={manufacturerCreateModalCloser} onBack={manufacturerModalBackHandler} />}
        {activeAmenitiesType && <JetAmenitiesModal data={amenities[activeAmenitiesType]||[]} selectedData={selectedAmenitiesIds} onClose={() => setActiveAmenitiesType(null)} onDeselect={deSelectAmenityHandler} onSelect={ //@ts-ignore
            selectAmenityHandler} type={activeAmenitiesType as amenitiesJetTypeEnum} />}
        {photoError && <Alert text={photoError} title="???? ?????????????? ?????????????????? ????????" onClose={() => setPhotoError("")} />}
    </>)
}

export default AddJet

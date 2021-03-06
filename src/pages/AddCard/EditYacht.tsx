import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs'
import FormikInput from 'components/Inputs/FormikInput'
import Input from 'components/Inputs/Input'
import SelectAndAddNew from 'components/Inputs/SelectAndAddNew/SelectAndAddNew'
import BtnsRadios from 'components/Radios/BtnsRadios/BtnsRadios'
import { FieldArray, Formik } from 'formik'
import { Form } from 'formik-antd'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useDeleteYachtPhotoMutation, useDraftYachtCardMutation, useEditYachtCardMutation, useGetYachtCardQuery, useMakeMainYachtPhotoMutation, useReleaseYachtCardMutation, useUploadYachtPhotosFirstMutation } from 'redux/ducks/card/cardApi'
import { typoEnum } from 'styles/typo'
import { marinaTypeForDisplay, marinaTypeWithId } from 'types/entitiesTypes/marinasTypes'
import { routerParamsType } from 'types/utilTypes'
import { yachtTypesEnum, yachtTypesValues } from 'types/vehicleTypes/yachtTypes'
import { fromGetYachtToEdit } from 'utils/mappers/fromGetYachtToEdit'
import styles from "./AddCard.module.css"
import InputNumber from 'components/Inputs/InputNumber/InputNumber'
import FormikSelect from 'components/Inputs/Select/FormikSelect'
import { skipperLicenseTypesValues } from 'types/vehicleTypes/skipperLicenseTypes'
import { paymentTermTypesValues } from 'types/entitiesTypes/paymentTermTypes'
import BtnsCheckboxGroup from 'components/Checkboxes/BtnsCheckBox/BtnsCheckBox'
import { useGetYachtAdditionalConditionsQuery } from 'redux/ducks/additionalConditions/additionConditionsApi'
import { getSumFromObjectFields, objectWithNumbers } from 'utils/helpers/sumOfObjectFileds'
import FormikCounter from 'components/Inputs/Counter/FormikCounter'
import Tags, { tagItemType } from 'components/Tags/Tags'
import TextArea from 'components/Inputs/TextArea/TextArea'
import DeleteRowBtn from 'components/Controls/DeleteRowBtn/DeleteRowBtn'
import Button from 'components/Buttons/Button'
import { unitTypesValues } from 'types/entitiesTypes/unitTypes'
import { yachtAmenitiesType, yachtFullCardForEdit, yachtFullCardForm, yachtFullCardFormWithType } from 'types/vehicleTypes/cardTypes'
import ButtonLink from 'components/Buttons/ButtonLink'
import { addDraftYachtSchema, addYachtSchema } from 'utils/validationSchemas/addYachtSchema'
import { useGetYachtAmenitiesQuery } from 'redux/ducks/amenities/amenitiesApi'
import { amenitiesYachtTypeEnum, amenityType } from 'types/entitiesTypes/amenitiesTypes'
import { anyAmenitiesObj, fromAmenitiesObjToIdsArr } from 'utils/mappers/fromObjWithIdToArr'
import MarinaModal from 'pages/Modals/MarinaModal/MarinaModal'
import AddMarina from 'pages/Modals/MarinaModal/AddMarina'
import ProducerModal from 'pages/Modals/ProducerModal/ProducerModal'
import AddProducerModal from 'pages/Modals/ProducerModal/AddProducerModal'
import AmenitiesModal from 'pages/Modals/AmenitiesModal/AmenitiesModal'
import { useGetYachtManufacturersQuery } from 'redux/ducks/manufacturers/manufacturersQuery'
import { useGetMarinasQuery } from 'redux/ducks/marinas/marinasQuery'
import EditCardSkeleton from 'components/Placeholders/EditCardSkeleton'
import FormTextArea from 'components/Inputs/TextArea/FormTextArea'
import PhotoUploader from 'components/PhotoUploader/PhotoUploader'
import SliderModal from 'components/Sliders/SliderModal/SliderModal'
import Alert from 'components/Modals/Alert'
import { inputFocusHandler } from 'utils/helpers/formInputFocusHandler'


//validationSchema={isToPublish ? addYachtSchema : addDraftYachtSchema}


function EditYacht() {
    const history = useHistory()
    const urlId = Number(useParams<routerParamsType>().id)
    const { data: yachtData, isLoading } = useGetYachtCardQuery(urlId)
    const { data: marinas, isFetching: marinasFetching } = useGetMarinasQuery()
    const { data: manufacturersYacht, isFetching: manufacturersFetching } = useGetYachtManufacturersQuery()
    const { data: additionalConditionsData } = useGetYachtAdditionalConditionsQuery()
    const [marinaModal, setMarinaModal] = React.useState(false)
    const [marinaCreateModal, setMarinaCreateModal] = React.useState(false)
    const [manufacturersModal, setManufacturersModal] = React.useState(false)
    const [manufacturersCreateModal, setManufacturersCreateModal] = React.useState(false)
    const [activeMarinaId, setActiveMarinaId] = React.useState<number>(0)
    const [marinaData, setMarinaData] = React.useState<marinaTypeForDisplay>({} as marinaTypeForDisplay)

    React.useEffect(() => {
        if (activeMarinaId && marinas) {
            const index = marinas.findIndex(el => el.id == activeMarinaId)
            index >= 0 && setMarinaData(marinas[index])
        }
    }, [marinas, activeMarinaId])

    React.useEffect(() => {
        setMarinaData(yachtData?.marina as marinaTypeForDisplay)
    }, [yachtData])

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
    const { data: amenitiesDataEq } = useGetYachtAmenitiesQuery({ type: amenitiesYachtTypeEnum.equipment })
    const { data: amenitiesDataSC } = useGetYachtAmenitiesQuery({ type: amenitiesYachtTypeEnum.saloonAndCabins })
    const { data: amenitiesDataEt } = useGetYachtAmenitiesQuery({ type: amenitiesYachtTypeEnum.entertainment })
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
    React.useEffect(() => {
        yachtData?.amenities && setSelectedAmenitiesIds(yachtData?.amenities.map(el => el.id))
        yachtData?.amenities && setSelectedAmenities({
            [amenitiesYachtTypeEnum.entertainment]: yachtData?.amenities?.filter(el => el.type === amenitiesYachtTypeEnum.entertainment) || [],
            [amenitiesYachtTypeEnum.equipment]: yachtData?.amenities?.filter(el => el.type === amenitiesYachtTypeEnum.equipment) || [],
            [amenitiesYachtTypeEnum.saloonAndCabins]: yachtData?.amenities?.filter(el => el.type === amenitiesYachtTypeEnum.saloonAndCabins) || []
        } as yachtAmenitiesType)
    }, [yachtData])
    const [activeAmenitiesType, setActiveAmenitiesType] = React.useState<amenitiesYachtTypeEnum | null>(null)
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
            [activeAmenitiesType]: [...prev[activeAmenitiesType], amenities[activeAmenitiesType][index as number]]
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

    //START submit
    const [draftYacht, draftYachtResult] = useDraftYachtCardMutation()
    const [releaseYacht, releaseYachtResult] = useReleaseYachtCardMutation()
    const [editYacht, editYachtResult] = useEditYachtCardMutation()
    const [isPublishing, setIsPublishing] = React.useState(false)
    const [isDrafting, setIsDrafting] = React.useState(false)
    const submitHandler = React.useCallback((values: yachtFullCardFormWithType) => {
        console.log(values)
        editYacht({
            id: urlId,
            yachtInfo: {
                ...values,
                amenities: fromAmenitiesObjToIdsArr(selectedAmenities as anyAmenitiesObj)
            }
        })
    }, [selectedAmenities])
    const publishHandler = () => {
        inputFocusHandler()
        setIsPublishing(true)
    }
    const draftHandler = () => {
        inputFocusHandler()
        setIsDrafting(true)
    }
    const validationSchemaSwitcher = React.useMemo(() => {
        if (isPublishing) {
            return addYachtSchema
        } else if (isDrafting) {
            return addDraftYachtSchema
        } else if (yachtData?.is_draft) {
            return addDraftYachtSchema
        } else {
            return addYachtSchema
        }
    }, [yachtData?.is_draft, isPublishing, isDrafting])
    React.useEffect(() => {
        if (editYachtResult.isSuccess) {
            setIsDrafting(false)
            setIsPublishing(false)
            if (!isPublishing && !isDrafting) {
                document.body.scrollTo({ top: 0, behavior: "auto" })
                history.push(`/yacht/${urlId}`)
            }
            if (isPublishing) {
                releaseYacht(urlId)
            }
            if (isDrafting) {
                draftYacht(urlId)
            }
        }
    }, [editYachtResult, isPublishing, isDrafting])
    //END submit

    //START succes
    React.useEffect(() => {
        //editYachtResult.isSuccess
    }, [editYachtResult])
    //END success

    //START photos
    const [loadPhoto, loadPhotoResult] = useUploadYachtPhotosFirstMutation()
    const [deletePhoto, deltePhotoResult] = useDeleteYachtPhotoMutation()
    const [makeMainPhoto, makeMainPhotoResult] = useMakeMainYachtPhotoMutation()
    const loadPhotoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files as FileList);
        loadPhoto({ photoFiles: newFiles, id: urlId })
    }
    const makeMainHandler = (photoId: number) => {
        makeMainPhoto({photoId, vehicleId: urlId})
    }
    const [indexOfPhotoSlider, setIndexOfPhotoSlider] = React.useState<number|null>(null)
    const openPhotoSliderHandler = (index: number) => {
        setIndexOfPhotoSlider(index)
    }
    const closePhotoSliderHandler = () => {
        setIndexOfPhotoSlider(null)
    }
    //END photos

    //handle errors
    const [photoError, setPhotoError] = React.useState("");
    React.useEffect(() => {
        if (loadPhotoResult?.isError) {
            setPhotoError("???? ?????????????? ?????????????????? ????????")
        }
    }, [loadPhotoResult])

    return (<>
        <div className="wrapper">
            <BreadCrumbs links={[{ link: "/search", text: "????????????????" }, { link: `/yacht/${urlId}`, text: yachtData?.name || "" }]} here="??????????????????????????" />
            {!isLoading ? <div className={styles.page}>
                <h1 className={`${styles.title} ${typoEnum.typo_24_29_500}`}>?????????????????????????? ????????????????</h1>
                <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>??????</h2>
                {yachtData && <Formik onSubmit={submitHandler} initialValues={fromGetYachtToEdit(yachtData) as yachtFullCardForEdit} validationSchema={validationSchemaSwitcher} >
                    {({ values, errors }) => <Form autoComplete="off">
                        <BtnsRadios name="type" values={yachtTypesValues} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????????</h2>
                        <PhotoUploader
                            onUpload={loadPhotoHandler}
                            photos={yachtData?.photos || []}
                            isLoading={loadPhotoResult.isLoading}
                            onDelete={deletePhoto}
                            onMakeMain={makeMainHandler}
                            onOpen={openPhotoSliderHandler}
                        />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>??????????</h2>
                        <div className={styles.row}>
                            <FormikInput name="name" label="????????????????" isRequired placeholder="????????????????" containerClassNames={styles.inputLg} />
                        </div>
                        <div className={styles.row}>
                            {!manufacturersFetching && <SelectAndAddNew name="manufacturer" label="??????????????????????????" isRequired placeholder="???????????????? ??????????????????????????" className={styles.inputLg} data={manufacturersYacht||[]} btnText="???????????????? ??????????????????????????" onClick={manufacturerModalHandler} />}
                        </div>
                        <div className={styles.row}>
                            {!marinasFetching && <SelectAndAddNew name="marina" label="????????????" isRequired placeholder="???????????????? ????????????" className={styles.inputLg} data={marinas||[]} btnText="???????????????? ????????????" onClick={marinaModalHandler} onChange={(v) => setActiveMarinaId(v as number)} />}
                        </div>
                        <div className={styles.row}>
                            <Input label="????????????" isRequired placeholder="?????????????? ???????????????? ????????????" containerClassNames={styles.inputMed} disabled value={marinaData?.city?.name || ""} />
                            <Input label="??????????" isRequired placeholder="?????????????? ???????????????? ????????????" containerClassNames={styles.inputMed} disabled value={marinaData?.address || ""} />
                        </div>
                        <div className={styles.row}>
                            <FormikInput name="owner" label="????????????????" isRequired placeholder="?????????????? ?????? ??????????????????" containerClassNames={styles.inputLg} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="cost" label="????????" isRequired placeholder="?????????????? ???????? ???? ???????? ????????" className={styles.inputMed} />
                            <InputNumber name="discount" label="????????????" placeholder="?????????????? ???????????? ?? %" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <FormikSelect name="paymentTerm" label="?????????????? ????????????" placeholder="?????????????? ????????????" className={styles.inputMed} data={paymentTermTypesValues} />
                            <FormikSelect name="skipperLicenseType" label="????????????????" placeholder="????????????????" className={styles.inputMed} data={skipperLicenseTypesValues} />
                        </div>
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>???????????????????????????? ?????????????? (???? ???????????? 4-??)</h2>
                        <BtnsCheckboxGroup name="additional_conditions" values={additionalConditionsData || []} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????????</h2>
                        <div className={styles.row}>
                            <InputNumber name="year_built" label="??????" isRequired placeholder="?????????????? ??????" className={styles.inputMed} />
                            <InputNumber name="beam" label="???????????? (??)" isRequired placeholder="?????????????? ??????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="passengerCount" label="??????????????" isRequired placeholder="?????????????? ???????????????????? ??????????????" className={styles.inputMed} />
                            <InputNumber name="length" label="?????????? (??)" isRequired placeholder="?????????????? ??????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="toiletCount" label="????????????" placeholder="?????????????? ???????????????????? ????????????????" className={styles.inputMed} />
                            <Input label="??????????" placeholder="???????????????????? ??????????????????????????" containerClassNames={styles.inputMed} disabled value={String(getSumFromObjectFields(values.cabins as objectWithNumbers) || "???????????????????? ??????????????????????????")} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="showerCount" label="??????????????" placeholder="?????????????? ???????????????????? ??????????????" className={styles.inputMed} />
                            <InputNumber name="draught" label="???????????? (??)" isRequired placeholder="?????????????? ??????????" className={styles.inputMed} />
                        </div>
                        <div className={styles.row}>
                            <InputNumber name="waterTankVolume" label="?????? ?????? ????????" placeholder="?????????????? ??????????" className={styles.inputMed} />
                            <InputNumber name="engineHP" label="?????????????????? (??. ??.)" isRequired placeholder="?????????????? ?????????????????? ????????" className={styles.inputMed} />
                        </div>
                        {values.type === yachtTypesEnum.sailBoat && <p className={`label ${typoEnum.typo_12_14_500}`}>????????</p>}
                        {values.type === yachtTypesEnum.sailBoat && <div className={styles.row}><BtnsRadios isWide name="mainsailType" values={[{ value: "CL", label: "????????????????????????" }, { value: "TW", label: "??????????????" }]} /></div>}
                        <InputNumber name="fuelTankVolume" label="?????????????????? ?????? (??)" isRequired placeholder="?????????????? ???????????????????? ????????????" className={styles.inputMed} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>??????????</h2>
                        <div className={styles.row}>
                            <FormikCounter name="cabins.SI" label="1-???????????????? ????????????" className={styles.counter} />
                            <FormikCounter name="cabins.DB" label="2-???????????????? ????????????" className={styles.counter} />
                            <FormikCounter name="cabins.TB" label="3-???????????????? ????????????" className={styles.counter} />
                            <FormikCounter name="cabins.FB" label="4-???????????????? ????????????" className={styles.counter} />
                        </div>
                        <div className={styles.row}>
                            <FormikCounter name="cabins.SB" label="???????????????? ?????????? ?? ????????????" className={styles.counter} />
                            <FormikCounter name="cabins.CB" label="???????????????? ?????????? ?????? ??????????????" className={styles.counter} />
                        </div>
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????</h2>
                        <Tags label="????????????????????????" items={selectedAmenities[amenitiesYachtTypeEnum.equipment] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesYachtTypeEnum.equipment)} onDelete={deSelectAmenityHandler} type={amenitiesYachtTypeEnum.equipment} />
                        <Tags label="?????????? ?? ??????????" items={selectedAmenities[amenitiesYachtTypeEnum.saloonAndCabins] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesYachtTypeEnum.saloonAndCabins)} onDelete={deSelectAmenityHandler} type={amenitiesYachtTypeEnum.saloonAndCabins} />
                        <Tags label="??????????????????????" items={selectedAmenities[amenitiesYachtTypeEnum.entertainment] as tagItemType[]} onAdd={() => setActiveAmenitiesType(amenitiesYachtTypeEnum.entertainment)} onDelete={deSelectAmenityHandler} type={amenitiesYachtTypeEnum.entertainment} />
                        <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>???????????????? ????????</h2>
                        <FormTextArea name="about" placeholder="?????????????? ????????????????" />
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>???????????????????????????? ??????????????  </h3>
                        <FieldArray name="extra_expenses">
                            {({ insert, remove, push }) => (<>
                                {values.extra_expenses && values.extra_expenses.map((el, i) => <div className={styles.row} key={i}>
                                    <FormikInput label={`???????????? ${i + 1}`} name={`extra_expenses.${i}.name`} containerClassNames={styles.inputSm} isRequired />
                                    <InputNumber label="???????? (??????.)" name={`extra_expenses.${i}.price`} className={styles.inputSm} isRequired />
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
                                    push({ name: "", price: "", unit: "" })
                                }} prefix="plus" additionalClassNames={styles.addRow} />
                            </>)}
                        </FieldArray>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????</h3>
                        <FieldArray name="paid_services">
                            {({ insert, remove, push }) => (<>
                                {values.paid_services && values.paid_services.map((el, i) => <div className={styles.row} key={i}>
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
                                    push({ name: "", price: "", unit: "" })
                                }} prefix="plus" additionalClassNames={styles.addRow} />
                            </>)}
                        </FieldArray>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>????????????????????????????</h3>
                        <TextArea label="?????? ??????????????????" placeholder="?????????????? ???????????????? ????????????" value={marinaData?.locationNote || ""} disabled className={styles.textareaBottom} />
                        <TextArea label="???????????????? ???? ??????????????????" placeholder="?????????????? ???????????????? ????????????" value={marinaData?.about || ""} disabled />
                        <div className={styles.btns}>
                            <ButtonLink text="??????????" to={`/yacht/${urlId}`} color="empty" />
                            {!yachtData?.is_draft && <Button text="?????????????????? ?? ????????????????" type="submit" color="empty" onClick={draftHandler} />}
                            <Button text="??????????????????" color={!yachtData?.is_draft ? "blue" : "empty"} type="submit" onClick={inputFocusHandler} />
                            {yachtData?.is_draft && <Button text="????????????????????????" type="submit" color="blue" onClick={publishHandler} />}
                        </div>
                    </Form>}</Formik>}
            </div> : <EditCardSkeleton />}
        </div>
        {indexOfPhotoSlider !== null && <SliderModal photos={yachtData?.photos||[]} index={indexOfPhotoSlider} onClose={closePhotoSliderHandler} onSlide={()=> void 0} />}
        {marinaModal && <MarinaModal onClose={marinaModalHandler} onOpenAddModal={marinaCreateModalOpener} />}
        {marinaCreateModal && <AddMarina onClose={marinaCreateModalCloser} onBack={marinaModalBackHandler} />}
        {manufacturersModal && <ProducerModal onClose={manufacturerModalHandler} onOpenAddModal={manufacturerCreateModalOpener} />}
        {manufacturersCreateModal && <AddProducerModal onClose={manufacturerCreateModalCloser} onBack={manufacturerModalBackHandler} />}
        {activeAmenitiesType && <AmenitiesModal data={amenities[activeAmenitiesType] || []} selectedData={selectedAmenitiesIds} onClose={() => setActiveAmenitiesType(null)} onDeselect={deSelectAmenityHandler} onSelect={selectAmenityHandler //@ts-ignore
        } type={activeAmenitiesType} />}
        {photoError && <Alert text={photoError} title="???? ?????????????? ?????????????????? ????????" onClose={() => setPhotoError("")} />}
    </>)
}

export default EditYacht

import React from 'react'
import styles from "./EditRequest.module.css"
import { useParams } from 'react-router-dom'
import { routerParamsType } from 'types/utilTypes'
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs'
import { typoEnum } from 'styles/typo'
import { requestsEnum, requestsTypesEnum } from 'types/requestsTypes'
import Country from 'components/DataDisplay/Country/Country'
import Marina from 'components/DataDisplay/Marina/Marina'
import RequestState from 'components/DataDisplay/RequestState/RequestState'
import { Formik, FieldArray } from 'formik'
import { Form } from 'formik-antd'
import FormikCalendar from 'components/Inputs/Calendar/FormikCalendar'
import moment from 'moment'
import FormikInput from 'components/Inputs/FormikInput'
import Button from 'components/Buttons/Button'
import DeleteRowBtn from 'components/Controls/DeleteRowBtn/DeleteRowBtn'
import FinalPrice from 'components/DataDisplay/FinalPrice/FinalPrice'
import { currenciesEnum } from 'types/entitiesTypes/entitiesType'
import TotalPrice from 'pages/Request/components/TotalPrice/TotalPrice'
import ButtonLink from 'components/Buttons/ButtonLink'
import TimePicker from 'components/Inputs/TimePicker/TimePicker'
import { useEditYachtRequestMutation, useEditYachtRequestStatusMutation, useGetOneYachtRequestQuery } from 'redux/ducks/requests/requestsApi'
import { editingRequestResultType, fromGetYachtRequestToEdit } from 'utils/mappers/fromGetYachtRequestToEdit'
import { unitTypesValues } from 'types/entitiesTypes/unitTypes'
import FormikSelect from 'components/Inputs/Select/FormikSelect'
import { editingRequestFormResultType, fromEditYachtRequestToPatch } from 'utils/mappers/fromEditYachtRequestToPatch'
import ExtraRow from './components/ExtraRow/ExtraRow'
import { cutFromArrById } from 'utils/helpers/cutFromArrById'
import { cutFromNumArr } from 'utils/helpers/cutFromNumArr'
import ExtraDivider from './components/ExtraRow/ExtraDivider'
import { extraExpenseType } from 'types/vehicleTypes/cardTypes'
import { editRequestSchema } from 'utils/validationSchemas/editRequestSchema'
import { fullOrderPriceCalculator, fullOrderPriceType } from 'utils/calculators/fullOrderPriceCalculator'
import { dateDiffNum } from 'utils/time/dateDiffNum'
import { inputFocusHandler } from 'utils/helpers/formInputFocusHandler'

const country = "002-senegal"

function EditRequest() {
    const urlId = Number(useParams<routerParamsType>().id)
    const { data, isSuccess } = useGetOneYachtRequestQuery(urlId)
    const [editRequest, editRequestResult] = useEditYachtRequestMutation()
    const [editRequestStatus, editRequestStatusResult] = useEditYachtRequestStatusMutation()
    const [price, setPrice] = React.useState<fullOrderPriceType>({} as fullOrderPriceType)

    const [dayStart, setDayStart] = React.useState("")
    const [dayEnd, setDayEnd] = React.useState("")
     
    //START paid_services
    const [selectedServsIds, setSelectedServsIds] = React.useState((data?.paid_services || []).map(el => el.id))
    const [selectedServs, setSelectedServs] = React.useState<extraExpenseType[]>([])
    const [unSelectedServs, setUnselectedServs] = React.useState<extraExpenseType[]>([])

    const addServ = (id: number) => {
        setSelectedServsIds(prev => ([...prev, id]))
    }

    const delServ = (id: number) => {
        setSelectedServsIds(prev => cutFromNumArr(prev as number[], id))
    }

    const [isExpanded, setIsExpanded] = React.useState(false)

    React.useEffect(() => {
        if (isSuccess) {
            setSelectedServsIds((data?.paid_services || []).map(el => el.id))
            setDayStart(data?.collection_date as string)
            setDayEnd(data?.return_date as string)
        }
    }, [isSuccess])

    React.useEffect(() => {
        console.log(dayStart, dayEnd)
        if (isSuccess) {
            setSelectedServs(prev => (data?.yacht?.paid_services || []).filter(el => selectedServsIds.includes(el.id)))
            setUnselectedServs(prev => (data?.yacht?.paid_services || []).filter(el => !selectedServsIds.includes(el.id)))
            setPrice(prev => fullOrderPriceCalculator({
                cost: data?.yacht?.cost||0,
                discount: data?.yacht?.discount,
                days: dateDiffNum(dayStart, dayEnd)||1,
                paidServices: data?.yacht?.paid_services||[],
                extraExpenses: data?.yacht?.extra_expenses||[],
                selectedServicesIds: selectedServsIds as number[]
            }))
        }
    }, [selectedServsIds, isSuccess, dayStart, dayEnd])
    //END paid_services

    const [isAccepting, setIsAccepting] = React.useState(false)
    const [isToPending, setIsToPending] = React.useState(false)

    const submitHandler = (values: editingRequestResultType) => {
        editRequest({ data: fromEditYachtRequestToPatch(values, selectedServsIds as number[]), id: urlId })
    }

    React.useEffect(() => {
        if (isAccepting && editRequestResult.isSuccess) {
            editRequestStatus({ id: urlId, status: requestsTypesEnum.accepted })
        }
        if (isToPending && editRequestResult.isSuccess) {
            editRequestStatus({ id: urlId, status: requestsTypesEnum.pending })
        }
    }, [isAccepting, editRequestResult, isToPending])

    const toAcceptedhandler = () => {
        inputFocusHandler()
        setIsAccepting(true)
        setTimeout(() => {
            setIsAccepting(false)
        }, 2000);
    }

    const toPendingHandler = () => {
        inputFocusHandler()
        setIsToPending(true)
        setTimeout(() => {
            setIsToPending(false)
        }, 2000);
    }

    if (!data) return null

    return (
        <Formik onSubmit={submitHandler} initialValues={fromGetYachtRequestToEdit(data)} validationSchema={editRequestSchema}>
            {({ values }) => <Form autoComplete="off">
                <div className="wrapper">
                    <BreadCrumbs links={[{ link: "/requests", text: "Заявки" }, { link: `/requests/${urlId}`, text: `Бронирование #${urlId}` }]} here="Редактировать" className={styles.bread} />
                    <div className={styles.container}>
                        <h1 className={`${typoEnum.typo_24_29_500}`}>Бронирование #{urlId}</h1>
                        <div className={styles.headline}>
                            <img src={data.yacht?.main_photo?.image_md} alt={`Бронирование #${urlId}`} className={styles.img} />
                            <div className={styles.header}>
                                <h2 className={`${styles.name} ${typoEnum.typo_20_24_500}`}>{data?.yacht?.name}</h2>
                                <div className={styles.place}>
                                    <Country country={country} countryName={data?.yacht?.marina?.country?.name} cityName={data?.yacht?.marina?.city?.name} />
                                    <Marina marinaName={data?.yacht?.marina?.name} className={styles.marina} />
                                </div>
                                <RequestState state={data?.status!} className={styles.requestState} />
                            </div>
                        </div>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Детали</h3>
                        <div>
                            <p className={`${styles.label} ${typoEnum.typo_12_14_400}`}>
                                <span className={typoEnum.typo_12_14_500}>Получение</span> (Обязательно)
                            </p>
                            <div className={styles.row}>
                                <FormikCalendar name="dayStart" placeholder="Дата получения" onChange={(_, day) => setDayStart(_?.format("YYYY-MM-DD")!)} />
                                <TimePicker name="timeStart" placeholder="Время получения" />
                                {/*<TimePicker name="a" placeholder="От:" />
                                <TimePicker name="a" placeholder="До:" />*/}
                            </div>
                            <p className={`${styles.label} ${typoEnum.typo_12_14_400}`}>
                                <span className={typoEnum.typo_12_14_500}>Возврат</span> (Обязательно)
                            </p>
                            <div className={styles.row}>
                                <FormikCalendar name="dayEnd" placeholder="Дата возврата" onChange={(_, day) => setDayEnd(_?.format("YYYY-MM-DD")!)} />
                                <TimePicker name="timeEnd" placeholder="Время возврата" />
                                {/*<TimePicker name="a" placeholder="От:" />
                                <TimePicker name="a" placeholder="До:" />*/}
                            </div>
                        </div>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Контактные данные</h3>
                        <div className={styles.row}>
                            <FormikInput label="Имя" name="first_name" containerClassNames={styles.inputMed} isRequired placeholder="Введите имя" />
                            <FormikInput label="Фамилия" name="last_name" containerClassNames={styles.inputMed} isRequired placeholder="Введите фамилию" />
                        </div>
                        <div className={styles.row}>
                            <FormikInput label="E-mail" name="email" containerClassNames={styles.inputMed} placeholder="Введите e-mail" />
                            <FormikInput label="Телефон" name="phone" containerClassNames={styles.inputMed} isRequired placeholder="Введите телефон" />
                        </div>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Комментарий</h3>
                        <p className={styles.comment}>{data.comment}</p>
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Дополнительные расходы  </h3>
                        {Array.isArray(data?.yacht?.extra_expenses) && data?.yacht?.extra_expenses.map((el, i) => (
                            <ExtraRow
                                firstLabel={`Расход ${i + 1}`}
                                key={el.id}
                                id={el.id!}
                                name={el.name}
                                unit={el.unit}
                                price={el.price}
                            />
                        ))}
                        <h3 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Услуги</h3>
                        {Array.isArray(selectedServs) && selectedServs.map((el, i) => (
                            <ExtraRow
                                firstLabel={`Услуга ${i + 1}`}
                                key={el.id} id={el.id!}
                                name={el.name}
                                unit={el.unit}
                                price={el.price}
                                onDelete={delServ}
                            />
                        ))}
                        {unSelectedServs.length ? <ExtraDivider isExpanded={isExpanded} onClick={() => setIsExpanded(prev => !prev)} /> : null}
                        {isExpanded && Array.isArray(unSelectedServs) && unSelectedServs.map((el, i) => (
                            <ExtraRow
                                firstLabel={`Услуга ${i + 1 + selectedServs.length}`}
                                key={el.id} id={el.id!}
                                name={el.name}
                                unit={el.unit}
                                price={el.price}
                                onAdd={addServ}
                            />
                        ))}
                        <FinalPrice name="Аренда яхты" currency={currenciesEnum.usd} fullPrice={price.actualPriceWithExtraExps||0} />
                        <FinalPrice name="Услуги" currency={currenciesEnum.usd} fullPrice={price.paidServicesPrice||0} />

                    </div>
                    <TotalPrice currency={currenciesEnum.usd} price={price.finalTotalPrice||0} />
                    <div className={styles.btns}>
                        <ButtonLink text="Назад" to={`/requests/${urlId}`} color="empty" />
                        {data.status === requestsTypesEnum.accepted && <Button
                            text="На рассмотрение"
                            color="empty"
                            type="submit"
                            onClick={toPendingHandler}
                            disabled={editRequestStatusResult.isLoading||editRequestResult.isLoading}
                        />}
                        {data.status !== requestsTypesEnum.archived && <Button
                            text="Сохранить"
                            color={data.status === requestsTypesEnum.pending ? "empty" : "blue"}
                            type="submit"
                            disabled={editRequestStatusResult.isLoading||editRequestResult.isLoading}
                            onClick={inputFocusHandler}
                        />}
                        {data.status === requestsTypesEnum.pending && <Button
                            text="Одобрить"
                            type="submit"
                            onClick={toAcceptedhandler}
                            disabled={editRequestStatusResult.isLoading||editRequestResult.isLoading}
                        />}
                    </div>
                </div>
            </Form>}
        </Formik>
    )
}

export default EditRequest

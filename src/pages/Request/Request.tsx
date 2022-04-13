import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs'
import Button from 'components/Buttons/Button'
import ButtonLink from 'components/Buttons/ButtonLink'
import Country from 'components/DataDisplay/Country/Country'
import Detail from 'components/DataDisplay/Detail/Detail'
import FinalPrice from 'components/DataDisplay/FinalPrice/FinalPrice'
import Marina from 'components/DataDisplay/Marina/Marina'
import RequestState from 'components/DataDisplay/RequestState/RequestState'
import moment from 'moment'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDeleteRequestYachtMutation, useEditYachtRequestStatusMutation, useGetOneYachtRequestQuery } from 'redux/ducks/requests/requestsApi'
import { typoEnum } from 'styles/typo'
import { currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { unitTypesEnum } from 'types/entitiesTypes/unitTypes'
import { requestsEnum, requestsTypesEnum } from 'types/requestsTypes'
import { routerParamsType } from 'types/utilTypes'
import { extraExpenseType } from 'types/vehicleTypes/cardTypes'
import { fullOrderPriceCalculator } from 'utils/calculators/fullOrderPriceCalculator'
import { dateDiffNum } from 'utils/time/dateDiffNum'
import { dateOfBookingFormatter } from 'utils/time/dateOfBookingFormatter'
import { datesDiffInDays } from 'utils/time/datesDiffInDays'
import ReqInfoBlock from './components/InfoBlock/ReqInfoBlock'
import TotalPrice from './components/TotalPrice/TotalPrice'
import styles from "./Request.module.css"

const country = "002-senegal" //TODO

function Request() {
    const history = useHistory()
    const [editStatus, editStatusResult] = useEditYachtRequestStatusMutation()
    const [deleteRequest, deleteResult] = useDeleteRequestYachtMutation()
    const urlId = Number(useParams<routerParamsType>().id)
    const { data } = useGetOneYachtRequestQuery(urlId)
    const days = dateDiffNum(data?.collection_date, data?.return_date)
    const selectedServsIds = (data?.paid_services || []).map(el => el.id)
    const paidServices = (data?.yacht?.paid_services || []).filter(el => selectedServsIds.includes(el.id))
    const calculatedPrice = fullOrderPriceCalculator({
        cost: data?.yacht.cost as number,
        days: days,
        discount: data?.yacht.discount,
        paidServices: data?.yacht.paid_services,
        extraExpenses: data?.yacht.extra_expenses,
        selectedServicesIds: selectedServsIds as number[] || []
    })
    const extraExpenses = [
        {
            name: datesDiffInDays(data?.collection_date, data?.return_date),
            price: calculatedPrice.actualPrice,
            unit: unitTypesEnum.perDay
        },
        ...(data?.yacht?.extra_expenses || [])
    ]

    React.useEffect(() => {
        if (deleteResult.isSuccess) {
            history.push(`/requests`)
        }
    }, [deleteResult])


    return (
        <div className={`wrapper`}>
            <BreadCrumbs links={[{ link: "/requests", text: "Заявки" }]} here={`Бронирование #${urlId}`} className={styles.bread} />
            <h1 className={`${typoEnum.typo_24_29_500} ${styles.title}`}>Бронирование #{urlId}</h1>
            {data && <div className={styles.flex}>
                <div className={styles.left}>
                    <div className={styles.headline}>
                        <img src={data.yacht?.main_photo?.image_md} alt={`Бронирование #${urlId}`} className={styles.img} />
                        <div className={styles.header}>
                            <h2 className={`${styles.name} ${typoEnum.typo_20_24_500}`}>{data.yacht?.name}</h2>
                            <div className={styles.place}>
                                <Country country={country} countryName={data.yacht?.marina?.country?.name} cityName={data.yacht?.marina?.city?.name} />
                                <Marina marinaName={data.yacht?.marina?.name} className={styles.marina} />
                            </div>
                            <RequestState state={data.status} className={styles.requestState} />
                        </div>
                    </div>
                    <ReqInfoBlock title="Детали" className={styles.details}>
                        <div className={styles.detailsContainer}>
                            <Detail name="Имя" value={data.first_name} />
                            <Detail name="Фамилия" value={data.last_name} />
                            <Detail name="E-mail" value={data.email} />
                            <Detail name="Телефон" value={data.phone} />
                            <Detail
                                name="Получение"
                                value={dateOfBookingFormatter(data?.collection_date || "")}
                                optionalValue="16:00 - 23:00 TODO"
                            />
                            <Detail
                                name="Возврат"
                                value={dateOfBookingFormatter(data?.return_date || "")}
                                optionalValue="09:00 TODO"
                            />
                            <Detail name="Продолжительность" value={datesDiffInDays(data?.collection_date, data?.return_date)} />
                            <Detail name="Комментарий" value={data.comment} className={styles.comment} />
                        </div>
                    </ReqInfoBlock>
                    <ReqInfoBlock title="Итоговая цена">
                        <>
                            <FinalPrice
                                currency={currenciesEnum.usd}
                                name="Аренда яхты"
                                items={extraExpenses as extraExpenseType[]}
                                days={days}
                            />
                            <FinalPrice
                                currency={currenciesEnum.usd}
                                name="Услуги"
                                items={paidServices}
                                days={days}
                            />
                        </>
                    </ReqInfoBlock>
                    <TotalPrice
                        currency={currenciesEnum.usd}
                        price={data?.price || calculatedPrice.finalTotalPrice}
                    />
                </div>
                <div className={styles.right}>
                    {data.status !== requestsTypesEnum.archived && <ButtonLink
                        to={`/requests/${urlId}/edit`}
                        size="large"
                        color="blue"
                        text="Редактировать"
                    />}
                    {data.status === requestsTypesEnum.pending && <Button
                        size="large"
                        color="empty"
                        text="Одобрить"
                        onClick={() => editStatus({ id: urlId, status: requestsTypesEnum.accepted })}
                    />}
                    {data.status === requestsTypesEnum.accepted && <Button
                        size="large"
                        color="empty"
                        text="На рассмотрение"
                        onClick={() => editStatus({ id: urlId, status: requestsTypesEnum.pending })}
                    />}
                    <Button
                        size="large"
                        color={data.status !== requestsTypesEnum.archived ? "light" : "empty"}
                        text="Скачать PDF"
                    />
                    <Button
                        size="large"
                        color="light"
                        text="Удалить"
                        onClick={() => deleteRequest(urlId)}
                    />
                </div>
            </div>}
        </div>
    )
}

export default Request

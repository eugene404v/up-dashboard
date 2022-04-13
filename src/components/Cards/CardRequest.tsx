import Country from 'components/DataDisplay/Country/Country'
import InfoDescr from 'components/DataDisplay/InfoDescr/InfoDescr'
import Marina from 'components/DataDisplay/Marina/Marina'
import Pair from 'components/DataDisplay/Pair/Pair'
import Price from 'components/DataDisplay/Price/Price'
import RequestState from 'components/DataDisplay/RequestState/RequestState'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteRequestYachtMutation, useEditYachtRequestStatusMutation } from 'redux/ducks/requests/requestsApi'
import { typoEnum } from 'styles/typo'
import { countriesEnum, currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { requestsEnum, requestsTypesEnum } from 'types/requestsTypes'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import styles from "./Card.module.css"

type propsType = {
    requestType: requestsTypesEnum;
    vehicleType: vehiclesCategoriesEnum;
    dateStart: string;
    dateEnd: string;
    customerName: string;
    // main
    id: number;
    name: string;
    photo: string;
    countryName: string; //TODO
    price?: number;
    discount?: number;
    // handlers
    onEdit: (id: number) => void;
    onDecreaseOffset: () => void;
    //additional
    additionalFeatures?: Array<string>;
    dateCreate?: string;
    manager?: string;
    is_draft?: boolean;
    className?: string;
}

function CardRequest(props: propsType) {
    const vehicleType = props.vehicleType === vehiclesCategoriesEnum.yacht ? "Яхта" : "Самолет"
    const [editStatus, editStatusResult] = useEditYachtRequestStatusMutation()
    const [deleteRequest, deleteResult] = useDeleteRequestYachtMutation()

    const requestTypeSwitcher = () => {
        switch (props.requestType) {
            case requestsTypesEnum.accepted:
                return {
                    dropdown: [{
                        text: "На рассмотрение",
                        onClick: () => editStatus({ id: props.id, status: requestsTypesEnum.pending })
                    }, {
                        text: "В архив",
                        onClick: () => editStatus({ id: props.id, status: requestsTypesEnum.archived })
                    }, {
                        text: "Удалить",
                        onClick: () => deleteRequest(props.id),
                    }],
                    btnClassName: styles.btnAccepted,
                    btnText: "Одобрено"
                }
            case requestsTypesEnum.archived:
                return {
                    dropdown: [{
                        text: "Удалить",
                        onClick: () => deleteRequest(props.id),
                    }],
                    btnClassName: styles.btnArchived,
                    btnText: "Архив"
                }
            case requestsTypesEnum.pending:
                return {
                    dropdown: [{
                        text: "Одобрить",
                        onClick: () => editStatus({ id: props.id, status: requestsTypesEnum.accepted })
                    }, {
                        text: "В архив",
                        onClick: () => editStatus({ id: props.id, status: requestsTypesEnum.archived })
                    }, {
                        text: "Удалить",
                        onClick: () => deleteRequest(props.id),
                    }],
                    btnClassName: styles.btnPending,
                    btnText: "На рассмотрении"
                }
            default:
                return {}
        }
    }

    const [isDisabled, setIsDisabled] = React.useState(false)
    React.useEffect(() => {
        if (editStatusResult.isLoading || editStatusResult.isSuccess || deleteResult.isSuccess || deleteResult.isLoading) {
            setIsDisabled(true)
        }
        if (editStatusResult.isLoading||deleteResult.isError) {
            setIsDisabled(false)
        }
    }, [editStatusResult, deleteResult])

    React.useEffect(() => {
        if (editStatusResult.isLoading || deleteResult.isLoading) {
            setIsDisabled(true)
        }
        if (editStatusResult.isSuccess || deleteResult.isSuccess) {
            setIsDisabled(true)
            props.onDecreaseOffset && props.onDecreaseOffset()
        }
        if (editStatusResult.isError || deleteResult.isError) {
            setIsDisabled(false)
        }
    }, [editStatusResult, deleteResult])

    return (
        <Link to={`/requests/${props.id}`} className={isDisabled?styles.disabled:""}>
            <article className={`${styles.card} ${styles.reqCard} ${props.className || ""} ${typoEnum.typo_12_14_400}`}>
                <div className={`${styles.imgContainer} ${styles.imgContainerReq}`}>
                    <img src={props.photo} alt={props.name} className={styles.img} />
                    <DropdownMenu data={requestTypeSwitcher().dropdown!} containerClassName={styles.dropdown}>
                        <button className={styles.moreBtn} />
                    </DropdownMenu>
                </div>
                <div className={styles.info}>
                    <h2 className={`${styles.name} ${typoEnum.typo_16_19_500}`}>Бронирование №{props.id}</h2>
                    <RequestState state={props.requestType} />
                    <Pair notFlex name={`${vehicleType}:`} text={props.name} />
                    <Pair notFlex name="Куда:" text={props.countryName} />
                    <Pair notFlex name="Даты:" text={`${props.dateStart} - ${props.dateEnd}`} />
                    <Pair notFlex name="Заказчик:" text={props.customerName} />
                    <p className={styles.priceDescr}>Цена</p>
                    <Price price={props.price!} currency={currenciesEnum.usd} />
                    <div className={styles.footer}>
                        <span>{props.dateCreate}</span>
                        <span>{props.manager}</span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default CardRequest

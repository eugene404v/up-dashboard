import Country from 'components/DataDisplay/Country/Country'
import InfoDescr from 'components/DataDisplay/InfoDescr/InfoDescr'
import Marina from 'components/DataDisplay/Marina/Marina'
import Price from 'components/DataDisplay/Price/Price'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import Alert from 'components/Modals/Alert'
import Prompt from 'components/Modals/Prompt'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteJetCardMutation, useDraftJetCardMutation, useReleaseJetCardMutation } from 'redux/ducks/card/cardApi'
import { typoEnum } from 'styles/typo'
import { countriesEnum, currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { jetTypesForDisplay } from 'types/vehicleTypes/jetTypes/jetTypes'
import { jetPreviewType, vehicleCardPreviewProps, yachtPreviewType } from 'types/vehicleTypes/vehiclesTypes'
import { yachtTypesForDisplay } from 'types/vehicleTypes/yachtTypes'
import { releaseJetErrorStringify } from 'utils/mappers/releaseJetErrorStringify'
import styles from "./Card.module.css"

type propsType = jetPreviewType & vehicleCardPreviewProps

function CardJet(props: propsType) {
    const [releaseJet, releaseResult] = useReleaseJetCardMutation()
    const [draftJet, draftResult] = useDraftJetCardMutation()
    const [deleteJet, deleteResult] = useDeleteJetCardMutation()

    const dropdownData = !props.is_draft ? [{
        text: "Редактировать",
        onClick: () => props.onEdit(props.id),
    },{
        text: "Перенести в черновик",
        onClick: () => draftJet(props.id),
    },{
        text: "Посмотреть на сайте",
        link: `https://asmproject.ru:3000/search/${props.id}`,
        isExternal: true
    },{
        text: "Удалить",
        onClick: () => setIsDeleting(true),
    }] : [{
        text: "Опубликовать",
        onClick: () => releaseJet(props.id),
    },{
        text: "Редактировать",
        onClick: () => props.onEdit(props.id),
    },{
        text: "Удалить",
        onClick: () => setIsDeleting(true),
    }]

    const [isMutated, setIsMutated] = React.useState(false)
    const [isMutationPending, setIsMutationPending] = React.useState(false)
    const [releaseError, setReleaseError] = React.useState("")
    const [isDeleting, setIsDeleting] = React.useState(false)
    React.useEffect(() => {
        if (releaseResult.isLoading || draftResult.isLoading || deleteResult.isLoading) {
            setIsMutationPending(true)
        }
        if (releaseResult.isSuccess || draftResult.isSuccess || deleteResult.isSuccess) {
            setIsMutationPending(false)
            setIsMutated(true)
            props.onDecreaseOffset && props.onDecreaseOffset()
            setIsDeleting(false)
        }
        if (releaseResult.isError || draftResult.isError || deleteResult.isError) {
            setIsMutationPending(false)
            setIsDeleting(false)
        }
        if (releaseResult.isError) {//@ts-ignore
            setReleaseError(releaseJetErrorStringify(releaseResult.error?.data?.incomplete_fields||[]))
            setTimeout(() => {
                setReleaseError("")
            }, 3000);
        }
    }, [releaseResult, draftResult, deleteResult])

    return (<>
        <Link to={`/jet/${props.id}`} className={`${isMutated?styles.disabled:""} ${isMutationPending?styles.mutationing:""}`}>
            <article className={`${styles.card} ${props.className || ""} ${typoEnum.typo_12_14_400}`}>
            <div className={styles.imgContainer}>
                <img src={props.photo} alt={props.name} className={styles.img} />
                {props.isNew && !props.is_draft && <p className={`${styles.isNew}`}>Новый самолет</p>}
                {(!isMutated && !isMutationPending) && <DropdownMenu data={dropdownData} containerClassName={styles.dropdown}>
                    <button className={styles.moreBtn} />
                </DropdownMenu>}
            </div>
            <div className={styles.info}>
                {props.name && <h2 className={`${styles.name} ${typoEnum.typo_16_19_500}`}>{props.name}</h2>}
                {(props.country && props.airportName) && <div className={styles.place}>
                    {props.country && <Country country={props.country} cityName={props.countryName} className={styles.country} />}
                    {props.airportName && <Marina marinaName={props.airportName} className={styles.marina} />}
                </div>}
                <div className={styles.infoWrapper}>
                    <div className={styles.left}>
                        {props.year ? <InfoDescr name="Год" descr={props.year} /> : ""}
                        {props.people ? <InfoDescr name="Человек" descr={props.people} /> : ""}
                        {props.toilets ? <InfoDescr name="Туалеты" descr={props.toilets}/> : ""}
                        {props.baggage ? <InfoDescr name="Душ" descr={props.baggage} /> : ""}
                    </div>
                    <div className={styles.right}>
                        {(props.type!==undefined) && <InfoDescr name="Тип" descr={jetTypesForDisplay[props.type]} />}
                        {props.length ? <InfoDescr name="Длина" descr={`${props.length} m.`} /> : ""}
                        {props.width ? <InfoDescr name="Ширина" descr={`${props.width} m.`} /> : ""}
                        {props.height ? <InfoDescr name="Высота" descr={`${props.height} m.`} /> : ""}
                        {props.range ? <InfoDescr name="Дальн." descr={`${props.range} m.`} /> : ""}
                        {props.speed ? <InfoDescr name="Скор." descr={`${props.speed} m.`} /> : ""}
                    </div>
                </div>
                {(props.additionalFeatures && props.additionalFeatures.length) ? <ul className={styles.tags}>
                    {Array.isArray(props.additionalFeatures) && props.additionalFeatures.map(el => (
                        <li className={styles.tag} key={el}>{el}</li>
                    ))}
                </ul> : ""}
                <p className={styles.priceDescr}>Цена от</p>
                <Price price={props.price!} discount={props.discount} currency={currenciesEnum.usd} />
                <div className={styles.footer}>
                    <span>{props.date}</span>
                    <span>{props.manager}</span>
                </div>
            </div>
        </article>
        </Link>
        {releaseError && <Alert onClose={()=>setReleaseError("")} text={`Чтоб опубликовать, заполните следующие поля: ${releaseError}`} title="Заполните карточку" />}
        {isDeleting && <Prompt 
            onClose={() => setIsDeleting(false)}
            onAccept={() => deleteJet(props.id)}
            onDecline={() => setIsDeleting(false)}
            text={props.is_draft?"Вы уверены, что хотите удалить черновик?":"Вы уверены, что хотите удалить опубликованную карточку?"}
            title="Удалить"
            acceptText="Удалить"
            declineText="Отмена"
        />}
    </>)
}

export default CardJet

import Country from 'components/DataDisplay/Country/Country'
import InfoDescr from 'components/DataDisplay/InfoDescr/InfoDescr'
import Marina from 'components/DataDisplay/Marina/Marina'
import Price from 'components/DataDisplay/Price/Price'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import Alert from 'components/Modals/Alert'
import Prompt from 'components/Modals/Prompt'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteYachtCardMutation, useDraftYachtCardMutation, useReleaseYachtCardMutation } from 'redux/ducks/card/cardApi'
import { typoEnum } from 'styles/typo'
import { countriesEnum, currenciesEnum } from 'types/entitiesTypes/entitiesType'
import { vehicleCardPreviewProps, yachtPreviewType } from 'types/vehicleTypes/vehiclesTypes'
import { yachtTypesForDisplay } from 'types/vehicleTypes/yachtTypes'
import { releaseYachtErrorStringify } from 'utils/mappers/releaseYachtErrorStringify'
import styles from "./Card.module.css"

type propsType = yachtPreviewType & vehicleCardPreviewProps

function CardYacht(props: propsType) {
    const [releaseYacht, releaseResult] = useReleaseYachtCardMutation()
    const [draftYacht, draftResult] = useDraftYachtCardMutation()
    const [deleteYacht, deleteResult] = useDeleteYachtCardMutation()

    const dropdownData = !props.is_draft ? [{
        text: "Редактировать",
        onClick: () => props.onEdit(props.id),
    },{
        text: "Перенести в черновик",
        onClick: () => draftYacht(props.id),
    },{
        text: "Посмотреть на сайте",
        link: `https://asmproject.ru:3000/search/${props.id}`,
        isExternal: true
    },{
        text: "Удалить",
        onClick: () => setIsDeleting(true),
    }] : [{
        text: "Опубликовать",
        onClick: () => releaseYacht(props.id),
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
            setIsMutated(true)
            setIsMutationPending(false)
            props.onDecreaseOffset && props.onDecreaseOffset()
            setIsDeleting(false)
        }
        if (releaseResult.isError || draftResult.isError || deleteResult.isError) {
            setIsMutationPending(false)
            setIsDeleting(false)
        }
        if (releaseResult.isError) {//@ts-ignore
            setReleaseError(releaseYachtErrorStringify(releaseResult.error?.data?.incomplete_fields||[]))
            setTimeout(() => {
                setReleaseError("")
            }, 3000);
        }
    }, [releaseResult, draftResult, deleteResult])

    return (<>
        <Link to={`/yacht/${props.id}`} className={`${isMutated?styles.disabled:""} ${isMutationPending?styles.mutationing:""}`}>
            <article className={`${styles.card} ${props.className || ""} ${typoEnum.typo_12_14_400}`}>
            <div className={styles.imgContainer}>
                <img src={props.photo} alt={props.name} className={styles.img} />
                {props.isNew && !props.is_draft && <p className={`${styles.isNew}`}>Новая яхта</p>}
                {(!isMutated && !isMutationPending) && <DropdownMenu data={dropdownData} containerClassName={styles.dropdown}>
                    <button className={styles.moreBtn} />
                </DropdownMenu>}
            </div>
            <div className={styles.info}>
                {props.name && <h2 className={`${styles.name} ${typoEnum.typo_16_19_500}`}>{props.name}</h2>}
                {(props.country && props.marinaName) && <div className={styles.place}>
                    {props.country && <Country country={props.country} cityName={props.countryName} className={styles.country} />}
                    {props.marinaName && <Marina marinaName={props.marinaName} className={styles.marina} />}
                </div>}
                <div className={styles.infoWrapper}>
                    <div className={styles.left}>
                        {props.year ? <InfoDescr name="Год" descr={props.year} /> : ""}
                        {props.people ? <InfoDescr name="Человек" descr={props.people} /> : ""}
                        {props.cabins ? <InfoDescr name="Каюты" descr={props.cabins} /> : ""}
                        {props.toilets ? <InfoDescr name="Туалеты" descr={props.toilets}/> : ""}
                        {props.showers ? <InfoDescr name="Душ" descr={props.showers} /> : ""}
                    </div>
                    <div className={styles.right}>
                        {(props.type!==undefined) && <InfoDescr name="Тип" descr={yachtTypesForDisplay[props.type]} />}
                        {props.length ? <InfoDescr name="Длина" descr={`${props.length} m.`} /> : ""}
                        {props.width ? <InfoDescr name="Ширина" descr={`${props.width} m.`} /> : ""}
                    </div>
                </div>
                {(props.additionalFeatures && props.additionalFeatures.length) ? <ul className={styles.tags}>
                    {Array.isArray(props.additionalFeatures) && props.additionalFeatures.map(el => (
                        <li className={styles.tag} key={el}>{el}</li>
                    ))}
                </ul> : ""}
                <p className={styles.priceDescr}>Цена за день</p>
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
            onAccept={() => deleteYacht(props.id)}
            onDecline={() => setIsDeleting(false)}
            text={props.is_draft?"Вы уверены, что хотите удалить черновик?":"Вы уверены, что хотите удалить опубликованную карточку?"}
            title="Удалить"
            acceptText="Удалить"
            declineText="Отмена"
        />}
    </>)
}

export default CardYacht

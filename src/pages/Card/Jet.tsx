import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs'
import Button from 'components/Buttons/Button'
import ButtonLink from 'components/Buttons/ButtonLink'
import MapTriggerText from 'components/Controls/MapTriggerText/MapTriggerText'
import AdditionalPays from 'components/DataDisplay/AdditionalPays/AdditionalPays'
import CabinBeds from 'components/DataDisplay/CabinBeds/CabinBeds'
import Country from 'components/DataDisplay/Country/Country'
import FeaturesList from 'components/DataDisplay/FeaturesList/FeaturesList'
import MainInfoItem from 'components/DataDisplay/MainInfoItem/MainInfoItem'
import Marina from 'components/DataDisplay/Marina/Marina'
import Pair from 'components/DataDisplay/Pair/Pair'
import PayWays from 'components/DataDisplay/PayWays/PayWays'
import MapBox from 'components/MapBox/MapBox'
import Alert from 'components/Modals/Alert'
import Prompt from 'components/Modals/Prompt'
import CardNotExist from 'components/Placeholders/CardNotExist/CardNotExist'
import FullCardSkeleton from 'components/Placeholders/FullCardSkeleton'
import Slider from 'components/Sliders/Slider'
import SliderModal from 'components/Sliders/SliderModal/SliderModal'
import Tab from 'components/Tabs/Tab'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useDeleteJetCardMutation, useDeleteYachtCardMutation, useDraftJetCardMutation, useDraftYachtCardMutation, useGetJetCardQuery, useGetYachtCardQuery, useReleaseJetCardMutation, useReleaseYachtCardMutation } from 'redux/ducks/card/cardApi'
import { typoEnum } from 'styles/typo'
import { amenitiesJetTypeEnum, amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'
import { currenciesEnum, payWaysEnum, priceMeasureEnum, timeMeasuresEnum } from 'types/entitiesTypes/entitiesType'
import { paymentTermTypesForDisplay } from 'types/entitiesTypes/paymentTermTypes'
import { routerParamsType } from 'types/utilTypes'
import { jetTypesForDisplay } from 'types/vehicleTypes/jetTypes/jetTypes'
import { mainSailTypesForDisplay } from 'types/vehicleTypes/mainSailTypes'
import { skipperLicenseTypesForDisplay } from 'types/vehicleTypes/skipperLicenseTypes'
import { newPriceCalculator } from 'utils/helpers/newPriceCalculator'
import { getSumFromObjectFields, objectWithNumbers } from 'utils/helpers/sumOfObjectFileds'
import { bedCountCalculator, cabinsObj } from 'utils/mappers/bedCountCalculator'
import { fromAmenitiesObjToNamesArr } from 'utils/mappers/fromObjWithNamesToArr'
import styles from "./Card.module.css"
import InfoBlock from './components/InfoBlock/InfoBlock'
import Price from './components/Price'


//TODO DELETE
const country = "002-senegal"
const currency = currenciesEnum.usd

const imgs = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
]
//

function Jet() {
    const history = useHistory()
    const urlId = Number(useParams<routerParamsType>().id)
    const [isSliderOpened, setIsSliderOpened] = React.useState(false)
    const [sliderIndex, setSliderIndex] = React.useState(0)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const {data: jetData, isLoading, isError} = useGetJetCardQuery(urlId)
    const [releaseCard, releaseCardResult] = useReleaseJetCardMutation()
    const [draftCard, draftCardResult] = useDraftJetCardMutation()
    const [deleteCard, deleteCardResult] = useDeleteJetCardMutation()

    const releaseHandler = () => {
        releaseCard(urlId)
    }

    const draftHandler = () => {
        draftCard(urlId)
    }

    const deleteHandler = () => {
        setIsDeleting(false)
        deleteCard(urlId)
    }

    return (
        !isError ? <>
            {!isLoading ? <div className="wrapper">
                <BreadCrumbs here={jetData?.name||""} links={[{text:"Карточки", link:"/search"}]} /> 
                <h1 className={`${styles.title} ${typoEnum.typo_24_29_500}`}>{jetData?.name}</h1>
                <div className={styles.place}>
                    <Country country={country} countryName={jetData?.airport?.country?.name||""} cityName={jetData?.airport?.city?.name||""} />
                    <Marina marinaName={jetData?.airport?.name||""} className={styles.marina} />
                </div>
                {jetData?.photos?.length ? <Slider onClick={() => setIsSliderOpened(true)} photos={jetData?.photos} index={sliderIndex} onSlide={setSliderIndex} /> : null}
                <div className={styles.flex}>
                    <div className={styles.left}>
                        <div className={styles.tabs}>
                            <Tab hash="info" text="Информация" />
                            <Tab hash="descr" text="Описание" />
                            <Tab hash="pays" text="Расходы" />
                            <Tab hash="additional" text="Дополнительно" />
                        </div>
                        {jetData?.cost && <Price timeMeasure={timeMeasuresEnum.day} price={newPriceCalculator(jetData.cost, jetData.discount)} oldPrice={jetData.cost} currency={currency} className={styles.price} />}
                        <InfoBlock title="Информация" id="info">
                            <div className={styles.mainInfo}>
                                <div>
                                    <MainInfoItem type="year" value={String(jetData?.year_built)} />
                                    {jetData?.passengerCount && <MainInfoItem type="people" value={String(jetData?.passengerCount)} />}
                                    <MainInfoItem type="toilets" value={String(jetData?.toiletCount)} />
                                    <MainInfoItem type="beds" value={String(jetData?.bedCount)} />
                                    <MainInfoItem type="baggage" value={jetData?.baggageVolume + " m3"} />
                                </div>
                                <div>
                                    {jetData?.type && <MainInfoItem type="jetType" value={jetTypesForDisplay[jetData?.type]} />}
                                    <MainInfoItem type="length" value={`${jetData?.length} м`} />
                                    <MainInfoItem type="width" value={`${jetData?.width} м`} />
                                    <MainInfoItem type="height" value={`${jetData?.height} м`} />
                                    <MainInfoItem type="range" value={`${jetData?.range} ч.`} />
                                    <MainInfoItem type="speed" value={`${jetData?.speed} км/ч`} />
                                </div>
                            </div>
                        </InfoBlock>
                        <InfoBlock title="Удобства">
                            <div className={styles.features}>
                                <FeaturesList features={fromAmenitiesObjToNamesArr(jetData?.amenities, amenitiesJetTypeEnum.equipment)} title="Оборудование" />
                                <FeaturesList features={fromAmenitiesObjToNamesArr(jetData?.amenities, amenitiesJetTypeEnum.comfort)} title="Комфорт" />
                            </div>
                        </InfoBlock>
                        <InfoBlock title="Описание самолета" id="descr">
                            <article className={styles.descr} dangerouslySetInnerHTML={{__html: jetData?.about||""}} />
                        </InfoBlock>
                        {jetData?.extra_expenses && <InfoBlock title="Дополнительные расходы" id="pays">
                            <AdditionalPays items={jetData?.extra_expenses} />
                        </InfoBlock>}
                        {jetData?.paid_services && <InfoBlock title="Услуги">
                            <AdditionalPays items={jetData?.paid_services} />
                        </InfoBlock>}
                        <InfoBlock title="Дополнительная информация" id="additional">
                            <>
                                {jetData?.owner && <Pair name="Владелец" text={jetData?.owner} />}
                                {jetData?.airport?.address && <Pair name="Адрес получения"><MapTriggerText country={country} cityName={jetData?.airport?.address} /></Pair>}
                                {/* && <Pair name="Получение">
                                    <p className={styles.time}>{additionalInfo.timeGet}</p>
                                    <p className={styles.timeHint}>Не уверены с временем точного прибытия? Не волнуйтесь, вы можете указать его позже. Мы передадим информацию о времени вашего прибытия чартерной компании.</p>    
                                </Pair>}
                                {additionalInfo.timeReturn && <Pair name="Возврат" text={additionalInfo.timeReturn} />*/}
                                {jetData?.paymentTerm && <Pair name="Условия оплаты">
                                    <p className={styles.time}>{paymentTermTypesForDisplay[jetData?.paymentTerm]}</p>
                                    <p className={styles.timeHint}>Политика аннулирования зависит от вашего выбора.</p>    
                                </Pair>}
                                {/*{jetData?.skipperLicenseType && <Pair name="Лицензия" text={skipperLicenseTypesForDisplay[yachtData.skipperLicenseType]} />}
                                (Array.isArray(additionalInfo.payWays) && additionalInfo.payWays.length) ? <Pair name="Способы оплаты">
                                    {additionalInfo.payWays.map(el => <PayWays payWay={el} key={el} />)}
                                </Pair> : ""*/}
                            </>
                        </InfoBlock>
                        <InfoBlock title="Местоположение">
                            <>
                                <MapBox latittude={jetData?.airport?.locationLat as number} longitude={jetData?.airport?.locationLon as number} />
                                {jetData?.airport?.address && <Pair name="Адрес" text={jetData?.airport?.address} />}
                                {/*additionalInfo.seats && <Pair name="Количество мест" text={additionalInfo.seats} />*/}
                                {/*(Array.isArray(additionalInfo.facilities) && additionalInfo.facilities.length) ? <Pair name="Удобства">
                                    {additionalInfo.facilities.map(el => <p className={styles.time} key={el} >{el}</p>)}
                                </Pair> : ""*/}
                                {jetData?.airport?.locationNote && <Pair name="Как добраться">
                                    <p className={styles.time}>{jetData?.airport?.locationNote}</p>
                                    <p className={styles.timeHint}>Дополнительную информацию о том, как добраться, вы можете узнать у менеджера.</p>    
                                </Pair>}
                            </>
                        </InfoBlock>
                    </div>
                    <div className={styles.right}>
                        {jetData?.is_draft && <Button size="large" color="orange" text="Опубликовать" onClick={releaseHandler} disabled={releaseCardResult.isLoading} />}
                        <ButtonLink size="large" color="blue" text="Редактировать" to={`/edit/jet/${urlId}/`} />
                        {!jetData?.is_draft && <Button size="large" color="gray" text="Перенести в черновик" onClick={draftHandler} disabled={draftCardResult.isLoading} />}
                        {!jetData?.is_draft && <Button size="large" color="light" text="Посмотреть на сайте" />}
                        <Button size="large" color="light" text="Удалить" disabled={releaseCardResult.isLoading||draftCardResult.isLoading||deleteCardResult.isLoading} onClick={() => setIsDeleting(true)} />
                    </div>
                </div>
            </div> : <FullCardSkeleton /> }
            {isSliderOpened && <SliderModal photos={jetData?.photos} index={sliderIndex} onClose={() => setIsSliderOpened(false)} onSlide={setSliderIndex} />}
            {isDeleting && <Prompt 
                onClose={()=> setIsDeleting(false)} 
                onAccept={deleteHandler} 
                onDecline={()=> setIsDeleting(false)} 
                acceptText="Удалить" 
                declineText="Отмена" 
                text={jetData?.is_draft ? "Вы уверены, что хотите удалить черновик?" : "Вы уверены, что хотите удалить опубликованную карточку?"}
                title="Удалить"
            />}
            {deleteCardResult.isSuccess && <Alert 
                title="Удалено" 
                text={jetData?.is_draft ? "Черновик удален" : "Карточка удалена с сайта"} 
                onClose={() => history.push("/search")} 
            />}
        </> : <CardNotExist />
    )
}

export default Jet

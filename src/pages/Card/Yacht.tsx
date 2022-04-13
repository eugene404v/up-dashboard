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
import { useDeleteYachtCardMutation, useDraftYachtCardMutation, useGetYachtCardQuery, useReleaseYachtCardMutation } from 'redux/ducks/card/cardApi'
import { typoEnum } from 'styles/typo'
import { amenitiesYachtTypeEnum } from 'types/entitiesTypes/amenitiesTypes'
import { currenciesEnum, payWaysEnum, priceMeasureEnum, timeMeasuresEnum } from 'types/entitiesTypes/entitiesType'
import { paymentTermTypesForDisplay } from 'types/entitiesTypes/paymentTermTypes'
import { routerParamsType } from 'types/utilTypes'
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
    /*"https://trendymen.ru/images/article1/131671/prev1131671.jpg",
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
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg"*/
]
//

function Yacht() {
    const history = useHistory()
    const urlId = Number(useParams<routerParamsType>().id)
    const [isSliderOpened, setIsSliderOpened] = React.useState(false)
    const [sliderIndex, setSliderIndex] = React.useState(0)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const {data: yachtData, isLoading, isError} = useGetYachtCardQuery(urlId)
    const [releaseCard, releaseCardResult] = useReleaseYachtCardMutation()
    const [draftCard, draftCardResult] = useDraftYachtCardMutation()
    const [deleteCard, deleteCardResult] = useDeleteYachtCardMutation()

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
                <BreadCrumbs here={yachtData?.name||""} links={[{text:"Карточки", link:"/search"}]} /> 
                <h1 className={`${styles.title} ${typoEnum.typo_24_29_500}`}>{yachtData?.name}</h1>
                <div className={styles.place}>
                    <Country country={country} countryName={yachtData?.marina?.country?.name||""} cityName={yachtData?.marina?.city?.name||""} />
                    <Marina marinaName={yachtData?.marina?.name||""} className={styles.marina} />
                </div>
                {yachtData?.photos?.length ? <Slider onClick={() => setIsSliderOpened(true)} photos={yachtData?.photos||[]} index={sliderIndex} onSlide={setSliderIndex} /> : null}
                <div className={styles.flex}>
                    <div className={styles.left}>
                        <div className={styles.tabs}>
                            <Tab hash="info" text="Информация" />
                            <Tab hash="descr" text="Описание" />
                            <Tab hash="pays" text="Расходы" />
                            <Tab hash="additional" text="Дополнительно" />
                        </div>
                        {yachtData?.cost && <Price timeMeasure={timeMeasuresEnum.day} price={newPriceCalculator(yachtData.cost, yachtData.discount)} oldPrice={yachtData.cost} currency={currency} className={styles.price} />}
                        <InfoBlock title="Информация" id="info">
                            <div className={styles.mainInfo}>
                                <div>
                                    <MainInfoItem type="year" value={String(yachtData?.year_built)} />
                                    {yachtData?.cabins && <MainInfoItem type="people" value={String(bedCountCalculator(yachtData?.cabins as cabinsObj))} />}
                                    <MainInfoItem type="toilets" value={String(yachtData?.toiletCount)} />
                                    <MainInfoItem type="showers" value={String(yachtData?.showerCount)} />
                                    {yachtData && yachtData!.mainsailType && <MainInfoItem type="grot" value={mainSailTypesForDisplay[yachtData.mainsailType]} />}
                                </div>
                                <div>
                                    <MainInfoItem type="width" value={`${yachtData?.beam} м`} />
                                    <MainInfoItem type="length" value={`${yachtData?.length} м`} />
                                    {yachtData?.cabins && <MainInfoItem type="cabins" value={String(getSumFromObjectFields(yachtData?.cabins as objectWithNumbers))} />}
                                    <MainInfoItem type="depth" value={`${yachtData?.draught} м`} />
                                    <MainInfoItem type="engine" value={`${yachtData?.engineHP} л. с.`} />
                                    <MainInfoItem type="fuel" value={`${yachtData?.fuelTankVolume} л`} />
                                </div>
                            </div>
                        </InfoBlock>
                        <InfoBlock title="Каюты">
                            <div className={styles.cabins}>
                                {yachtData?.cabins?.SI && <CabinBeds type="one" counter={yachtData?.cabins?.SI} />}
                                {yachtData?.cabins?.DB && <CabinBeds type="two" counter={yachtData?.cabins?.DB} />}
                                {yachtData?.cabins?.TB && <CabinBeds type="three" counter={yachtData?.cabins?.TB} />}
                                {yachtData?.cabins?.FB && <CabinBeds type="four" counter={yachtData?.cabins?.FB} />}
                                {yachtData?.cabins?.CB && <CabinBeds type="crew" counter={yachtData?.cabins?.CB} />}
                                {yachtData?.cabins?.SB && <CabinBeds type="sofa" counter={yachtData?.cabins?.SB} />}
                            </div>
                        </InfoBlock>
                        <InfoBlock title="Удобства">
                            <div className={styles.features}>
                                <FeaturesList features={fromAmenitiesObjToNamesArr(yachtData?.amenities, amenitiesYachtTypeEnum.equipment)} title="Оборудование" />
                                <FeaturesList features={fromAmenitiesObjToNamesArr(yachtData?.amenities, amenitiesYachtTypeEnum.saloonAndCabins)} title="Салон и каюты" />
                                <FeaturesList features={fromAmenitiesObjToNamesArr(yachtData?.amenities, amenitiesYachtTypeEnum.entertainment)} title="Развлечения" />
                            </div>
                        </InfoBlock>
                        <InfoBlock title="Описание яхты" id="descr">
                            <article className={styles.descr} dangerouslySetInnerHTML={{__html: yachtData?.about||""}} />
                        </InfoBlock>
                        {yachtData?.extra_expenses && <InfoBlock title="Дополнительные расходы" id="pays">
                            <AdditionalPays items={yachtData?.extra_expenses} />
                        </InfoBlock>}
                        {yachtData?.paid_services && <InfoBlock title="Услуги">
                            <AdditionalPays items={yachtData?.paid_services} />
                        </InfoBlock>}
                        <InfoBlock title="Дополнительная информация" id="additional">
                            <>
                                {yachtData?.owner && <Pair name="Владелец" text={yachtData?.owner} />}
                                {yachtData?.marina?.address && <Pair name="Адрес получения"><MapTriggerText country={country} cityName={yachtData?.marina?.address} /></Pair>}
                                {/* && <Pair name="Получение">
                                    <p className={styles.time}>{additionalInfo.timeGet}</p>
                                    <p className={styles.timeHint}>Не уверены с временем точного прибытия? Не волнуйтесь, вы можете указать его позже. Мы передадим информацию о времени вашего прибытия чартерной компании.</p>    
                                </Pair>}
                                {additionalInfo.timeReturn && <Pair name="Возврат" text={additionalInfo.timeReturn} />*/}
                                {yachtData?.paymentTerm && <Pair name="Условия оплаты">
                                    <p className={styles.time}>{paymentTermTypesForDisplay[yachtData?.paymentTerm]}</p>
                                    <p className={styles.timeHint}>Политика аннулирования зависит от вашего выбора.</p>    
                                </Pair>}
                                {yachtData?.skipperLicenseType && <Pair name="Лицензия" text={skipperLicenseTypesForDisplay[yachtData.skipperLicenseType]} />}
                                {/*(Array.isArray(additionalInfo.payWays) && additionalInfo.payWays.length) ? <Pair name="Способы оплаты">
                                    {additionalInfo.payWays.map(el => <PayWays payWay={el} key={el} />)}
                                </Pair> : ""*/}
                            </>
                        </InfoBlock>
                        <InfoBlock title="Местоположение">
                            <>
                                <MapBox latittude={yachtData?.marina?.locationLat as number} longitude={yachtData?.marina?.locationLon as number} />
                                {yachtData?.marina?.address && <Pair name="Адрес" text={yachtData?.marina?.address} />}
                                {/*additionalInfo.seats && <Pair name="Количество мест" text={additionalInfo.seats} />*/}
                                {/*(Array.isArray(additionalInfo.facilities) && additionalInfo.facilities.length) ? <Pair name="Удобства">
                                    {additionalInfo.facilities.map(el => <p className={styles.time} key={el} >{el}</p>)}
                                </Pair> : ""*/}
                                {yachtData?.marina?.locationNote && <Pair name="Как добраться">
                                    <p className={styles.time}>{yachtData?.marina?.locationNote}</p>
                                    <p className={styles.timeHint}>Дополнительную информацию о том, как добраться, вы можете узнать у менеджера.</p>    
                                </Pair>}
                                {yachtData?.marina?.about && <Pair name="Описание от владельца"><article className={styles.descr} dangerouslySetInnerHTML={{__html: yachtData?.marina?.about||""}} /></Pair>}
                            </>
                        </InfoBlock>
                    </div>
                    <div className={styles.right}>
                        {yachtData?.is_draft && <Button size="large" color="orange" text="Опубликовать" onClick={releaseHandler} disabled={releaseCardResult.isLoading} />}
                        <ButtonLink size="large" color="blue" text="Редактировать" to={`/edit/yacht/${urlId}/`} />
                        {!yachtData?.is_draft && <Button size="large" color="gray" text="Перенести в черновик" onClick={draftHandler} disabled={draftCardResult.isLoading} />}
                        {!yachtData?.is_draft && <Button size="large" color="light" text="Посмотреть на сайте" />}
                        <Button size="large" color="light" text="Удалить" disabled={releaseCardResult.isLoading||draftCardResult.isLoading||deleteCardResult.isLoading} onClick={() => setIsDeleting(true)} />
                    </div>
                </div>
            </div> : <FullCardSkeleton /> }
            {isSliderOpened && <SliderModal photos={yachtData?.photos} index={sliderIndex} onClose={() => setIsSliderOpened(false)} onSlide={setSliderIndex} />}
            {isDeleting && <Prompt 
                onClose={()=> setIsDeleting(false)} 
                onAccept={deleteHandler} 
                onDecline={()=> setIsDeleting(false)} 
                acceptText="Удалить" 
                declineText="Отмена" 
                text={yachtData?.is_draft ? "Вы уверены, что хотите удалить черновик?" : "Вы уверены, что хотите удалить опубликованную карточку?"}
                title="Удалить"
            />}
            {deleteCardResult.isSuccess && <Alert 
                title="Удалено" 
                text={yachtData?.is_draft ? "Черновик удален" : "Карточка удалена с сайта"} 
                onClose={() => history.push("/search")} 
            />}
        </> : <CardNotExist />
    )
}

export default Yacht

import CardJet from 'components/Cards/CardJet'
import noPhoto from 'components/Cards/noPhoto.svg'
import Prompt from 'components/Modals/Prompt'
import EmptySearch from 'components/Placeholders/EmptySearch'
import SearchSkeleton from 'components/Placeholders/SearchSkeleton'
import React from 'react'
import { useHistory } from 'react-router'
import { useDeleteJetCardMutation, useDeleteYachtCardMutation, useDraftJetCardMutation, useDraftYachtCardMutation, useReleaseJetCardMutation, useReleaseYachtCardMutation } from 'redux/ducks/card/cardApi'
import { useSearchJetsQuery, useSearchYachtsQuery } from 'redux/ducks/search/searchApi'
import { PAGINATION_STEP } from 'types/apiTypes/commonApiTypes'
import { jetFullCardForDisplay, yachtFullCardForDisplay } from 'types/vehicleTypes/cardTypes'
import { deleteCardFromSearchList, mutationResult } from 'utils/helpers/deleteCardFromSearchList'
import { scrollToTop } from 'utils/helpers/scrollToTop'
import { getSumFromObjectFields, objectWithNumbers } from 'utils/helpers/sumOfObjectFileds'
import { bedCountCalculator, cabinsObj } from 'utils/mappers/bedCountCalculator'
import { fromObjWithNamesToArr } from 'utils/mappers/fromObjWithNamesToArr'
import styles from "./Cards.module.css"
import LoadMoreObserver from './LoadMoreObserver'
 

type propsType = {
    name?: string;
    is_draft?: boolean;
    country?: number[];
    setCount: (count: number) => void;
}

//TODO photo, country, marinaCoords, isNew, date, manager, view on Site
function SearchListJet({ name = "", is_draft = true, country = [], setCount }: propsType) {
    const history = useHistory()
    const [offset, setOffset] = React.useState(0)
    const { data, isLoading, isSuccess } = useSearchJetsQuery({ offset, limit: PAGINATION_STEP, country, is_draft, name })
    const [loadedData, setLoadedData] = React.useState<jetFullCardForDisplay[]>([])
    const [isObserverExists, setIsObserverExists] = React.useState(false)
    const [releaseJet, releaseResult] = useReleaseJetCardMutation()
    const [draftJet, draftResult] = useDraftJetCardMutation()
    const [deleteJet, deleteResult] = useDeleteJetCardMutation()
    const [totalCount, setTotalCount] = React.useState(0)

    React.useEffect(() => {
        data?.count && setCount(data?.count)
        data?.count && setTotalCount(data?.count)
        if (data && Array.isArray(data?.results)) {
            setLoadedData(prev => [...prev, ...data.results])
            setIsObserverExists(false)
            setTimeout(() => {
                setIsObserverExists(true)
            }, 1000);
        }
    }, [data])

    const paginationSwitcher = () => {
        setOffset(prev => prev + PAGINATION_STEP - decreaseOffset)
        setDecreaseOffset(0)
    }

    const [decreaseOffset, setDecreaseOffset] = React.useState(0)
    const decreaseOffsetHandler = () => {
        setDecreaseOffset(prev => prev + 1)
        setTotalCount(prev => prev - 1)
    }

    return (<>
            {isLoading && !loadedData.length && <SearchSkeleton />}
            {isSuccess && !loadedData.length && !data?.results?.length && <EmptySearch /> }
        <ul className={styles.list}>
            {Array.isArray(loadedData) && loadedData.map(el => (
                <CardJet
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    photo={el.photos?.length ? el.photos[0]?.image_md : noPhoto}
                    countryName={el.airport?.city?.name}
                    country="022-brazil"
                    airportCoordinates=""
                    airportName={el.airport?.name}
                    year={el.year_built as number}
                    type={el.type}
                    people={el.passengerCount as number}
                    toilets={el.toiletCount as number}
                    length={el.length as number}
                    width={el.width as number}
                    height={el.height as number}
                    speed={el.speed as number}
                    range={el.range as number}
                    baggage={el.baggageVolume as number}
                    price={el.cost}
                    discount={el.discount}
                    // handlers
                    onEdit={(id: number) => history.push(`/edit/jet/${id}`)}
                    onDecreaseOffset={decreaseOffsetHandler}
                    //additional
                    isNew={false}
                    additionalFeatures={fromObjWithNamesToArr(el.additional_conditions || [])}
                    date="19.07.2021"
                    manager="Валерия"
                    is_draft={el.is_draft}
                    className=""
                />)
            )}
        </ul>
        {((loadedData.length && data && loadedData.length !== totalCount) && !isLoading) && isObserverExists ? <LoadMoreObserver onShow={paginationSwitcher} params={[country]} /> : ""}
        {!true && <Prompt
            title="Удалить"
            text={!is_draft ? "Вы уверены, что хотите удалить опубликованную карточку?" : "Вы уверены, что хотите удалить черновик?"}
            onClose={() => void 0}
            onDecline={() => void 0}
            onAccept={() => void 0}
            acceptText="Удалить"
            declineText="Отмена"
        />}
    </>)
}

export default SearchListJet

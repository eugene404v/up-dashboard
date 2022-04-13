import CardYacht from 'components/Cards/CardYacht'
import Prompt from 'components/Modals/Prompt'
import EmptySearch from 'components/Placeholders/EmptySearch'
import SearchSkeleton from 'components/Placeholders/SearchSkeleton'
import React from 'react'
import { useHistory } from 'react-router'
import { useDeleteYachtCardMutation, useDraftYachtCardMutation, useReleaseYachtCardMutation } from 'redux/ducks/card/cardApi'
import { useSearchYachtsQuery } from 'redux/ducks/search/searchApi'
import { PAGINATION_STEP } from 'types/apiTypes/commonApiTypes'
import { yachtFullCardForDisplay } from 'types/vehicleTypes/cardTypes'
import { deleteCardFromSearchList, mutationResult } from 'utils/helpers/deleteCardFromSearchList'
import { scrollToTop } from 'utils/helpers/scrollToTop'
import { getSumFromObjectFields, objectWithNumbers } from 'utils/helpers/sumOfObjectFileds'
import { bedCountCalculator, cabinsObj } from 'utils/mappers/bedCountCalculator'
import { fromObjWithNamesToArr } from 'utils/mappers/fromObjWithNamesToArr'
import styles from "./Cards.module.css"
import LoadMoreObserver from './LoadMoreObserver'
import noPhoto from 'components/Cards/noPhoto.svg'

type propsType = {
    name?: string;
    is_draft?: boolean;
    country?: number[];
    setCount: (count: number) => void;
}

//TODO photo, country, marinaCoords, isNew, date, manager, view on Site
function SearchListYacht({ name = "", is_draft = true, country = [], setCount }: propsType) {
    const history = useHistory()
    const [offset, setOffset] = React.useState(0)
    const { data, isLoading, isSuccess } = useSearchYachtsQuery({ offset, limit: PAGINATION_STEP, country, is_draft, name })
    const [loadedData, setLoadedData] = React.useState<yachtFullCardForDisplay[]>([])
    const [isObserverExists, setIsObserverExists] = React.useState(false)
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
        setOffset(prev => prev + PAGINATION_STEP)
        setDecreaseOffset(0)
    }

    const [decreaseOffset, setDecreaseOffset] = React.useState(0)
    const decreaseOffsetHandler = () => {
        setDecreaseOffset(prev => prev + 1 - decreaseOffset)
        setTotalCount(prev => prev - 1)
    }

    return (<>
            {isLoading && !loadedData.length && <SearchSkeleton /> }
            {isSuccess && !loadedData.length && !data?.results?.length && <EmptySearch /> }
        <ul className={styles.list}>
            {Array.isArray(loadedData) && loadedData.map(el => (
                <CardYacht
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    photo={el.main_photo?.image_md || noPhoto}
                    countryName={el.marina?.city?.name}
                    country="022-brazil"
                    marinaCoordinates=""
                    marinaName={el.marina?.name}
                    year={el.year_built as number}
                    type={el.type}
                    people={bedCountCalculator(el?.cabins as cabinsObj)}
                    cabins={getSumFromObjectFields(el?.cabins as objectWithNumbers)}
                    toilets={el.toiletCount as number}
                    showers={el.showerCount as number}
                    length={el.length as number}
                    width={el.beam as number}
                    price={el.cost}
                    discount={el.discount}
                    // handlers
                    onEdit={(id: number) => history.push(`/edit/yacht/${id}`)}
                    onDecreaseOffset={decreaseOffsetHandler}
                    //onReplaceToDrafts={draftYacht}
                    //onDelete={deleteYacht}
                    //onPublish={releaseYacht}
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
        {((loadedData.length && data && loadedData.length !== totalCount)) && isObserverExists ? <LoadMoreObserver onShow={paginationSwitcher} /> : ""}
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

export default SearchListYacht

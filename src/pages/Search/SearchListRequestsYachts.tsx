import EmptySearch from 'components/Placeholders/EmptySearch'
import SearchSkeleton from 'components/Placeholders/SearchSkeleton'
import React from 'react'
import { useEditYachtRequestStatusMutation, useGetRequestsYachtQuery } from 'redux/ducks/requests/requestsApi'
import { PAGINATION_STEP } from 'types/apiTypes/commonApiTypes'
import { requestsTypesEnum, requestYachtPreviewType } from 'types/requestsTypes'
import LoadMoreObserver from './LoadMoreObserver'
import styles from "./Cards.module.css"
import CardRequest from 'components/Cards/CardRequest'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import noPhoto from 'components/Cards/noPhoto.svg'
import { useHistory } from 'react-router'
import { shortDate } from 'utils/time/shortDate'

type propsType = {
    type: requestsTypesEnum
    setCount: (count: number) => void;
}

function SearchListRequestsYachts({ type, setCount }: propsType) {
    const history = useHistory()
    const [offset, setOffset] = React.useState(0)
    const { data, isLoading, isSuccess } = useGetRequestsYachtQuery({ offset, limit: PAGINATION_STEP, status: type })
    const [loadedData, setLoadedData] = React.useState<requestYachtPreviewType[]>([])
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
        {isSuccess && !loadedData.length && !data?.results?.length && <EmptySearch />}
        <ul className={styles.list}>
            {Array.isArray(loadedData) && loadedData.map(el => (
                <CardRequest
                    requestType={el.status} //TODO
                    vehicleType={vehiclesCategoriesEnum.yacht}
                    id={el.id}
                    name={el.yacht?.name}
                    photo={el.yacht?.main_photo?.image_md || noPhoto}
                    countryName={String(el.yacht?.marina?.country?.name||"") + ", " + String(el.yacht?.marina?.city?.name||"")}
                    price={el.yacht?.price}
                    discount={el.yacht?.discount}
                    dateEnd={shortDate(el.return_date)}
                    dateStart={shortDate(el.collection_date)}
                    // handlers
                    onEdit={(id: number) => history.push(`/request/${id}/edit`)}
                    onDecreaseOffset={decreaseOffsetHandler}
                    //additional
                    additionalFeatures={(el.yacht?.additional_conditions||[]).map(el=>el.name)}
                    dateCreate={el.dateCreate}
                    manager="Валерия"
                    className=""
                    customerName={el.first_name} 
                />)
            )}
        </ul>
        {((loadedData.length && data && loadedData.length < totalCount)) && isObserverExists ? <LoadMoreObserver onShow={paginationSwitcher} /> : ""}
    </>)
}

export default SearchListRequestsYachts

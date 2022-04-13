import { RadioChangeEvent } from 'antd'
import CardRequest from 'components/Cards/CardRequest'
import SearchSkeleton from 'components/Placeholders/SearchSkeleton'
import React from 'react'
import { useAppSelector } from 'redux/hooks'
import { requestsEnum, requestsTypesEnum, requestsTypesForDisplay } from 'types/requestsTypes'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import { scrollToTop } from 'utils/helpers/scrollToTop'
import styles from "./Cards.module.css"
import FilterRequests from './components/FilterRequests'
import Headline from './components/Headline'
import SearchListRequestsYachts from './SearchListRequestsYachts'

function Requests() {
    const [categorie, setCategorie] = React.useState(vehiclesCategoriesEnum.yacht)
    const [requestType, setRequestType] = React.useState(requestsTypesEnum.pending)
    const [count, setCount] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)

    const switchCategorieHandler = (e: RadioChangeEvent) => {
        setCategorie(e.target.value)
    }

    const switchRequestsTypeHandler = (e: RadioChangeEvent) => {
        setRequestType(e.target.value)
    }

    React.useEffect(() => {
        scrollToTop()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 100);
    }, [categorie, requestType])

    return (
        <div className={`${styles.wrapper} wrapper`}>
            <Headline title={requestsTypesForDisplay[requestType]} counter={count} vehicleType={categorie} isRequests />
            <div className={styles.flex}>
                <FilterRequests onSwitchCategirie={switchCategorieHandler} onSwitchRequestType={switchRequestsTypeHandler} />
                <div style={{flexGrow: 2}}>
                    {isLoading && <SearchSkeleton /> }
                    {(categorie === vehiclesCategoriesEnum.yacht && !isLoading) && 
                    <SearchListRequestsYachts type={requestType} setCount={setCount} />}
                   {(categorie === vehiclesCategoriesEnum.jet && !isLoading) && <div>NO JETS</div>}
                </div>
            </div>
        </div>
    )
}

export default Requests

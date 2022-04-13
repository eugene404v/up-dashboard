import { RadioChangeEvent } from 'antd'
import CardYacht from 'components/Cards/CardYacht'
import SearchSkeleton from 'components/Placeholders/SearchSkeleton'
import React from 'react'
import { useGetCountriesQuery } from 'redux/ducks/regions/regionsApi'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import { yachtTypesEnum } from 'types/vehicleTypes/yachtTypes'
import { scrollToTop } from 'utils/helpers/scrollToTop'
import { countryWithCount } from 'utils/mappers/countyWithCount'
import styles from "./Cards.module.css"
import Filter from './components/Filter'
import Headline from './components/Headline'
import SearchBar from './components/SearchBar'
import SearchListJet from './SearchListJet'
import SearchListYacht from './SearchListYacht'

function Cards() {
    const {data: regionsData} = useGetCountriesQuery()
    const dispatch = useAppDispatch()
    const [count, setCount] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)
    const [searchString, setSearchString] = React.useState("")
    const [selectedRegions, setSelectedRegions] = React.useState<number[]>([])
    const [categorie, setCategorie] =  React.useState(vehiclesCategoriesEnum.yacht)

    const switchCategorieHandler = (e: RadioChangeEvent) => {
        setCategorie(e.target.value)
    }

    const selectRegionHandler = (ids: number[]) => {
        setSelectedRegions(ids)
    }

    const clearRegionhandler = () => {
        setSelectedRegions([])
    }

    React.useEffect(() => {
        scrollToTop()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 100);
    }, [categorie, searchString, selectedRegions])
    
    return (<>
        <SearchBar search={searchString} onSubmit={(v) => setSearchString(v.search)} />
        <div className={`${styles.wrapper} wrapper`}>
            <Headline title={searchString || "Карточки"} counter={count} vehicleType={categorie} />
            <div className={styles.flex}>
                <Filter 
                    onSwitchCategirie={switchCategorieHandler} 
                    selectedRegionsIds={selectedRegions} 
                    onClearRegion={clearRegionhandler} 
                    onSelectRegion={selectRegionHandler} 
                    allRegions={countryWithCount(regionsData, categorie)} 
                />
                <div style={{flexGrow: 2}}>
                    {isLoading && <SearchSkeleton /> }
                   {(categorie === vehiclesCategoriesEnum.yacht && !isLoading) && 
                   <SearchListYacht setCount={setCount} name={searchString} is_draft={false} country={selectedRegions} />}
                   {(categorie === vehiclesCategoriesEnum.jet && !isLoading) && 
                   <SearchListJet setCount={setCount} name={searchString} is_draft={false} country={selectedRegions} />}
                </div>
            </div>
        </div>
    </>)
}

export default Cards
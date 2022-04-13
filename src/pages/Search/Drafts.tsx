import { RadioChangeEvent } from 'antd'
import CardYacht from 'components/Cards/CardYacht'
import SearchSkeleton from 'components/Placeholders/SearchSkeleton'
import React from 'react'
import { useGetCountriesQuery } from 'redux/ducks/regions/regionsApi'
import { useAppSelector } from 'redux/hooks'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import { yachtTypesEnum } from 'types/vehicleTypes/yachtTypes'
import { scrollToTop } from 'utils/helpers/scrollToTop'
import { countryWithCount } from 'utils/mappers/countyWithCount'
import styles from "./Cards.module.css"
import Filter from './components/Filter'
import Headline from './components/Headline'
import SearchListJet from './SearchListJet'
import SearchListYacht from './SearchListYacht'


function Drafts() {
    const {data: regionsData} = useGetCountriesQuery()
    const [categorie, setCategorie] = React.useState(vehiclesCategoriesEnum.yacht)
    const [count, setCount] = React.useState(0)
    const [selectedRegions, setSelectedRegions] = React.useState<number[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

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
    }, [selectedRegions, categorie])

    return (
        <div className={`${styles.wrapper} wrapper`}>
            <Headline title="Черновики" counter={count} vehicleType={categorie}  />
            <div className={styles.flex}>
                <Filter 
                    onSwitchCategirie={switchCategorieHandler} 
                    selectedRegionsIds={selectedRegions} 
                    onClearRegion={clearRegionhandler} 
                    onSelectRegion={selectRegionHandler} 
                    allRegions={countryWithCount(regionsData, categorie)} 
                />
                <div style={{flexGrow: 2}}>
                    {isLoading && <SearchSkeleton />}
                   {(categorie === vehiclesCategoriesEnum.yacht && !isLoading) && 
                   <SearchListYacht setCount={setCount} is_draft={true} country={selectedRegions} />}
                   {(categorie === vehiclesCategoriesEnum.jet && !isLoading) && 
                   <SearchListJet setCount={setCount} is_draft={true} country={selectedRegions} />}
                </div>
            </div>
        </div>
    )
}

export default Drafts

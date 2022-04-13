import React from 'react'
import { typoEnum } from 'styles/typo'
import { vehiclesByCountry } from 'types/entitiesTypes/entitiesType'
import styles from "./FilterSelect.module.css"
import FilterSelectItem from './FilterSelectItem'

type propsType = {
    data: vehiclesByCountry[];
    classNames?: string;
    onSelect: (ids: number[]) => void;
    title: string;
    onClear?: () => void;
    selectedIds: number[];
}

function FilterSelect({ data, classNames, title, onSelect, onClear, selectedIds }: propsType) {
    const [filteredData, setFilteredData] = React.useState(data||[])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilteredData(data.filter(el => el.name.toLowerCase().includes(value.toLowerCase())));
    }

    const selectHandler = (id: number) => {
        const tempArr = [...selectedIds]
        if (!selectedIds.includes(id)) {
            tempArr.push(id)
        } else {
            const tempIndex = tempArr.indexOf(id)
            tempArr.splice(tempIndex, 1)
        }
        onSelect(tempArr)
    }

    React.useEffect(() => {
        setFilteredData(data)
    }, [data])

    return (
        <div className={`${styles.container} ${classNames || ""}`}>
            <div className={styles.headline}>
                <h3 className={`${styles.title} ${typoEnum.typo_16_19_500}`}>{title}</h3>
                {onClear && <button className={`${styles.clear} ${typoEnum.typo_14_17_400}`} onClick={onClear}>Сбросить</button>}
            </div>
            <div className={styles.wrapper}>
                <input type="text" className={styles.input} onChange={inputHandler} placeholder="Поиск" />
                <div className={styles.list}>
                    {filteredData.map(el => <FilterSelectItem
                        key={el.id}
                        name={el.name}
                        id={el.id}
                        counter={el.counter}
                        isSelected={selectedIds.includes(el.id)}
                        onClick={selectHandler}
                    />)}
                </div>
            </div>
        </div>
    )
}

export default FilterSelect

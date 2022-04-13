import React from 'react'
import { countriesEnum } from 'types/entitiesTypes/entitiesType'
import styles from "./Country.module.css"

type propsType = {
    className?: string;
    country: countriesEnum;
    countryName?: string;
    cityName: string;
}

function Country({className, country, countryName, cityName}:propsType) {
    return (
        <p className={`${styles.container} ${className||""}`}>
            <img src={`/countries/${country}.svg`} alt={countryName} className={styles.img} />
            <span className={`typo-12-14-400`}>{cityName}{countryName && ","}</span>
            {countryName && <span className={`typo-12-14-400 ${styles.country}`}>{countryName}</span>}
        </p>
    )
}

export default Country

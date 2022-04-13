import React from 'react'
import { countriesEnum } from 'types/entitiesTypes/entitiesType'
import styles from "./MapTriggerText.module.css"

type propsType = {
    className?: string;
    country: countriesEnum;
    cityName: string;
    onClick?():void;
}

function MapTriggerText({className, country, cityName, onClick}:propsType) {
    return (
        <p className={`${styles.container} ${className||""}`}>
            <img src={`/countries/${country}.svg`} alt={cityName} className={styles.img} />
            <span className={styles.city} onClick={onClick}>{cityName}</span>
        </p>
    )
}

export default MapTriggerText

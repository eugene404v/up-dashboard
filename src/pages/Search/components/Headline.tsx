import ButtonLink from 'components/Buttons/ButtonLink'
import React from 'react'
import { typoEnum } from 'styles/typo'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import declOfNum from 'utils/formatters/declOfNum'
import styles from "./Headline.module.css"

type propsType = {
    title: string;
    counter: number;
    vehicleType: vehiclesCategoriesEnum;
    isRequests?: boolean;
}

function Headline({title = "Карточки", counter, vehicleType, isRequests}: propsType) {
    const yachtsOrJets = vehicleType === vehiclesCategoriesEnum.yacht ? ["яхта", "яхты", "яхт"] : ["самолет", "самолета", "самолетов"]

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h1 className={`${styles.title} ${typoEnum.typo_24_29_500}`}>{title}</h1>
                {!isRequests ? <p className={styles.counter}>{declOfNum(counter, yachtsOrJets)}</p> : 
                <p className={styles.counter}>{declOfNum(counter, ["заявка", "заявки", "заявок"])}</p>}
            </div>
            {!isRequests && <ButtonLink text="Добавить карточку" to={`/add`} />}
        </div>
    )
}

export default Headline

import ButtonLink from 'components/Buttons/ButtonLink'
import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./CardNotExist.module.css"

function CardNotExist() {
    return (
        <div className={styles.wrapper}>
            <h1 className={`${styles.title} `}>
                <svg width="500" height="181" viewBox="0 0 500 181" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M94 178H123.5V138.75H148.5V113.5H123.5V1.74999H97.25L0 116.75L5.75 138.75H94V178ZM36.5 113.5L94 44.25V113.5H36.5Z" fill="#0B193D"/>
                    <path d="M251.66 181C297.66 181 328.16 140.5 328.16 90.5V90C328.16 40 297.91 0 252.16 0C206.16 0 175.66 40.5 175.66 90.5V91C175.66 141 205.66 181 251.66 181ZM252.16 153.25C224.91 153.25 207.41 125 207.41 90.5V90C207.41 55.5 224.66 27.75 251.66 27.75C278.66 27.75 296.41 56 296.41 90.5V91C296.41 125.25 279.16 153.25 252.16 153.25Z" fill="#0B193D"/>
                    <path d="M445.318 178H474.818V138.75H499.818V113.5H474.818V1.74999H448.568L351.318 116.75L357.068 138.75H445.318V178ZM387.818 113.5L445.318 44.25V113.5H387.818Z" fill="#0B193D"/>
                </svg>
            </h1>
            <h2 className={`${styles.subtitle} ${typoEnum.typo_32_38_700}`}>Страница не найдена</h2>
            <p className={styles.text}>Простите, но мы не смогли найти данную страницу.</p>
            {/*<ButtonLink text="На главную" to="/search" />*/}
        </div>
    )
}

export default CardNotExist

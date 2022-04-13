import React from 'react'
import { typoEnum } from 'styles/typo'
import styles from "./EmptySearch.module.css"

function EmptySearch() {
    return (
        <div className={styles.container}>
            <svg width="161" height="160" viewBox="0 0 161 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M62.6936 124.387C78.4922 124.387 92.915 118.496 103.885 108.792L155.548 159.498L160.452 154.502L108.861 103.867C118.822 92.8388 124.887 78.2245 124.887 62.1936C124.887 27.845 97.0421 0 62.6936 0C28.345 0 0.5 27.845 0.5 62.1936C0.5 96.5421 28.345 124.387 62.6936 124.387ZM62.6925 117.476C93.2246 117.476 117.976 92.7246 117.976 62.1925C117.976 31.6605 93.2246 6.90934 62.6925 6.90934C32.1605 6.90934 7.40934 31.6605 7.40934 62.1925C7.40934 92.7246 32.1605 117.476 62.6925 117.476ZM87.5797 35.3027L91.278 39.0011L67.2387 63.0404L91.2791 87.0808L87.5807 90.7792L63.5403 66.7388L39.501 90.7781L35.8026 87.0797L59.8419 63.0404L35.8037 39.0022L39.502 35.3038L63.5403 59.3421L87.5797 35.3027Z" fill="#0B193D" fillOpacity="0.5"/>
            </svg>
            <p className={`${styles.title} ${typoEnum.typo_32_38_700}`}>Не найдено</p>
            <p className={styles.subtitle}>Попробуйте изменить параметры поиска или условия фильтра.</p>
        </div>
    )
}

export default EmptySearch

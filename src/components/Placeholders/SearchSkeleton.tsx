import React from 'react'
import CardSkeleton from './CardSkeleton'
import styles from "./SearchSkeleton.module.css"

type rowPropsType = {
    items: number[]
}

function SearchSkeleton() {
    return (
        <div className={styles.list}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}

export default SearchSkeleton

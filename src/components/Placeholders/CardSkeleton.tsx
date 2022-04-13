import React from 'react'
import styles from "./SearchSkeleton.module.css"

type rowPropsType = {
    items: number[]
}

const SkeletonRow = ({items}: rowPropsType) => {
    return (
        <div className={styles.row}>
            {Array.isArray(items) && items.map(el => <div key={el} className={styles.item}>
                <div className={styles.word} style={{width: `${el}%`}} />
            </div>)}
        </div>
    )
}


function CardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.img} />
            <div className={styles.title} />
            <div className={styles.subtitle} />
            <SkeletonRow items={[31, 60, 80, 43]} />
            <SkeletonRow items={[71, 20, 60, 34]} />
            <SkeletonRow items={[61, 20, 70, 34]} />
            <SkeletonRow items={[71, 20]} />
            <SkeletonRow items={[71, 20]} />
            <SkeletonRow items={[41, 20]} />
            <div className={styles.features} />
            <div className={styles.price} />
        </div>
    )
}

export default CardSkeleton

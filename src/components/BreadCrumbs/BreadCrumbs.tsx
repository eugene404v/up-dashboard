import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./BreadCrumbs.module.css"

type propsType = {
    links: linksType[];
    here: string;
    className?: string;
}

type linksType = {
    link: string;
    text: string;
}

function BreadCrumbs({links, here, className}: propsType) {
    return (
        <div className={`${styles.container} ${className||""}`}>
            {Array.isArray(links) && links.map(el => <React.Fragment key={el.link}>
            <Link key={el.link} to={el.link} className={styles.link}>{el.text}</Link>
            <span className={styles.divider}>/</span>
            </React.Fragment>)}
            <span className={styles.here}>{here}</span>
        </div>
    )
}

export default BreadCrumbs
